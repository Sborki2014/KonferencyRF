from flask import Flask, render_template
from models import Room

app = Flask(__name__)

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
    rooms_list = [
        Room(1, 'Кинозал "Премьер"', 'Кинозал'),
        Room(2, 'Коворкинг "Старт"', 'Коворкинг'),
        Room(3, 'Большой лекторий', 'Аудитория')
    ]
    return render_template('rooms.html', rooms=rooms_list)