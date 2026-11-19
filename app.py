from flask import Flask, render_template, request, url_for, flash, redirect
from models import Room
import re

import psycopg2
from psycopg2.extras import RealDictCursor


app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev-secret-key'

@app.route('/')
def index():
    return 'Конференции.РФ работает'

@app.route('/about')
def about():
    return 'Портал бронирования помещений'

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/rooms')
def rooms():
    connection = psycopg2.connect(
        host="localhost",
        port=5432,
        dbname="conferences",
        user="conf_user",
        password="conf_pass"
    )
    with connection:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM rooms")
            rooms_list = cursor.fetchall()
    connection.close()
    return render_template('rooms.html', rooms=rooms_list)


@app.route("/hello", methods=["GET", "POST"])
def hello():
    error = ""
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        if not name:
            error = "Введите имя"
        elif not re.fullmatch(r"[А-Яа-яЁё ]+", name):
            error = "Имя должно содержать только кириллицу"
        else:
            flash(f"Здравствуйте, {name}!", "success")
            return redirect(url_for("hello"))
    return render_template("hello.html", error=error)
