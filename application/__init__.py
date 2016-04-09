from flask import Flask, render_template

app=Flask(__name__)

#app.config.from_object('config')

@app.route('/')
@app.route('/<path:path>')
def index(path=None):
    return render_template('index.html')