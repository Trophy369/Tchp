import os
from config import Config
from flask import render_template, url_for, abort, redirect, request, flash, jsonify, current_app
from . import admin
from models.user import Role, User, Cart
from flask_login import login_required, current_user
from models.product import Product, Category, Review, Shipping, ReviewImage
from models.order import Order
from webapp.auth import has_role
from webapp import db
import re
from datetime import datetime
from werkzeug.utils import secure_filename
import logging


# Configure logging to display messages to the terminal
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])

# admin base route
# @login_required
@admin.route('/base', methods=["GET", "POST"], strict_slashes=False)
@has_role('administrator')
def base():
    users = User.query.all()
    roles = Role.query.all()
    products = Product.query.all()

    return jsonify({"Message": "Admin route success"}), 201

# create product category
@login_required
@admin.route('/create_category', methods=['POST'])
@has_role('administrator')
def create_category():
    data = request.json
    # # Check if category already exists
    categories = Category.query.filter_by(category_name=data['category_name']).first()
    if categories:
        return jsonify({'error': 'category_name exists parameter'}), 400
    new_category = Category(category_name=data['category_name'])
    db.session.add(new_category)
    db.session.commit()
    return jsonify({"Message": "create_category successful", "Data": new_category.category_name}), 201


# get category
@login_required
@admin.route('/category/<int:category_id>', methods=['POST'])
@has_role('administrator')
def category(category_id):
    cat = Category.query.filter_by(id=category_id).first()
    if cat:
        return jsonify({"Category": cat.category_name}), 200
    return jsonify({"error": "Category does not exist"}), 403


# assign a category
@login_required
@admin.route('/assign_category', methods=["PUT", "POST"], strict_slashes=False)
@has_role('administrator')
def assign_category():
    data = request.json
    all_cat = Category.query.all()
    all_prod = Product.query.all()
    product_name = data["product_name"]
    category_to_assign = data["category_to_assign"]
    product = Product.query.filter_by(product_name=data["product_name"]).first()
    if product is None:
        return {"error": "Product does not exist"}, 403

    category = Category.query.filter_by(category_name=data["category_to_assign"]).first()
    logging.info(f"Category: {category}")
    logging.info(f"Product: {product}")

    categories = product.prod_cat
    for cate in categories:
        if category_to_assign in cate.category_name:
            return {"error": "Category already exist for the Product"}, 403
    # for all_c in all_cat:
    if category_to_assign != category.category_name:
        return {"error": "Category does not exist"}, 403
    product.add_cat_to_prod(product_name, category_to_assign)
    db.session.commit()
    return {"Message": f"Category {category_to_assign} added to Product: {product.product_name} successfully"}, 201


@login_required
@admin.route('/delete_category/<id>', methods=['DELETE'], strict_slashes=False)
@has_role('administrator')
def delete_category(id):
    # get category by id
    cat = Category.query.filter_by(id=id).first()
    if cat:
        db.session.delete(cat)
        db.session.commit()
        return jsonify({"Message": "Delete_category successful", "Category": cat.category_name}), 201

    return {"Message": "Category does not exist"}, 400


# delete role from a particular user
@login_required
@admin.route('/delete_role/<id>', methods=["DELETE"], strict_slashes=False)
@has_role('administrator')
def admin_delete_role(id):
    roles = Role.query.all()
    delete_id = Role.query.get(id)
    if delete_id:
        db.session.delete(delete_id)
        db.session.commit()
        return {"Message": f"Role {delete_id.name} deleted"}, 200
    return {"Error": "No such role"}, 403


# create roles to users
@login_required
@admin.route('/create_role', methods=["GET", "POST"], strict_slashes=False)
@has_role('administrator')
def create_role():
    all_roles = Role.query.all()
    data = request.json
    if len(all_roles) <= 4:
        role_name = data['name']
        for i in all_roles:
            if i.name == role_name:
                return {"Message": "Role already exist!"}, 403
        new_role = Role(name=role_name)
        db.session.add(new_role)
        db.session.commit()
        return {"Message": "Role added successfully!"}, 201
    return {"Message": "Roles greater than 4"}, 401


# assign roles to users
@login_required
@admin.route('/assign_role', methods=["PUT"], strict_slashes=False)
@has_role('administrator')
def assign_role():
    data = request.json
    email = data["email"]
    role_to_assign = data["role_to_assign"]
    user = User.query.filter_by(email=data["email"]).first_or_404()
    roles = user.roles
    logging.info(f"Roles for the user: {roles}")
    for role in user.roles:
        if role_to_assign in role.name:
            return {"error": "rolename already exists"}, 403

    if email and role_to_assign:
        user.add_role_to_user(email, role_to_assign)
        return {"Message": f"Role {role_to_assign} added to User: {user.email} successfully"}, 201
    return {"error": "User or rolename does not exists"}, 403


# Product route
@login_required
@admin.route('/addproduct', methods=['POST'], strict_slashes=False)
@has_role('administrator')
def addproduct():
    new_product = request.json
    products = Product.query.filter_by(product_name=new_product['product_name']).first()
    if products:
        return jsonify({'error': 'product_name exists parameter'}), 403
    prod_name = new_product['product_name']
    new_product = Product(
        product_name=new_product["product_name"],
        quantity=new_product["quantity"],
        regular_price=new_product["regular_price"],
        discounted_price=new_product["discounted_price"],
    )
    db.session.add(new_product)
    db.session.commit()
    db.session.close()
    return jsonify({"Message": "Product  added successfully", "Product name": prod_name}), 201


# delete product
@login_required
@admin.route('/delete_product/<id>', methods=["POST"], strict_slashes=False)
@has_role('administrator')
def admin_delete_product(id):
    products = Product.query.all()
    delete_id = Product.query.get(id)
    if delete_id:
        delete_id.delete_user_role(id=delete_id)
        db.session.commit()
        flash(f"User {delete_id.product_name}'s Role deleted")
        return redirect(url_for("admin.base"))

# shipping
# add_shipping methods and price
@login_required
@admin.route('/addShipping', methods=['POST'], strict_slashes=False)
@has_role('administrator')
def add_shipping():
    data = request.json
    cost = data.get('cost')
    method = data.get('method')
    method_description = data.get('method_description')
    if Shipping.query.filter_by(method=method).first():
        return jsonify({"message": f"Shipping method already exist"})
    elif cost or method:
        shipping_method = Shipping(cost=cost, method=method, method_description=method_description)
        db.session.add(shipping_method)
        db.session.commit()
        return jsonify({"message": f"Shipping method added"})
    db.session.rollback()
    return jsonify({"error": f"Failed to add"})


# delete shipping method
@login_required
@admin.route('/delete_shipping/<method>', methods=["DELETE"], strict_slashes=False)
@has_role('administrator')
def admin_delete_shipping(method):
    shippings = Shipping.query.filter_by(method=method, user_id=None).all()
    delete_id = Shipping.query.filter_by(method=method).first()
    if delete_id in shippings:
        db.session.delete(delete_id)
        db.session.commit()
        return {"Message": f"Shipping {delete_id.method_description} deleted"}, 200
    return {"Error": "No such shipping"}, 403


# get shippings with product id arg
@login_required
@admin.route('/shipping', methods=['GET'], strict_slashes=False)
@has_role('administrator')
def all_shipping():
    available_methods = Shipping.query.all()
    all_methods = [{"method": ship.method, "method_description": ship.method_description, "cost": ship.cost
                    } for ship in available_methods]
    return jsonify(all_methods), 200


# add reviews
@login_required
@admin.route('/addReview/<int:product_id>', methods=['GET', 'POST'], strict_slashes=False)
@has_role('administrator')
def add_review(product_id):
    data = request.form
    review_images = request.files.getlist('file')
    logging.info(f"len img review {len(review_images)}")

    user = current_user.id
    product = Product.query.get_or_404(product_id)
    rating = data['rating']
    review = data['review']

    if current_user:
        product_review = Review(product_rating=rating, product_review=review, timestamp=datetime.utcnow())
        product_review.productid = product.id
        product_review.user_id = user
        db.session.add(product_review)
        db.session.commit()
        prod_reviews = Review.query.filter_by(productid=product.id).first()
        # logging.info(f"review {prod_reviews}")
        # return jsonify({'Message': "Successfully reviewed"}), 200

        if len(review_images) >= 1 and (len(review_images) <= 5):
            prod_reviews = Review.query.filter_by(productid=product.id).first()
            logging.info(f"prod review {prod_reviews}")

            for uploaded_file in review_images:
                name = secure_filename(uploaded_file.filename)
                filename = product.product_name + '_' + name

                if name != '':
                    file_ext = os.path.splitext(filename)[1]
                    if file_ext not in current_app.config['UPLOAD_EXTENSIONS']:
                        abort(400)
                    rev_img = ReviewImage(image=filename, review_id=prod_reviews.id, product_id=product_id)
                    db.session.add(rev_img)
                    db.session.commit()
                    # image.append(filename)
                    # logging.info(f"all images: {image}")
                uploaded_file.save(os.path.join(current_app.config['REVIEW_UPLOAD_PATH'], filename))
        #     image.append(filename)
        u = ReviewImage.query.filter_by(review_id=prod_reviews.id)
        return jsonify({'Message': "Successfully reviewed"}), 200
    db.session.rollback()
    return jsonify({'error': 'review failed'}), 404





# START CART MODULE
# Gets products in the cart
# def getusercartdetails():
#     userId = User.query.with_entities(User.userid).filter(User.email == session['email']).first()
#
#     productsincart = Product.query.join(Cart, Product.productid == Cart.productid) \
#         .add_columns(Product.productid, Product.product_name, Product.discounted_price, Cart.quantity, Product.image) \
#         .add_columns(Product.discounted_price * Cart.quantity).filter(
#         Cart.userid == userId)
#     totalsum = 0
#
#     for row in productsincart:
#         totalsum += row[6]
#
#     tax = ("%.2f" % (.06 * float(totalsum)))
#
#     totalsum = float("%.2f" % (1.06 * float(totalsum)))
#     return (productsincart, totalsum, tax)

