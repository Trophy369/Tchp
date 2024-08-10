from webapp import db
from models.base_model import BaseModel
from models.user import User
# from models.product import Product
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table, Boolean, Float


class Order(db.Model):
    __tablename__ = "order"
    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    userid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, primary_key=True)

    def __repr__(self):
        return f"Order('{self.id}', '{self.order_date}','{self.total_price}','{self.userid}'')"


class OrderedProduct(db.Model):
    __tablename__ = "orderedproduct"
    id = db.Column(db.Integer, primary_key=True)
    orderid = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    productid = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Order('{self.id}', '{self.orderid}','{self.productid}','{self.quantity}')"


class SaleTransaction(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True)
    orderid = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    response = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"Order('{self.id}', '{self.orderid}', '{self.amount}', '{self.response}')"
