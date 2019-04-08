from flask import Flask, render_template, request, flash, redirect, url_for
import json
import pymongo

from os import urandom

import util.util_stuff.find as finder

app = Flask(__name__)
app.secret_key = urandom(32)

from bson import ObjectId
from bson.json_util import *


ip = "jayy.mooo.com"
connection = pymongo.MongoClient(ip)
connection.server_info()
db = connection.test
db_pointer = db

@app.route("/slider")
def asdas():
    return render_template("slider.html")

@app.route("/")
def hello_world():
    return render_template("radar.html")

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
