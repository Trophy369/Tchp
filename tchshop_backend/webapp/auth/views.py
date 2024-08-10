import logging

from flask import Flask, render_template, url_for, flash, redirect, request, make_response, jsonify, session
from webapp.auth import auth_views
from webapp.forms import SigninForm, SignupForm
from flask_login import current_user
from datetime import datetime
from flask_login import login_user, logout_user, login_required
from models.user import User
from webapp import db


@auth_views.route('/signup', methods=['GET', 'POST'], strict_slashes=False)
def signup():
    data = request.json
    # Check if username or email already exists
    existing_user = User.query.filter(User.email == data['email']).first()
    if existing_user:
        return jsonify({'message': 'Username or email already exists'}), 400

    else:
        # Create new user
        new_user = User(
            firstname=data.get('firstname', ''),
            lastname=data.get('lastname', ''),
            email=data['email'],
            agree=True,  # Example: Assuming agree is a boolean field
            city=data.get('city', ''),
            state=data.get('state', ''),
            country=data.get('country', ''),
            zipcode=data.get('zipcode', ''),
            phone=data.get('phone', '')
        )
        new_user.set_password(password=data['password'])
        # users.append(new_user)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully', 'user': new_user.firstname}), 201


@auth_views.route('/signin', methods=['GET', 'POST'], strict_slashes=False)
def signin():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    password = data['password']
    if user:
        if user.verify_password(password):
            login_user(user, remember=data.get('remember', True))

            # token = request.cookies
            # logging.info(f"token:{token}")
            session["userId"] = user.id
            return jsonify({"Message": "Login Successful", "username": user.firstname, "id": user.id}), 201
        return {"error": "Login failed Wrong password"}, 401
    return jsonify({"error": "Login failed"}), 401


@auth_views.route('/logout', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "User logged out"}), 201