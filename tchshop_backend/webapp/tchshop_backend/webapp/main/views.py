from flask import render_template, url_for, flash, jsonify, redirect, request, make_response, session
from models.product import Product, Category, Review, CartItem, Shipping
from models.user import User, Cart
from webapp import db
from models.order import Order, OrderedProduct, SaleTransaction
from flask_login import current_user, login_required
from datetime import datetime
from webapp.auth import has_role
from webapp.main import main
import logging
from sqlalchemy.exc import IntegrityError

# Configure logging to display messages to the terminal
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])

@login_required
@main.route("/@me", strict_slashes=False, methods=['GET'])
def get_current_user():
    logging.info('Request Headers: %s', request.headers)
    user_id = current_user.id

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({'data': user}), 200
    


# get all products
@login_required
@main.route('/listproducts', methods=['GET'], strict_slashes=False)
def get_products():
    products = Product.query.all()
    product_quantity = CartItem.query.filter_by()
    # logging.info(f"product data{products}")

    product_list = [{'id': product.id, 'Product name': product.product_name, 'Description': [p for p in product.descriptions]
                    ,'quantity': product.quantity, 'regular_price': product.regular_price,
                     'discounted_price': product.discounted_price} for product in products
                    ]
    return jsonify(product_list), 200


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
    logging.info(f"Quantity first {quantity}")
    logging.info(f"Data {data['quantity']}")

    # user_cart = user.carts
    shipping_method = Shipping.query.get(shipping)
    shipping = Shipping(cost=shipping_method.cost, method=shipping_method.method, method_description=shipping_method.method_description,
                        product_id=product_id, user_id=user.id)
    db.session.add(shipping)
    cart_len = 0
    try:
        if int(product.quantity) < int(quantity):
            return jsonify({"Message": "Not enough Product in stock reduce quantity"})
        count = Cart.add_to_cart(self=Cart, user=user.id, cart_len=cart_len, quantity=quantity, product_id=product_id)
        logging.info(f"items to add to cart: {count}")
        db.session.commit()
        cart_len += count
    except IntegrityError as e:
        db.session.rollback()
        cart = Cart.query.filter_by(user_id=user.id).first()
        return jsonify({"error": "Item already in cart", "Total Cart": cart.total_cart(user_id=user.id) })

    return jsonify({"Message": f"Product {product.product_name} added to User: {user.email} cart ,'Total Cart': {cart_len}"}), 200


# cart items
@main.route('/cart/<id>', methods=['GET'], strict_slashes=False)
@login_required
def cart(id):
    id = current_user.id
    user = Cart.query.filter_by(user_id=id).first()
    cart_items = CartItem.query.filter_by(cart_id=id).all()
    logging.info(f"User {current_user}")
    if not user:
        return jsonify({'message': 'Empty Cart!'}), 404

    cart = user.productid
    if not cart:
        return jsonify({'message': 'Cart not found!'}), 404

    products = cart
    logging.info(f"products {products}")
    # pquantity = CartItem.query.filter_by(cart_id=current_user.id, product_id=user.productid).first()

    # product_list = [{'product_name': product.product_name, 'id': product.id, 'description': product.description,
    #                  'regular_price': product.regular_price, 'discounted_price': product.discounted_price} for product in products]
    cart_details = []
    for item in cart_items:
        product = Product.query.get(item.product_id)
        # shipping = Shipping.query.filter_by(product_id=product.id, user_id=current_user.id).first()
        # shipping = product.shippings
        # logging.info(f" shipping: { shipping}")
        cart_details.append({
            'id': product.id,
            'product_name': product.product_name,
            'prod_quantity': item.quantity,
            'regular_price': product.regular_price,
            'discounted_price': product.discounted_price,
            'total_price': item.quantity * product.discounted_price,
            # 'shipping_method': shipping.method_description if shipping else None,
            # 'shipping_price': shipping.cost if shipping else None,
            'delivery_date': 'now'
        })
    logging.info(f"Cart details {cart_details}")
    return jsonify(cart_details), 200
    # users = Cart.query.filter_by(user_id=current_user.id).all()
    # return jsonify({
    #     'Cart items': user.total_cart(current_user.id),
    #     'products': product_list})


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
    logging.info(f"Cart details {cart_item.quantity}")
    if not cart_item:
        return jsonify({"error": "Item not found"}), 404
        # update total products
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


# get all shipping methods available
@login_required
@main.route('/shipping', methods=['GET'], strict_slashes=False)
def all_shipping():
    available_methods = Shipping.query.all()
    all_methods = [{"method": ship.method, "method_description": ship.method_description, "cost": ship.cost
                    } for ship in available_methods]
    return jsonify(all_methods), 200


# assign shipping method to product
@login_required
@main.route('/assignShipping/<product_id>', methods=['PUT'], strict_slashes=False)
def assign_shipping(product_id):
    data = request.json
    shipping_method = data.get('method_id')
    if not product_id:
        return jsonify({"error": f"Product not provided to add shipping to "})

    product = Product.query.get(product_id)
    # ship = Shipping.query.get(shipping_method)
    shipping = Shipping.query.filter_by(product_id=product_id, user_id=current_user.id).all()
    logging.info(f"shipping {shipping}")

    i = product.shippings
    try:
        # shipping = Shipping.query.filter_by(id=shipping_method, product_id=product.id).first()
        ship_method = Shipping.query.filter_by(method=shipping_method, product_id='').first()
        logging.info(f"shipping method {ship_method}")
        # if len(i) >= 1:
        #     i.pop(i[0])
        #     db.session.commit()
        # i.append(ship)
        for i in shipping:
            db.session.delete(i)
        db.session.commit()

        shipping_method = Shipping(cost=ship_method.cost, method=ship_method.method, method_description=ship_method.method_description,
                                   product_id=product_id, user_id=current_user.id)
        db.session.add(shipping_method)
        db.session.commit()
        return jsonify({"message": f"Shipping method add to product {product.product_name}"})
    except Exception as e:
        db.session.rollback()
        logging.info(f"Empty i :{e}")

        return jsonify({"message": f"Shipping already selected for this product {product.product_name}"})
    # return jsonify({"error": f"Product {product.product_name} does not exist"})

# change shipping for user
# Update Quantity of a product in the cart
# @login_required
# @main.route('/updateShipping/<int:product_id>', methods=['PUT'], strict_slashes=False)
# def update_shipping_method(product_id):
#     id = current_user.id
#     data = request.json
#     # product = Product.query.get(product_id)
#
#     if "method" not in data:
#         return jsonify({"message": "Shipping method not selected"}), 400
#
#     ship_prod = Shipping.query.filter_by(product_id=id, user_id=id).first()
#     if not ship_prod:
#         return jsonify({"message": "Item not found in cart"}), 404
#
#     new_ship = Shipping()
#     ship_prod.method = data["method"]
#     db.session.commit()
#
#     return jsonify({"message": "Shipping method updated successfully"}), 200



# Gets products in the cart
# @login_required
# @main.route('/checkout', methods=["GET"], strict_slashes=False)
# def checkout()