from flask import Blueprint

admin = Blueprint('admin',
                        __name__,
                        url_prefix="/admin")

# import views to prevent 404 error
from webapp.admin.views import *


def create_module(app, **kwargs):
    app.register_blueprint(admin)
