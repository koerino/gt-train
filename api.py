from flask import request, Response, jsonify, json
import pymysql
import config
from store import User, Schedules, Reviews

#store global application data
user = User("")
sches = Schedules([])
reviews = Reviews([])

db = pymysql.connect(host=config.HOST, user=config.USER, passwd=config.PWD, db=config.DB)

def login():
    data = request.get_json()
    username = data['username']
    pwd = data['pwd']
    
    sqlA = "SELECT * FROM (User NATURAL JOIN Manager) WHERE Username = %s AND Password = %s"
    sqlB = "SELECT * FROM (User NATURAL JOIN Customer) WHERE Username = %s AND Password = %s"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sqlA, (username, pwd))
    resA = cursor.fetchall()
    cursor.execute(sqlB, (username, pwd))
    resB = cursor.fetchall()
    
    if (len(resA) == 0 and len(resB) == 0):
        return jsonify(msg="Login failed. Please check your credentials.")
    elif len(resA) != 0:
        userN = resA[0]["Username"]
        user.setUserName(userN)
        resA[0]["type"] = "manager"
        return jsonify(resA[0])
    else:
        userN = str(resB[0]["Username"])
        user.setUserName(userN)
        resB[0]["type"] = "customer"
        return jsonify(resB[0])
    
def register():
    data = request.get_json()
    username = data['username']
    pwd = data['pwd']
    cpwd = data['cpwd']
    email = data['email']
    
    if (len(username) == 0):
        return jsonify(msg="Please enter your username.")
    elif (len(email) == 0):
        return jsonify(msg="Please enter your email.")
    elif (len(pwd) == 0):
        return jsonify(msg="Please enter your password.")
    elif (pwd != cpwd):
        return jsonify(msg="Passwords do not match.")
    else:
        cursor = db.cursor()
        
        #check if username is available
        sql = "SELECT * FROM Customer WHERE Username = %s"
        cursor.execute(sql,(username))
        res = cursor.fetchall()
        #if username is used
        if len(res) != 0:
            return jsonify(msg="User already exists. Please login instead.")
        
        #check if email is available
        sql = "SELECT * FROM Customer WHERE Email = %s"
        cursor.execute(sql,(email))
        res = cursor.fetchall()
        #if email is used
        if len(res) != 0:
            return jsonify(msg="Email already exists. Please login instead.")
        
        sql = "INSERT INTO User (Username, Password) VALUES (%s, %s)"
        cursor.execute(sql,(username, pwd))
        sql = "INSERT INTO Customer (Username, Email, IsStudent) VALUES (%s, %s, 0)"
        cursor.execute(sql,(username, email))
        
        #check if user register successfully
        sql = "SELECT * FROM Customer WHERE Email = %s"
        cursor.execute(sql,(email))
        resA = cursor.fetchall()

        sql = "SELECT * FROM (User NATURAL JOIN Customer) WHERE Email = %s AND Username = %s"
        cursor.execute(sql,(email,username))
        res = cursor.fetchall()
        
        if (len(res) != 0):
            return jsonify(msg="Registration successful!")
        else:
            return jsonify(msg="Registration failed. Please try again.")
        
def add_school():
    data = request.get_json()
    sEmail = data['sEmail']
    if len(sEmail) == 0 or (sEmail[len(sEmail)-4:] != ".edu"):
        return jsonify(msg="Please enter a valid student email.")
    else:
        sql = "UPDATE Customer SET IsStudent = 1 WHERE Username = %s"
        userN = user.getUserName()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor.execute(sql,(userN))
        
        #check if student status is updated
        sql = "SELECT IsStudent FROM Customer WHERE Username = %s"
        cursor.execute(sql,(userN))
        res = cursor.fetchall()
        if len(res) != 0 and res[0]["IsStudent"] == 1:
            return jsonify(msg="School Info Added!")
        else:
            return jsonify(msg="Error occurs. Please try again.")
        
def get_sche(trainNo):
    sql = "SELECT TrainNumber, Name, CONCAT(ArrivalTime), CONCAT(DepartureTime) FROM Stop WHERE TrainNumber = %s ORDER BY ArrivalTime"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql,(trainNo))
    res = cursor.fetchall()
    
    if len(res) == 0:
        return jsonify(msg="Requested train does not exist.")
    else:
        sches.setSches(res)
        res =  Response(json.dumps(res), mimetype='application/json')
        return res

def get_reviews(trainNo):
    sql = "SELECT * FROM Review WHERE TrainNumber = %s ORDER by Rating"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql,(trainNo))
    res=cursor.fetchall()

    if len(res) == 0:
        return jsonify(msg="Requested train does not exist or there's no review yet.")
    else:
        reviews.setReviews(res)
        res =  Response(json.dumps(res), mimetype='application/json')
        return res
    
#def get_station():
#    sql="SELECT * FROM Station"
#    cursor = db.cursor(pymysql.cursors.DictCursor)
#    cursor.execute(sql)
#    res = cursor.fetchall()
#    res_formatted = [{"a": "b"}]
#    print (res_formatted)
#    for station in res:
#        value = station["Name"]
#        label = station["Location"] + " (" + station["Name"] + " )"
#        res_formatted.append({"value": value, "label": label})
#    
#    print(res_formatted)
#    return res_formatted   