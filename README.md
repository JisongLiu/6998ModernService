flask-stripe
========================

Use this app to integrate Flask and Stripe with a simple user registration system. After user registration, the user is taken to a memeber's page where s/he can then purchase premium content via Stripe.

Flask==0.10.1
Flask-SQLAlchemy==0.16
Flask-WTF==0.8.4
Jinja2==2.7
MarkupSafe==0.18
SQLAlchemy==0.8.2
WTForms==1.0.4
Werkzeug==0.9.1
itsdangerous==0.22
requests==2.13.0
stripe==1.19.1
wsgiref==0.1.2
Pyjwt==1.4.2
 
## Setup

1. new and activate a virtualenv
2. install the requirements
3. run db_create.py
4. run application.py


## Screenshot




## Project structure

    ├── app
    │   ├── __init__.py
    │   ├── forms.py
    │   ├── keys.cfg
    │   ├── models.py
    │   ├── templates
    │   │   ├── 404.html
    │   │   ├── 500.html
    │   │   ├── base.html
    │   │   ├── charge.html
│   │   ├── login.html
    │   │   ├── products.html
    │   │   ├── members.html
    │   │   └── register.html
    │   └── views.py
    ├── config.py
    ├── db_create.py
    ├── error.log
    ├── requirements.txt
    └── run.py

