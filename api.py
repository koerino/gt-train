from flask import request, jsonify
import pymysql
import config

db = pymysql.connect(host=config.HOST, user=config.USER, passwd=config.PWD, db=config.DB)

def login():
    data = request.get_json()
    username = data['username']
    pwd = data['pwd']
    
    sql = "SELECT * FROM User WHERE Username = %s AND Password = %s"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql, (username, pwd))
    db.commit()

    res = cursor.fetchall()
    if len(res) == 0:
        return jsonify(msg="Login failed. Please check your credentials.")
    else: 
        return jsonify(res[0])