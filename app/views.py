from app import app, db
from flask import flash, redirect, render_template, request, session, url_for
from functools import wraps
from app.forms import RegisterForm, LoginForm
from app.models import User
from sqlalchemy.exc import IntegrityError
from werkzeug.security import safe_str_cmp
from flask_jwt import JWT, jwt_required, current_identity
import os
import stripe
import jwt
import json
app.config.from_pyfile('keys.cfg')
stripe_keys = {
    'secret_key': app.config['SECRET_KEY'],
    'publishable_key': app.config['PUBLISHABLE_KEY']
}

stripe.api_key = stripe_keys['secret_key']

def flash_errors(form):
    for field, errors in form.errors.items():
        for error in errors:
            flash(u"Error in the %s field - %s" % (
                getattr(form, field).label.text,error), 'error')

def login_required(test):
    @wraps(test)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return test(*args, **kwargs)
        else:
            flash('You need to login first.')
            return redirect(url_for('login'))
    return wrap

@app.route('/logout/')
def logout():
    session.pop('logged_in', None)
    session.pop('user_email', None)
    flash('You have logged out.')
    return redirect (url_for('login'))


jwt = None
@app.route('/')
@app.route('/', methods=['GET', 'POST'])
#@jwt_required()
#def authenticate():
   # user = username_table.get(username, None)
   # if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
   # return user

#def identity(payload):
    #user_id = payload['identity']
    #return userid_table.get(user_id, None)
 #   return user

def login():
    global jwt
    error = None
    if request.method=='POST':
        u = User.query.filter_by(name=request.form['name'],
                          password=request.form['password']).first()
        user = User.query.filter(User.name== request.form['name']).scalar()
	print user
	if u is None:
            error = 'Invalid username or password.'
        else:
            session['logged_in'] = True
            session['user_email'] = u.email
            flash('You have logged in.')
	    #user= {'name':u.name, 'password':u.password}
	    print type(u),u.name,u.password
	    def authenticate(user):
		return user
	    def identity(payload):
		return user
	    jwt = JWT(None,authenticate, identity)
	    #print jwt
	    return redirect(url_for('members'))

    return render_template("login.html",
                            form = LoginForm(request.form),
                            error = error)

@app.route('/members/')
@login_required
@jwt_required()
def members():
    print jwt
    return render_template('members.html', key=stripe_keys['publishable_key'])

#@login_required
@app.route('/charge', methods=['POST'])
def charge():
    # Amount in cents
    amount = 600
    email = session['user_email']

    customer = stripe.Customer.create(
        email=email,
        card=request.form['stripeToken']
    )

    charge = stripe.Charge.create(
        customer=customer.id,
        amount=amount,
        currency='usd',
        description='Flask Charge'
    )

    return render_template('charge.html', amount=amount)

@app.route('/register/', methods=['GET','POST'])
def register():
    error = None
    form = RegisterForm(request.form, csrf_enabled=False)
    if form.validate_on_submit():
        new_user = User(
                    form.name.data,
                    form.email.data,
                    form.password.data,
                    )
        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Thanks for your registering. Please login.')
            return redirect(url_for('login'))
        except IntegrityError:
            error = 'The username and/or email already exist. Please try again.'
    else:
        flash_errors(form)
    return render_template('register.html', form=form, error=error)

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500

@app.errorhandler(404)
def internal_error(error):
    return render_template('404.html'), 404
