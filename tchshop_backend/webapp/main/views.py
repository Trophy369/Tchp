from flask import render_template, url_for, flash, jsonify, redirect, request, make_response, session, send_from_directory
from models.product import Product, Category, Review, CartItem, Shipping, ProductColor, Description, ProductImage
from models.user import User, Cart
from webapp import db
from models.order import Order, OrderedProduct, SaleTransaction
from flask_login import current_user, login_required
from datetime import datetime
from webapp.auth import has_role
from webapp.main import main
import logging
from sqlalchemy.exc import IntegrityError
import os

# Configure logging to display messages to the terminal
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])


# get all products
@main.route('/listproducts', methods=['GET'], strict_slashes=False)
def get_products():
    products = Product.query.all()
    
    product_list = []
    
    for product in products:
        # Construct the URL for the product image
        if product.product_image:
            # Handle URL encoding of spaces and special characters if needed
            image_filename = product.product_image.replace(' ', '%20')
            image_url = f'{image_filename}'
        else:
            image_url = None
        
        product_list.append({
            'id': product.id,
            'Product name': product.product_name,
            'description': product.description,
            'quantity': product.quantity,
            'regular_price': product.regular_price,
            'product_image': image_url,
            'discounted_price': product.discounted_price
        })

    return jsonify(product_list), 200

# get a product
@main.route('/product/<int:product_id>', methods=['GET'], strict_slashes=False)
def view_product(product_id):
    product = Product.query.get_or_404(product_id)
    if not product:
        return jsonify({'error': 'Product Not found'}), 404

    # Convert the product object to a dictionary
    product_data = product.to_dict()

    base_url = '/static/products'  

    # Construct image URLs
    if 'images' in product_data:
        product_data['image_urls'] = [
            f'{base_url}/{img["image_name"]}' for img in product_data['images']
        ]

    return jsonify(product_data), 200


# view product description
@main.route('/product_desc/<string:product_name>', methods=['GET'], strict_slashes=False)
def view_product_desc(product_name):
    product = Product.query.filter_by(product_name=product_name).first()
    desc = Description.query.filter_by(product_id=product.id).first()
    if desc:
        return jsonify(desc.to_dict()), 200
    return jsonify({'error': 'Not found Update it'}), 400


# users cart
@login_required
@main.route('/addToCart/<product_id>', methods=['GET', 'POST'], strict_slashes=False)
def add_to_cart(product_id):
    data = request.json
    # id = data['userId']
    id = current_user.id
    user = User.query.get(id)
    product_id = product_id
    product = Product.query.get(product_id)
    quantity = data.get('quantity', 1)
    shipping = data.get('shipping', 2)
    all_colors = ProductColor.query.filter_by(product_id=product_id).first()
    color = data.get('color', f'{all_colors.color}')
    logging.info(f"Quantity first {quantity}")
    logging.info(f"Data {data['quantity']}")

    # add or update shipping
    shipping_method = Shipping.query.filter_by(id=shipping).first()


    cart_len = 0
    try:
        if int(product.quantity) < int(quantity):
            return jsonify({"Message": "Not enough Product in stock reduce quantity"})
        # count = Cart.add_to_cart(cart_len=cart_len, quantity=quantity, product_id=product_id, shipping=int(shipping_method.method))
        # logging.info(f"items to add to cart: {count}")
        # cart = Cart.query.filter_by(user_id=current_user.id).first()
        cart = current_user.carts
        if not cart:
            add = Cart(user_id=current_user.id)
            db.session.add(add)
            db.session.commit()
        cart_item = CartItem.query.filter_by(cart_id=current_user.id, product_id=product.id).first()
        if cart_item:
            return jsonify({"Message": "Item already in cart"})
        else:
            add_cartitem = CartItem(cart_id=current_user.id, product_id=product.id, quantity=quantity, shipping=shipping, color=color)
            db.session.add(add_cartitem)
            db.session.commit()
        all_items = CartItem.query.filter_by(cart_id=current_user.id).all()
        cart_len += len(all_items)
    except IntegrityError as e:
        db.session.rollback()
        db.session.commit()
        cart = Cart.query.filter_by(user_id=user.id).first()
        return jsonify({"error": "Item already in cart", "Total Cart": cart_len})

    return jsonify({"Message": f"Product {product.product_name} added to User: {user.email} cart ,'Total Cart': {cart_len}"}), 200


# cart items
@login_required
@main.route('/cart', methods=['GET'], strict_slashes=False)
def cart():
    user_id = current_user.id
    user = Cart.query.filter_by(user_id=user_id).first()
    cart_items = CartItem.query.filter_by(cart_id=user_id).all()
    
    if not cart_items:
        return jsonify({'message': 'Empty Cart!'}), 404

    cart_details = []
    for item in cart_items:
        product = Product.query.get(item.product_id)
        shipping = Shipping.query.filter_by(id=item.shipping).first()
        cart_details.append({
            'id': product.id,
            'product_name': product.product_name,
            'prod_quantity': item.quantity,
            'regular_price': product.regular_price,
            'discounted_price': product.discounted_price,
            'total_price': item.quantity * product.discounted_price,
            'shipping_method': shipping.name if shipping else None,
            'shipping_price': shipping.cost if shipping else None,
            'color': item.color,
            'delivery_date': shipping.deliveryTime if shipping else None
        })
    
    total_items = len(cart_items)
    logging.info(f"Cart details: {cart_details}")
    return jsonify({'Number of items': total_items, 'cart_details': cart_details}), 200

@login_required
@main.route('/removeFromCart/<product_id>', methods=['DELETE'], strict_slashes=False)
def remove_from_cart(product_id):
    # data = request.json
    user_id = current_user.id
    # user_id = data['userId']
    product = Product.query.get(product_id)
    cart_item = CartItem.query.filter_by(
        cart_id=user_id, product_id=product_id
    ).first()

    # logging.info(f"Item quantity {add_quantity}")
    # logging.info(f"Cart details {cart_item.quantity}")
    if not cart_item:
        return jsonify({"error": "Item not found"}), 404
        # update total products
    # user = User.query.filter_by(id=user_id).first()
    # user.carts.remove(user.carts[-1])
    product.quantity += cart_item.quantity
    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": f"Item {product.product_name} deleted"}), 200


# Update Quantity of a product in the cart
@login_required
@main.route('/updateQuantity/<int:product_id>', methods=['PUT'], strict_slashes=False)
def update_cart_item_quantity(product_id):
    id = current_user.id
    data = request.json
    # product = Product.query.get(product_id)

    if "quantity" not in data:
        return jsonify({"message": "Quantity not provided"}), 400

    cart_item = CartItem.query.filter_by(cart_id=id, product_id=product_id).first()
    if not cart_item:
        return jsonify({"message": "Item not found in cart"}), 404

    # update to real quantity in db
    # ini_quantity = product.quantity
    # logging.info(f"Initial Product quantity: {ini_quantity}")
    #
    # new_quantity = int(data.get('quantity'))
    # if (cart_item.quantity - new_quantity) <= 0:
    #     return jsonify({"error": "Not enough in Stock reduce quantity"}), 404
    # ini_quantity += cart_item.quantity
    # ini_quantity -= new_quantity
    # logging.info(f"Product quantity: {ini_quantity}")

    cart_item.quantity = data["quantity"]
    db.session.commit()

    return jsonify({"message": "Item quantity updated successfully"}), 200


# Update color of a product in the cart
@login_required
@main.route('/updateColor/<int:product_id>', methods=['PUT'], strict_slashes=False)
def update_cart_item_color(product_id):
    id = current_user.id
    data = request.json
    # product = Product.query.get(product_id)

    if "color" not in data:
        return jsonify({"message": "Color not provided"}), 400

    cart_item = CartItem.query.filter_by(cart_id=id, product_id=product_id).first()
    if not cart_item:
        return jsonify({"message": "Item not found in cart"}), 404

    # update to real quantity in db
    # ini_quantity = product.quantity
    # logging.info(f"Initial Product quantity: {ini_quantity}")
    #
    # new_quantity = int(data.get('quantity'))
    # if (cart_item.quantity - new_quantity) <= 0:
    #     return jsonify({"error": "Not enough in Stock reduce quantity"}), 404
    # ini_quantity += cart_item.quantity
    # ini_quantity -= new_quantity
    # logging.info(f"Product quantity: {ini_quantity}")

    cart_item.color = data["color"]
    db.session.commit()

    return jsonify({"message": "Item color updated successfully"}), 200

# get all shipping methods available
@login_required
@main.route('/shipping', methods=['GET'], strict_slashes=False)
def all_shipping():
    available_methods = Shipping.query.all()
    all_methods = [{"id": ship.id, "name": ship.name, "deliveryTime": ship.deliveryTime, "cost": ship.cost
                    } for ship in available_methods]
    return jsonify(all_methods), 200


# Update shipping method of a product in the cart
@login_required
@main.route('/updateShipping/<int:product_id>', methods=['PUT'], strict_slashes=False)
def update_cart_item_shipping(product_id):
    id = current_user.id
    data = request.json
    # product = Product.query.get(product_id)
    shipping = Shipping.query.filter_by(id=data["id"]).first_or_404()

    if "id" not in data:
        return jsonify({"message": "Shipping not provided"}), 401
    cart_item = CartItem.query.filter_by(cart_id=id, product_id=product_id).first()
    if not cart_item:
        return jsonify({"message": "Item not found in cart or Shipping method does not exist"}), 404

    cart_item.shipping = data["id"]
    db.session.commit()

    return jsonify({"message": "Item shipping updated successfully"}), 200


# Clear the cart
@login_required
@main.route('/clearCart', methods=['DELETE'])
def delete_all_items():
    CartItem.query.filter_by(cart_id=current_user.id).delete()
    db.session.commit()
    return jsonify(status="success", message="Cart cleared", data={}), 200


# view product reviews
@main.route('/reviews/<int:product_id>', methods=["GET"], strict_slashes=False)
def view_reviews(product_id):
    product = Product.query.get_or_404(product_id)
    if product:
        all_reviews = Review.query.filter_by(productid=product_id).all()
        base_url = '/static/reviews'

        reviews = []
        for review in all_reviews:
            image_urls = [
                f'{img["image_name"]}' for img in [image.to_dict() for image in review.images]
            ]
            logging.info(f"Image URLs for review {review.id}: {image_urls}")

            reviews.append({
                "Rating": review.product_rating,
                "Review": review.product_review,
                "Timestamp": review.timestamp,
                "Image": image_urls,
                "user_id": review.user_id
            })

        return jsonify(reviews), 200
    return jsonify({"error": "Item not found"}), 404


# @main.route('/reviews/<int:product_id>', methods=["GET"], strict_slashes=False)
# def view_reviews(product_id):
#     product = Product.query.get_or_404(product_id)
#     if product:
#         all_review = Review.query.filter_by(productid=product_id).all()
#         # all_reviewimg = ReviewImage.query.filter_by(productid=product_id).all()
#         reviews = [{
#             "Rating": review.product_rating,
#             "Review": review.product_review,
#             "Timestamp": review.timestamp,
#             "Image": [url_for('static'\
#                             ,filename=f'reviews/{image.to_dict()}', _externel=True) for image in review.images],
#             "user_id": review.user_id
#         } for review in all_review]
#         return jsonify(reviews)
#     return jsonify({"error": "Item not found"}), 404


@login_required
@main.route('/shippingAddress', methods=["GET", "POST"], strict_slashes=False)
def address():
    user = User.query.get(current_user.id)
    if request.method == 'POST':
        data = request.json
        user.country = data['country']
        user.state = data['state']
        user.city = data['city']
        user.street = data['street']
        user.zipcode = data['zipcode']
        db.session.commit()
        return jsonify(status="success", message="Shipping address added successfully"), 200
    return jsonify({"Shipping address": user.zipcode + ', ' + user.street + ', ' + user.state + ', ' + user.city + ', ' + user.country})


# view product colors available
@login_required
@main.route('/view_product_color/<string:product_name>', methods=["GET"], strict_slashes=False)
def admin_view_product_colors(product_name):
    product = Product.query.filter_by(product_name=product_name).first()
    if product is None:
        return jsonify({'error', 'Product does not exist'})
    if request.method == 'GET':
        product_colors = ProductColor.query.filter_by(product_id=product.id).all()
        colors = [color.to_dict() for color in product_colors]
        return jsonify({'product_name': product.product_name, 'colors_available': colors})


@login_required
@main.route('/checkout', methods=["GET"], strict_slashes=False)
def checkout():
    cart_items = CartItem.query.filter_by(cart_id=current_user.id).all()

    if not cart_items:
        return jsonify(status="error", message="Your cart is empty"), 400

        # Update the product's available quantity
    for cart_item in cart_items:
        product = Product.query.get(cart_item.product_id)
        product.quantity -= cart_item.quantity
        method = Shipping.query.filter_by(method=cart_item.shipping).first()
    total_price = sum((item.price * item.quantity) * 0.55 for item in cart_items)


    pass