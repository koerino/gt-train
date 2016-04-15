from flask import Flask, render_template, json, request
import pymysql

app=Flask(__name__)
app.config.from_pyfile('config.cfg')

db = pymysql.connect(host=app.config['HOST'], user=app.config['USER'], passwd=app.config['PWD'], db=app.config['DB'])
cursor = db.cursor()

sql = """ CREATE TABLE people
               (id INTEGER PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                email TEXT,
                age INTEGER)"""

cursor.execute(sql)

#sql = """INSERT INTO Manager (Username) VALUES (%s)"""
#cursor.execute(sql, ("manger"))
#cursor.close()

@app.route('/')
@app.route('/<path:path>')
def index(path=None):
    return render_template('index.html')