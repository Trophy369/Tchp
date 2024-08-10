#!/usr/bin/env python3
"""
User and Role Model: create a SQLAlchemy model User
"""
from webapp import db
from models.base_model import BaseModel
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table, Boolean, Float
from flask import current_app, flash
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_login import AnonymousUserMixin, current_user
from uuid import uuid4, UUID
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])

cart_product = db.Table(
    'cart_product',
    db.Column('cart_id', db.Integer, db.ForeignKey('carts.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True)
)

user_roles = db.Table(
    'role_users',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('role_id', db.Integer, db.ForeignKey('roles.id')),
)


# product cart
class Cart(db.Model):
    __tablename__ = "carts"
    id = db.Column(db.Integer, primary_key=True, index=True)
    productid = db.relationship('Product', secondary=cart_product, backref=db.backref('carts', lazy=True))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # quantity = db.Column(db.Integer, nullable=False, default=0)
    cart_items = db.relationship('CartItem', backref='carts', lazy=True)

    # cart count
    def total_cart(self, user_id):
        all_cart = Cart.query.filter_by(user_id=user_id).all()
        for i in all_cart:
            return len(i.productid)

    def add_to_cart(self, user, cart_len, quantity, product_id):
        # user = current_user.id
        from models.product import Product, CartItem, Cart

        product = Product.query.get(product_id)
        # shipping_method = Shipping.query.get(shipping)
        cart = Cart.query.filter_by(user_id=user).first()
        user = User.query.get(user)

        if user and product:
            if cart is None:
                # cart_count = 1
                add = Cart(user_id=user.id)
                db.session.add(add)
                db.session.commit()
                # cart_item = CartItem.query.filter_by(cart_id=cart.id, product_id=product.id).first()
                updated_cart = Cart.query.filter_by(user_id=user.id).first()
                add_cartitem = CartItem(cart_id=updated_cart.id, product_id=product.id, quantity=quantity)
                db.session.add(add_cartitem)

                # ship = CartItem.query.filter_by(cart_id=updated_cart.id, product_id=product.id).first()
                # ship.shippings.append(shipping_method)
                logging.info(f"product count: {product.quantity}")

                product.quantity -= quantity
                logging.info(f"product count sub: {product.quantity}")

                db.session.commit()
                cart_len += 1
                return cart_len
            else:
                add_cartitem = CartItem(cart_id=user.id, product_id=product.id, quantity=quantity)
                db.session.add(add_cartitem)
                db.session.commit()

                logging.info(f"product existing count: {product.quantity}")

                product.quantity -= int(quantity)
                logging.info(f"product existing count sub: {product.quantity}")

                # cart = Cart.query.filter_by(user_id=user.id).first()
                logging.info(f"User existing cart : {cart.total_cart(user_id=user.id)}")

                user_c = cart.productid.append(product)
                uc = user.carts
                uc.append(cart)
                logging.info(f"User cart : {uc}")

                logging.info(f"User cart : {user_c}")
                db.session.commit()
                cart_len += len(cart.productid)
                return cart_len
        return logging.error("error")

    def __repr__(self):
        return f"Cart('{self.id}', '{self.productid}, 'user_id: {self.user_id}, 'Cart_items: {self.cart_items})"


class User(db.Model):
    """Class User
    """
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, index=True)
    firstname = db.Column(db.String(64), unique=False, index=True)
    lastname = db.Column(db.String(64), unique=False, index=True)
    agree = db.Column(db.Boolean, default=True)
    password_hash = db.Column(db.String(128))
    city = db.Column(db.String(20), unique=False)
    state = db.Column(db.String(20), unique=False)
    country = db.Column(db.String(20), unique=False)
    zipcode = db.Column(db.String(20), unique=False)
    phone = db.Column(db.String(20), nullable=False)

    roles = db.relationship("Role", secondary=user_roles, backref=db.backref('users', lazy=True))
    carts = db.relationship('Cart', backref='users', lazy=True)
    # carts = db.relationship('Cart', secondary=cart_product, backref=db.backref('users', lazy=True), uselist=False, cascade='all, delete-orphan')
    orders = db.relationship('Order', backref='users', lazy=True)
    # shippings = db.relationship('Shipping', backref='users', cascade="all, delete", lazy=True)

    def __init__(self, email, firstname, lastname, agree, city, state, country, zipcode, phone):
        self.email = email
        default = Role.query.filter_by(name="default").one()
        self.firstname = firstname
        self.lastname = lastname
        self.agree = agree
        self.roles.append(default)
        self.city = city
        self.state = state
        self.country = country
        self.zipcode = zipcode
        self.phone = phone

    def serialize(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'agree': self.agree,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'zipcode': self.zipcode,
            'phone': self.phone,
            'roles': [role.name for role in self.roles] 
            # Add more fields as needed
        }

        # add administrator
        # if self.email == current_app.config['ADMIN']:
        #     admin = Role(name='administrator')
        #     db.session.add(admin)
        #     db.session.commit()
        #     self.roles.append(admin)

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def has_role(self, role_name):
        return any(role.name == role_name for role in self.roles)
    # def has_role(self, *name):
    #     for role in self.roles:
    #         if role.name in name:
    #             return True
    #     return False

    # get current user roles
    # def get_user_role(self):
    #     return self.roles
    # for i in name:
    #     if i in self.roles:
    #         return True
    # return False


    # get user by email
    def get_user_id_by_email(self, email):
        # query user table by email and get first result
        user = User.query.filter_by(email=email).first()
        # if user is found return user ID
        if user:
            return user.id
        return None

    # add role to a user
    def add_role_to_user(self, email, role_name):
        # get user id from email
        # user = self.get_user_id_by_email(email)
        role = Role.query.filter_by(name=role_name).first()
        user_id = self.get_user_id_by_email(email)
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return {"error": "User does not exists"}, 403
        if not role:
            role = Role(name=role_name)
            db.session.add(role)
        if role_name not in user.roles:

            user.roles.append(role)
            db.session.commit()
        return {"Message": f"Role {role_name} added to User: {user.email} successfully"}, 201

    # delete a role from user
    def delete_user_role(self, id):
        # get user id from email
        user = self.get(id)
        # loaded user to delete role from
        role_delete = User.query.filter_by(id=user).one()
        users_roles = role_delete.roles
        if user:
            if len(users_roles) > 0:
                users_roles.pop()
                # role_delete.roles.pop()
                db.session.commit()
            flash(f"User has no role at the moment")

    @property
    def is_active(self):
        return True

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    # fixes user signin route not redirecting if you're not using the UserMixin class
    def get_id(self):
        return (self.id)

    def __repr__(self):
        return f"User('{self.firstname}', '{self.lastname}'), '{self.roles}', " \
               f"'{self.city}', '{self.state}', '{self.country}', '{self.zipcode}', '{self.email}', '{self.carts}'"


class Role(db.Model):
    """Class Role: Database table named role
    Attributes:
    * id, integer primary key
    * name, non-nullable string

    - roles available = [<Role 'default'>, <Role 'doctor'>, <Role 'record_officer'>, <Role 'administrator'>]
    """
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Role %r>' % self.name


class AnonymousUser(AnonymousUserMixin):
    def has_role(self, name='default'):
        return False

    def can(self, permissions):
        return False

    def is_administrator(self):
        return False

    @property
    def is_anonymous(self):
        return True