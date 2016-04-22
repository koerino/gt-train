from flask import Flask, render_template, Response, json, jsonify
import api

app = Flask(__name__)

@app.route('/')
@app.route('/<path:path>')
def index(path=None):
    return render_template('index.html')

#authentication

@app.route('/api/login', methods=['POST'])
def login():
    return api.login()

@app.route('/api/register', methods=['POST'])
def register():
    return api.register()

#add school info

@app.route('/api/add-school', methods=['POST'])
def add_school():
    return api.add_school()

#view schedules

@app.route('/api/schedules/<trainNo>', methods=['GET'])
def get_sche(trainNo):
    return api.get_sche(trainNo)

@app.route('/api/get-sches', methods=['GET'])
def get_saved_sche():
    sches = api.sches.getSches()
    res = Response(json.dumps(sches), mimetype='application/json')
    return res

#view and submit reviews

@app.route('/api/reviews/<trainNo>', methods=['GET'])
def get_reviews(trainNo):
    return api.get_reviews(trainNo)

@app.route('/api/get-reviews', methods=['GET'])
def get_saved_reviews():
    reviews = api.reviews.getReviews()
    res = Response(json.dumps(reviews), mimetype='application/json')
    return res

@app.route('/api/ratings', methods=['GET'])
def get_ratings():
    return json.dumps([
            {"value": "Very Good", "label": "Very Good"}, {"value": "Good", "label": "Good"}, {"value": "Neutral", "label": "Neutral"}, {"value": "Bad", "label": "Bad"}, {"value": "Very Bad", "label": "Very Bad"}])

@app.route('/api/reviews/submit', methods=['POST'])
def submit_review():
    return api.submit_review()

#make reservation

@app.route('/api/stations', methods=['GET'])
def get_stations():
    return api.get_stations()

@app.route('/api/cards', methods=['GET'])
def get_cards():
    return api.get_cards()

@app.route('/api/departures/<dep>/<arr>/<date>', methods=['GET'])
def get_deps(dep, arr, date):
    return api.get_deps(dep, arr, date)

@app.route('/api/get-deps', methods=['GET'])
def get_saved_deps():
    deps = api.deps.getDeps()
    res = Response(json.dumps(deps), mimetype='application/json')
    return res

@app.route('/api/reserve/select', methods=['POST'])
def resv_select():
    return api.resv_select()

@app.route('/api/reserve/extras', methods=['POST'])
def resv_extras():
    return api.resv_extras()

@app.route('/api/reserve/info', methods=['GET'])
def get_temp_resv():
    return Response(json.dumps(api.temp_resv), mimetype='application/json')

@app.route('/api/reserve', methods=['POST'])
def reserve():
    return api.reserve()

@app.route('/api/reserve/remove', methods=['POST'])
def remove_resv():
    return api.remove_resv()

@app.route('/api/reserve/add', methods=['POST'])
def add_more():
    return api.add_more()

#payment information
@app.route('/api/cards/add', methods=['POST'])
def add_card():
    return api.add_card()

@app.route('/api/cards/delete', methods=['POST'])
def delete_card():
    return api.delete_card()

@app.route('/api/resvID', methods=['GET'])
def get_id():
    return jsonify(resvID=api.temp_id[0])

#update reservation

@app.route('/api/update', methods=['POST'])
def update():
    return api.update()

@app.route('/api/update/info', methods=['GET'])
def get_update_info():
    return jsonify(resvID=api.updateInfo[0]['resvID'])

@app.route('/api/resvs/<resvID>', methods=['GET'])
def get_resvs(resvID):
    return api.get_resvs(resvID)

@app.route('/api/update/select', methods=['POST'])
def update_select():
    return api.update_select()

@app.route('/api/update/selected', methods=['GET'])
def get_update_selected():
    return api.get_update_selected()

@app.route('/api/update/submit', methods=['POST'])
def update_submit():
    return api.update_submit()

#cancel reservation

@app.route('/api/cancel', methods=['POST'])
def cancel():
    return api.cancel()

@app.route('/api/cancel/info', methods=['GET'])
def get_cancel_info():
    info = json.dumps(api.cancelInfo)
    res = Response((info), mimetype='application/json')
    api.cancelInfo = []
    return res

@app.route('/api/cancel/submit', methods=['POST'])
def cancel_submit():
    return api.cancel_submit()

#manager view

@app.route('/api/revenue', methods=['GET'])
def get_revenue():
    return api.get_revenue()

@app.route('/api/popular-routes', methods=['GET'])
def get_popular_routes():
    return api.get_popular_routes()