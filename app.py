from flask import Flask, jsonify, render_template  # stdlib
from flask import Flask, render_template, request, flash, redirect, url_for
import json
import pymongo

from os import urandom

import util.util_stuff.find as finder
import util.util_stuff.json_setup as setup

app = Flask(__name__)
app.secret_key = urandom(32)

import json
from bson import ObjectId
from bson.json_util import *


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


ip = "jayy.mooo.com"
connection = pymongo.MongoClient(ip)
connection.server_info()
db = connection.test
db_pointer = db

@app.route("/slider-test")
def asdas():
    return render_template("slider.html")

@app.route("/rymd-test")
def ahhhh():
    return render_template("test_json.html")

@app.route("/")
def hello_world():
    if db_pointer is not None:
        return render_template("land.html", pointed=True)
    return render_template("land.html")

@app.route("/muh_api/", methods=["GET"])
def muh_api():
    pk_type = request.args['type']
    return dumps({"hello":[k for k in finder.find_pokemans(db_pointer, type=pk_type)]})

@app.route("/api_stats/", methods=["GET"])
def api_stats():
    #stats = ['HP', 'Attack', 'Defense', 'Sp Attack', 'Sp Defense', 'Speed']
    stats_json = json.loads(request.args['stats_json'])
    print("LLLLLLLLL")
    print(stats_json)
    return dumps({"hello":[k for k in finder.find_pokemans_between(db_pointer, stats_json)]})

@app.route("/chilling")
def chilling():
    return render_template("chilling.html")


@app.route("/api_test_2")
def api_test_2():
    return render_template("api_test_2.html")

# THIS IS YOUR STUFF!

@app.route('/test')
def test():
    cursor = finder.find_pokemans(db)
    # for k in cursor:
    #     print(k)
    #     print(type(k))
    all_pokemon = [k for k in cursor]
    # print(all_pokemon)
    # results = []
    # for doc in all_pokemon:
    #     results.append( str(doc) )
    # print(results)
    return render_template('index.html', list_all_pokemon=dumps(all_pokemon))


@app.route('/radar_demo')
def radar_demo():
    return render_template('radar.html')









#pretty useless

@app.route("/auth", methods=['POST'])
def auth():
    try:
        maxSevSelDelay = 2
        connection = pymongo.MongoClient(request.form['droplet'],
                                     serverSelectionTimeoutMS=maxSevSelDelay)
        connection.server_info()
        db = connection.test
        global db_pointer
        db_pointer = db
        print(db_pointer)
        print("DFSFDSFDSF")
        setup.setup(db)
        flash("droplet tested and set up")
        return redirect(url_for("search", category="success", flash=True), code=307)
    except Exception as e:
        print(e)
        db_pointer = None
        flash("droplet tested and not working")
        #print("DSFJDSKFJLKDFJKLSDJFKLSJDKLFDSKLFJKDSLFJDLKSFJKLDSFJLKSJFLK")
        return render_template("land.html", category="error", flash=True)

@app.route("/search", methods=['POST', "GET"])
def search():
    # print(db_pointer)
    return render_template("search_form.html", category=request.args.get('category'), flash=request.args.get('flash'))


@app.route("/doit", methods=['POST', "GET"])
def doit():
    # POSSIBLE ARGS: num, name, type, height, height_updown, weight, weight_updown, weaknesses, evolutions
    args = {"id": None, "name": None, "type": None,
            "HP": None, "Attack": None, "Defense": None, "Sp Attack": None, "Sp Defense": None, "Speed": None,
            "abilities": None,} #"sprite": None,"height": None,"weight": None}
    for k in args:
        hey = request.form[k]
        if hey.strip() != '':
            args[k] = hey

    # print(db_pointer)
    results = finder.find_pokemans_dict(db_pointer, args)
    pk_list = [k for k in results]
    print("-----")
    print(pk_list)
    print("-----")
    return render_template("display.html", pklist=dumps(pk_list))

@app.route("/find_avg", methods=['POST', "GET"])
def testy():
    max_stat = 0
    types = ['Normal','Fighting','Flying','Poison','Ground','Rock','Bug','Ghost','Steel','Fire','Water','Grass','Electric','Psychic','Ice','Dragon','Dark','Fairy']
    stats = ['HP', 'Attack', 'Defense', 'Sp Attack', 'Sp Defense', 'Speed']
    for x in types:
        pk_list = [k for k in finder.find_pokemans(db_pointer, type=x)]
        for stat in stats:
            avg_stat = sum([k[stat] for k in pk_list])/len(pk_list)
            max_stat = max(avg_stat,max_stat)
    return str(max_stat)

if __name__ == '__main__':
    app.debug = True  # set to False in production mode
    app.run()
