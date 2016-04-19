from flask import Flask, render_template, Response, json
import api

app = Flask(__name__)

@app.route('/')
@app.route('/<path:path>')
def index(path=None):
    return render_template('index.html')

@app.route('/api/login', methods=['POST'])
def login():
    return api.login()

@app.route('/api/register', methods=['POST'])
def register():
    return api.register()

@app.route('/api/add-school', methods=['POST'])
def add_school():
    return api.add_school()

@app.route('/api/schedules/<trainNo>', methods=['GET'])
def get_sche(trainNo):
    return api.get_sche(trainNo)

@app.route('/api/reviews/<trainNo>', methods=['GET'])
def get_reviews(trainNo):
    return api.get_reviews(trainNo)

@app.route('/api/get-reviews', methods=['GET'])
def get_saved_reviews():
    reviews = api.reviews.getReviews()
    res = Response(json.dumps(reviews), mimetype='application/json')
    return res

#@app.route('/api/stations', methods=['GET'])
#def get_station():
#    return api.get_station()