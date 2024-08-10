from flask import Blueprint

main = Blueprint('main', __name__, url_prefix="/")

# import views to prevent 404 error
from webapp.main.views import *


def create_module(app, **kwargs):
    app.register_blueprint(main)

