from flask_mail import Message
from . import mail
from flask import current_app, render_template
from flask_login import current_user


def send_email(subject, sender, recipients, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    # msg.body = text_body
    msg.html = html_body
    mail.send(msg)


# def send_coupon_email(total_price, total_shipping, cart_items, user):
#     send_email('[test] update mis',
#                sender=current_app.config['MAIL_USERNAME'],
#                recipients=[user],
#                html_body=render_template('email/m_update.html', user=user, cart_items=cart_items\
#                                          , total_price=total_price, total_shipping=total_shipping)
#                )

def send_coupon_email(total_price, total_shipping, cart_items, user='willsdelm@gmail.com'):
    msg = Message('[test] update mis',
        # sender=current_app.config['MAIL_USERNAME'],
        # recipients=[user],
        # html_body=render_template('email/m_update.html', user=user, cart_items=cart_items \
        #                             , total_price=total_price, total_shipping=total_shipping)
        )
    msg.sender = current_app.config['MAIL_USERNAME'],
    msg.recipient = user,
    msg.body = 'bbbhbhbhbhbh'
    msg.html_body = render_template('email/m_update.html', user=user, cart_items=cart_items \
                                , total_price=total_price, total_shipping=total_shipping)
    mail.send(msg)

# def send_password_reset_email(user):
#     token = user.get_reset_password_token()
#     send_email('[Microblog] Reset Your Password',
#                sender=app.config['ADMINS'][0],
#                recipients=[user.email],
#                text_body=render_template('email/reset_password.txt',
#                                          user=user, token=token),
#                html_body=render_template('email/reset_password.html',
#                                          user=user, token=token))