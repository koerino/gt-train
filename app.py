from flask import Flask, render_template
import api

app = Flask(__name__)

@app.route('/')
@app.route('/<path:path>')
def index(path=None):
    return render_template('index.html')

@app.route('/api/login', methods=['GET', 'POST'])
def login():
    return api.login()