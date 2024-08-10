from webapp import db
from models.base_model import BaseModel
from models.user import *
# from models.order import Shipping
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table, Boolean, Float


product_shipping = db.Table(
    'product_shipping',
    db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True),
    db.Column('shipping_id', db.Integer, db.ForeignKey('shippings.id'), primary_key=True)
)


product_category = db.Table(
    "prod_category",
    db.Column('category_id', db.Integer, db.ForeignKey('categories.id')),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id')))


# product category
class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True, nullable=False, index=True)
    category_name = db.Column(db.String(100), nullable=False, unique=True)
    # One-to-many relationship with Product
    # products = db.relationship('Product', backref='category')

    def __repr__(self):
        return f"Category('{self.id}', '{self.category_name}')"

    def to_dict(self):
        return {
            'id': self.id,
            'category_name': self.category_name,
        }


# product description
class Description(db.Model):
    __tablename__ = 'descriptions'
    id = db.Column(db.Integer, primary_key=True)
    specifications = db.Column(db.Text, nullable=True)
    images = db.relationship('DescriptionImage', backref='descriptions', lazy=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=True)

    
# decription images for more images for product description
class DescriptionImage(db.Model):
    __tablename__ = 'descriptionimages'
    id = db.Column(db.Integer, primary_key=True)
    image_name = db.Column(db.String(100), nullable=False)
    description_id = db.Column(db.Integer, db.ForeignKey('descriptions.id'), nullable=True)


# product image table relationship with product
class ProductImage(db.Model):
    __tablename__ = 'productimages'
    id = db.Column(db.Integer, primary_key=True)
    image_name = db.Column(db.String(100), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)


# product
class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    regular_price = db.Column(db.Float, nullable=False)
    discounted_price = db.Column(db.Float, nullable=False)
    number_sold = db.Column(db.Integer)

    # add a shipping relationship table with product
    shippings = db.relationship('Shipping', secondary=product_shipping, backref=db.backref('products', lazy=True))
    # shippings = db.relationship('Shipping', backref='products', cascade="all, delete", lazy=True)

    # add description table and look into one to many relationship
    descriptions = db.relationship('Description', backref='products', lazy=True)

    # add images to each product
    images = db.relationship('ProductImage', backref='products', lazy=True)

    prod_cat = db.relationship('Category', secondary=product_category, backref=db.backref('products', lazy=True))
    reviews = db.relationship("Review", backref='products')

    cart_items = db.relationship('CartItem', backref='products', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'product_name': self.product_name,
            'description': self.descriptions,
            'categoryid': self.categoryid,
            'quantity': self.quantity,
            'regular_price': self.regular_price,
            'discounted_price': self.discounted_price
        }

    # get product by product name
    def get_product_id_by_name(self, product_name):
        # query user table by email and get first result
        product = Product.query.filter_by(product_name=product_name).first()
        # if user is found return user ID
        if product:
            return product.id
        return None

    # assign category to a product
    def add_cat_to_prod(self, product_name, category_name):
        # get product id from product_name
        product_id = self.get_product_id_by_name(product_name)
        cat = Category.query.filter_by(category_name=category_name).first()
        # loaded product to assign category to
        product = Product.query.filter_by(id=product_id).first()
        product.prod_cat.append(cat)
        db.session.commit()

    def __repr__(self):
        return (f"Product('{self.id}','{self.product_name}',  '{self.quantity}', descriptions: '{self.descriptions}'\
         '{self.regular_price}', '{self.discounted_price}', '{self.prod_cat}', {self.cart_items}, number_sold: {self.number_sold}"
                f"shipping: {self.shippings})")


# cart item for quantity
class CartItem(db.Model):
    __tablename__ = 'cart_item'
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    def __repr__(self):
        return f"Cart_id: {self.cart_id}, Product_id: {self.product_id}, Quantity: {self.quantity}"


# shares one to many relationship with products
class Shipping(db.Model):
    __tablename__ = 'shippings'
    id = db.Column(db.Integer, primary_key=True)
    cost = db.Column(db.Float, nullable=False)
    method = db.Column(db.Integer, nullable=False)
    method_description = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return (f"Shipping(id: '{self.id}' Method: '{self.method}', Cost: '{self.cost}', Method Description: '{self.method_description}', "
                f"'user_id: '{self.user_id}')")


# product review
class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    product_rating = db.Column(db.Integer)
    product_review = db.Column(db.Text, nullable=True)
    productid = db.Column(db.Integer, db.ForeignKey('products.id'))

    def __repr__(self):
        return f"Product('{self.productid}','{self.product_review}','{self.product_rating}')"
