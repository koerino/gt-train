from flask import request, Response, jsonify, json
import pymysql
import config
import time, random
from datetime import datetime
from store import User, Schedules, Reviews, Departures

"""Note: Storing instance data globally shall never happen in the real world. Nevertheless this class focuses on database design and SQL so we use it for the final demo of the prototype app."""

"""Note: ORMs are not allowed for the project."""

#global application data
user = User("")
sches = Schedules([])
reviews = Reviews([])
deps = Departures([])

cancelInfo = []
updateInfo = [{}]
temp_resv = [{}]
temp_id = []
c = 0

db = pymysql.connect(host=config.HOST, user=config.USER, passwd=config.PWD, db=config.DB)

#authentication

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
        global temp_resv
        temp_resv = [{}]
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

#add school info        
    
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
        
#view schedules
        
def get_sche(trainNo):
    sql = "SELECT TrainNumber, Name, CONCAT(ArrivalTime) AS ArrivalTime, CONCAT(DepartureTime) AS DepartureTime FROM Stop WHERE TrainNumber = %s ORDER BY ArrivalTime"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql,(trainNo))
    res = cursor.fetchall()
    
    if len(res) == 0:
        return jsonify(msg="Requested train does not exist.")
    else:
        sches.setSches(res)
        res =  Response(json.dumps(res), mimetype='application/json')
        return res

#view and submit reviews    

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
    
def submit_review():
    data = request.get_json()
    trainNo = data['trainNo']
    rating = data['rating']
    comment = data['comment']
    userN = user.getUserName()
    reviewNo = idGenerator()
    sql = "SELECT * FROM TrainRoute WHERE TrainNumber = %s"
    cursor = db.cursor()
    cursor.execute(sql,(trainNo))
    res = cursor.fetchall()
    
    if len(res) == 0:
        return jsonify(msg="Train does not exist.")
    else:
        sql = "INSERT INTO Review(ReviewNumber, TrainNumber, Rating, Username, Comment) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql,(reviewNo, trainNo, rating, userN, comment))
        return jsonify(msg="Review submitted successfully!")
    
#make reservation    

#get the dropdown menu for stations
def get_stations():
    sql="SELECT * FROM Station"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql)
    res = cursor.fetchall()
    res_formatted = []
    for station in res:
        value = station["Name"]
        label = station["Location"] + " (" + station["Name"] + ")"
        res_formatted.append({"value": value, "label": label})
    
    return Response(json.dumps(res_formatted), mimetype='application/json')  

#get the dropdown menu for credit cards
def get_cards():
    userN = user.getUserName()
    sql="SELECT * FROM PaymentInfo WHERE Username = %s"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql, (userN))
    res = cursor.fetchall()
    res_formatted = []
    for card in res:
        value = card["CardNumber"]
        label = "Ends In " + card["CardNumber"][-4:]
        res_formatted.append({"value": value, "label": label})
    return Response(json.dumps(res_formatted), mimetype='application/json')  

#get departures that match the search
def get_deps(dep, arr, date):    
    sql = "SELECT DISTINCT S1.TrainNumber AS TrainNumber, CONCAT(S1.DepartureTime) AS Departure, CONCAT(S2.ArrivalTime) AS Arrival, CONCAT(TIMEDIFF(Time(S2.ArrivalTime), Time(S1.DepartureTime))) AS Duration, CONCAT(S3.1stClassPrice) AS firstClassPrice, CONCAT(S3.2ndClassPrice) AS secondClassPrice FROM  `Stop` S1, `Stop` S2, Stop NATURAL JOIN TrainRoute S3 WHERE S1.TrainNumber = S2.TrainNumber AND S2.TrainNumber= S3.TrainNumber AND S1.TrainNumber= S3.TrainNumber AND S1.NAME = %s AND S2.NAME =  %s AND S2.ArrivalTime IS NOT NULL AND S1.DepartureTime IS NOT NULL" 

    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql, (dep, arr))
    res = cursor.fetchall()
    
    if len(res) == 0:
        return jsonify(msg="There's no itinerary matching your search.")
    else:
        #store temporary data for reservation table
        temp_resv[c]["DepartsFrom"] = dep
        temp_resv[c]["ArrivesAt"] = arr
        temp_resv[c]["DepartureDate"] = date
        tempDep = []
        for item in res:
            option = {}
            option['TrainNumber'] = item['TrainNumber']
            option['Duration'] = item['Departure']+' - '+ item['Arrival']+'\n'+ item['Duration']
            option['firstClassPrice']  = item['firstClassPrice']
            option['secondClassPrice'] = item['secondClassPrice']
            tempDep.append(option)
            
        deps.setDeps(tempDep)
        return jsonify(success="true")

#store info about the selected departure    
def resv_select():
    global temp
    data = request.get_json()
    trainNo = data['trainNo']
    priceClass = data['priceClass']
    depTime = data['depTime']
    temp_resv[c]['TrainNumber'] = trainNo
    temp_resv[c]['Class'] = priceClass
    temp_resv[c]['DepartureDate'] = temp_resv[c]['DepartureDate']+" "+depTime
    return jsonify(success="true")

def resv_extras():
    data = request.get_json()
    passenger = data['passenger']
    baggage = data['baggage']
    
    trainNo = temp_resv[c]['TrainNumber']
    priceClass =  temp_resv[c]['Class']
    
    if priceClass == 'First':
        sql = "SELECT 1stClassPrice FROM TrainRoute WHERE TrainNumber = %s"
        
    if priceClass == 'Second':
        sql = "SELECT 2ndClassPrice FROM TrainRoute WHERE TrainNumber = %s"
    
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql, (trainNo))
    res = cursor.fetchall()
    
    if priceClass == 'First':
        ticketPrice = int(res[0]['1stClassPrice'])
    else:
        ticketPrice = int(res[0]['2ndClassPrice'])
    cost = ticketPrice + (30 * (baggage - 2) if baggage > 2 else 0)
    
    userN = user.getUserName()
    sql = "SELECT IsStudent FROM Customer WHERE Username = %s"
    cursor.execute(sql, userN)
    res = cursor.fetchall()
    if len(res) != 0 and res[0]["IsStudent"] == 1:
        cost = cost * 0.8
        temp_resv[c]['Student'] = 1   

    temp_resv[c]['PassengeName'] = passenger
    temp_resv[c]['NumberOfBaggage'] = baggage
    temp_resv[c]['TotalCost'] = ticketPrice
    temp_resv[c]['CombinedCost'] = cost
    return jsonify(success="true")    

#finalize reservation
def reserve():
    data = request.get_json()
    cardNo = data['cardNo']
    userN = user.getUserName()
    isCancelled = 0
    isUpdated = 0
    
    #generate a random reservation ID
    resvID = str(idGenerator())
    global temp_id
    temp_id = []
    temp_id.append(resvID)
    
    #get current time
    time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    #get the stored departure info
    global temp_resv
    trainNo = temp_resv[c]['TrainNumber']
    
    #parse the date to be sql-friendly
    date = temp_resv[c]['DepartureDate']
    parseDate = datetime.strptime(date, '%a, %d %b %Y %X')
    date_formatted = parseDate.strftime('%Y-%m-%d %H:%M:%S')
    
    passenger = temp_resv[c]['PassengeName']
    baggage = temp_resv[c]['NumberOfBaggage']
    dep = temp_resv[c]['DepartsFrom']
    arr = temp_resv[c]['ArrivesAt']
    cost = temp_resv[c]['TotalCost']
    
    if (temp_resv[c]['Class'] == 'First'):
        priceClass = 1
    else:
        priceClass = 2
    
    sql = "INSERT INTO Reservation Values (%s, %s, %s, %s, 0, 0)"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql,(resvID, time, cardNo, userN))
    
    sql = "INSERT INTO Reserves Values(%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(sql,(trainNo, resvID, priceClass, date_formatted, passenger, baggage, dep, arr, cost))
    
    #clear the stored info
    temp_resv = [{}]
                   
    return jsonify(msg="success")

#remove a journey from selection 
def remove_resv():
    global c
    data = request.get_json()
    trainNo = data['trainNo']
    dep = data['dep']
    for resv in temp_resv:
        if resv['TrainNumber'] == trainNo and resv['DepartureDate'] == dep:
            temp_resv.remove(resv)
            c = len(temp_resv) - 1
    return jsonify(msg="success")

#add more journeys
def add_more():
    global c
    if (c == 2):
        return jsonify(err="At most three trains a reservation.")
    temp_resv.append({})
    c += 1
    return jsonify(msg="success")

#add and remove payment info

def add_card():
    data = request.get_json()
    nameOnCard = data['nameOnCard']
    cardNo = data['cardNo']
    CVV = data['CVV']
    expDate = data['expDate']
    userN = user.getUserName()
    
    sql = "SELECT CardNumber FROM PaymentInfo WHERE CardNumber = %s and Username = %s"
    cursor = db.cursor()
    cursor.execute(sql, (cardNo, userN))
    res = cursor.fetchall()
                   
    if len(res) != 0:
        return jsonify(msg="Card is already on file.")
    else: 
        sql = "INSERT INTO PaymentInfo (CardNumber, CVV, ExpDate, NameOnCard, Username) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (cardNo, CVV, expDate, nameOnCard, userN))
                   
        sql = "SELECT CardNumber FROM PaymentInfo WHERE CardNumber = %s and Username = %s"
        cursor.execute(sql, (cardNo, userN))
        res = cursor.fetchall()
        if len(res) == 0:
            return jsonify(msg="Error occurs. Please try again.")
        else:
            return jsonify(msg="Card added successfully!")
                   
def delete_card():
    data = request.get_json()
    card = data['card']
    userN = user.getUserName()
    sql = "DELETE FROM PaymentInfo WHERE CardNumber = %s AND Username = %s"
    cursor = db.cursor()
    cursor.execute(sql, (card, userN))
    return jsonify(msg="success")
    
#update reservation

def get_resvs(resvID):
    sql = "SELECT * FROM Reserves WHERE ReservationID = %s"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql, (resvID))
    res = cursor.fetchall()
    
    if len(res) == 0:
        return jsonify(msg="The requested reservation doesn't exist.")
    else:
        for resv in res:
            resv['TotalCost'] = str(resv['TotalCost'])
        return Response(json.dumps(res), mimetype='application/json')

#input the reservation to be updated
def update():
    data = request.get_json()
    resvID = data['resvID']
    sql = "SELECT * FROM Reservation WHERE ReservationID = %s AND IsCancelled = 0"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql,(resvID))
    res = cursor.fetchall()
    
    if len(res) == 0:
        return  jsonify(msg="The reservation does not exist or has been cancelled.")
    
    updateInfo[0]['resvID'] = resvID
    return jsonify(success="true")

#select one departure
def update_select():
    data = request.get_json()
    trainNo = data['trainNo']
    resvID = updateInfo[0]['resvID']
    sql = "SELECT HOUR(TIMEDIFF(DepartureDate, timeUpdate)) AS updateDiff FROM (Reservation NATURAL JOIN Reserves) WHERE ReservationID = %s AND TrainNumber = %s"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql,(resvID, trainNo))
    res = cursor.fetchall()
    #no update permitted within 24 hrs
    if int(res[0]['updateDiff']) < 24:
        return  jsonify(msg="Sorry, updates are not permitted within one day of the departure.")
    
    updateInfo[0]['trainNo'] = trainNo
    return jsonify(success="true")

#get the departure to be updated
def get_update_selected():
    resvID = updateInfo[0]['resvID']
    trainNo = updateInfo[0]['trainNo']
    sql = "SELECT * FROM Reserves WHERE ReservationID = %s AND TrainNumber = %s"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql,(resvID, trainNo))
    res = cursor.fetchall()
    
    for resv in res:
        resv['TotalCost'] = float(resv['TotalCost'])
    return Response(json.dumps(res), mimetype='application/json')   

#finalize update
def update_submit():
    data = request.get_json()
    newDate = data['newDate']
    resvID = updateInfo[0]['resvID']
    trainNo = updateInfo[0]['trainNo']
    sql = "Select TotalCost from Reserves WHERE ReservationID = %s"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql, (resvID))
    res = cursor.fetchall()
    updatedCost = float(res[0]['TotalCost']) + 50
    
    sql = "UPDATE Reserves SET DepartureDate = %s, TotalCost = %s WHERE ReservationID = %s AND TrainNumber = %s"
    cursor.execute(sql, (newDate, updatedCost, resvID, trainNo))
    
    sql = "UPDATE Reservation SET IsUpdated = 1 WHERE ReservationID = %s"
    cursor.execute(sql, (resvID))   
    
    sql = "SELECT * FROM Reserves WHERE DepartureDate = %s AND ReservationID = %s"
    cursor.execute(sql, (newDate,resvID))
    res = cursor.fetchall()
    if len(res) != 0:
         return  jsonify(msg="New departure date has been updated")
    else:
        return jsonify(msg="Sorry, error occurs. Please try again.")

#cancel reservation

def cancel():
    data = request.get_json()
    resvID = data['resvID']
    sql = "SELECT * FROM Reservation WHERE ReservationID = %s AND IsCancelled = 0"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql, (resvID))
    res = cursor.fetchall()
    
    if len(res) == 0:
        return jsonify(msg='The reservation is already cancelled or does not exist!')
    else:
        sql = "UPDATE Reservation SET IsCancelled = 1 WHERE ReservationID = %s"
        cursor.execute(sql, (resvID))
        sql= "SELECT MIN(HOUR(TIMEDIFF(DepartureDate, timeUpdate))) AS earlierDeparture FROM (Reservation NATURAL JOIN Reserves) WHERE ReservationID=%s"
        cursor.execute(sql,(resvID))
        res = cursor.fetchall()
        
        sql = "UPDATE Reservation SET IsCancelled = 0 WHERE ReservationID = %s"
        cursor.execute(sql, (resvID))
        #d is days to departure
        d=res[0]["earlierDeparture"]
        cost = 0
        refund=0
        
        #calculate refund according to the rules
        sql = "Select TotalCost from Reserves WHERE ReservationID = %s"
        cursor.execute(sql, (resvID))
        res = cursor.fetchall()
        for i in res:
            cost += float(i['TotalCost'])
        if d > 168: 
            refund = 0.8 * cost - 50.00
        elif d > 24:
            refund = 0.5 * cost - 50.00
        else:
            refund = 0
            return jsonify(msg="No cancellation can be made at this time! ")

        cancelInfo.append({"resvID": resvID,"cost": cost ,"refund": refund, "date": time.strftime("%d/%m/%y")})
        return jsonify(success="true")

#finalize cancel
def cancel_submit():
    data = request.get_json()
    resvID = data['resvID']
    sql = "UPDATE Reservation SET IsCancelled = 1 WHERE ReservationID = %s"
    cursor = db.cursor()
    cursor.execute(sql, (resvID))
    return jsonify(msg="Cancellation successful!")

#to generate random review and reservation IDs
def idGenerator():
    id = int(random.random()*100000000)
    return id

#manager view
def get_revenue():
    sql = "SELECT depart_month1,SUM(total_spend) FROM revenueReport GROUP BY depart_month1"       
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql)
    res = cursor.fetchall()
    for i in res:
        i['SUM(total_spend)'] = float(i['SUM(total_spend)'])
    return Response(json.dumps(res), mimetype='application/json')

def get_popular_routes():
    sql = "(select * from ViewRevenue where depart_month1 = 'Apr' order by C_T DESC LIMIT 3) UNION ALL (select * from ViewRevenue where depart_month1 = 'May' order by C_T DESC LIMIT 3)"
    cursor = db.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql)
    res = cursor.fetchall()
    return Response(json.dumps(res), mimetype='application/json')