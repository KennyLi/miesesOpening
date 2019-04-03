from flask import Flask, jsonify, render_template #stdlib
import json
import pymongo


from os import urandom

import util.util_stuff.find as finder

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


@app.route('/test')
def test():
    ip = "jayy.mooo.com"
    connection = pymongo.MongoClient(ip)
    connection.server_info()
    db = connection.test
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
    return render_template('index.html', list_all_pokemon = dumps(all_pokemon))

if __name__ == '__main__':
    app.debug = True #set to False in production mode
    app.run()
