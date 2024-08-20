#Get that order placed -- yass queen.
@order_routes.route('/checkout', methods=['POST'])
@login_required
def checkout():
    cart_items = CartItem.query.filter_by(userId=current_user.id).all()

    if not cart_items:
        return jsonify(status="error", error_type="empty_cart", message="Your cart is empty"), 400

    # Check if there's enough stock
    for cart_item in cart_items:
        product = Product.query.get(cart_item.productId)
        if not product:
            return jsonify(status="error", message=f"Product with ID {cart_item.productId} not found"), 404

        if product.quantity < cart_item.quantity:
            return jsonify(status="error", message=f"Not enough stock for product {product.productName}"), 400

    # Update the product's available quantity
    for cart_item in cart_items:
        product = Product.query.get(cart_item.productId)
        product.quantity -= cart_item.quantity

    total_price = sum(item.price * item.quantity for item in cart_items)

    # Hard-coded Placeholders for Data + Error Handler
    shipping_address = 'The Forbidden Cats Treehouse, Sky Island'
    billing_address = 'The Forbidden Cats Treehouse, Sky Island'
    payment_method = 'A handful of Acorns'
    if not all([shipping_address, billing_address, payment_method]):
        return jsonify(status="error", error_type="missing_data", message="Hard-coded Shipping and Billing Details-related error"), 400

    new_order = Order(
        userId=current_user.id,
        totalPrice=total_price,
        shippingAddress=shipping_address,
        billingAddress=billing_address,
        paymentMethod=payment_method,
        orderStatus="processing"
    )

    db.session.add(new_order)
    db.session.commit()

    for cart_item in cart_items:
        order_item = OrderItem(orderId=new_order.id, productId=cart_item.productId)
        db.session.add(order_item)
        db.session.delete(cart_item)

    db.session.commit()

    return jsonify(status="success", message="Checkout successful", data=new_order.to_dict()), 200
