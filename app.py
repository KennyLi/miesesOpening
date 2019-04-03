from flask import Flask, jsonify, render_template #stdlib
import pymongo

from os import urandom

import util.util_stuff.find as finder

app = Flask(__name__)
app.secret_key = urandom(32)

@app.route('/test')
def test():
    ip = "jayy.mooo.com"
    connection = pymongo.MongoClient(ip)
    connection.server_info()
    db = connection.test
    all_pokemon = finder.find_pokemans(db)
    results = []
    for doc in all_pokemon:
        results.append( jsonify(doc) )
    print(results)
    return render_template('index.html', list_all_pokemon = results)

if __name__ == '__main__':
    app.debug = True #set to False in production mode
    app.run()
