from webapp import db
from models.base_model import BaseModel
from models.user import User
# from models.product import Product
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table, Boolean, Float


class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_date = db.Column(db.DateTime, nullable=False)
    shipping_price = db.Column(db.Integer, nullable=False)
    billing_address = db.Column(db.String(90), nullable=False)
    contacts = db.Column(db.String(200), nullable=False)
    userid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    ordered_products = db.relationship('OrderedProduct', backref='orders', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'order_date': self.order_date,
            'total_shipping': self.shipping_price,
            'billing_address': self.billing_address,
            'contacts': self.contacts,
            'userid': self.userid
        }

    def __repr__(self):
        return f"Order('{self.id}', '{self.order_date}','{self.contacts}','{self.shipping_price}','{self.billing_address}','{self.userid}'')"


class OrderedProduct(db.Model):
    __tablename__ = "ordered_products"
    id = db.Column(db.Integer, primary_key=True)
    orderid = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    productid = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Order('{self.id}', '{self.orderid}','{self.productid}','{self.quantity}')"


class Coupon(db.Model):
    __tablename__ = "coupons"
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(15), unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    percentage = db.Column(db.String(3))
    status = db.Column(db.String(10))

    def to_dict(self):
        return {
            "code": self.code or None,
            "user_id": self.user_id or None,
            "percentage": self.percentage or None,
            "status": self.status or None
        }


class SaleTransaction(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True)
    orderid = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    response = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"Order('{self.id}', '{self.orderid}', '{self.amount}', '{self.response}')"




# CREATE TABLE coupons (
#    id INTEGER NOT NULL PRIMARY KEY,
#    code TEXT,
#    user_id INTEGER NOT NULL FOREIGNKEY,
#    percentage TEXT,
# status TEXT);
