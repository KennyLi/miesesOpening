import json

import os

import pymongo

import urllib.request

def load_bypass(thing):
    req = urllib.request.Request(thing,headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urllib.request.urlopen(req).read()
    return json.loads(webpage)

def parsefile():
    with open('pokedex.json') as f:
        pkgo_data = json.load(f)
    pkgo_data = pkgo_data["pokemon"]
    with open('pokedex_extra.json') as f:
        data = json.load(f)
    load_str = "https://pokeapi.co/api/v2/pokemon/"
    #test = 0
    stats = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"]
    for x in range(10):
        pkmon = data[x]
    # for pkmon in data[:-2]:
        received_info = load_bypass(load_str+str(pkmon["id"]))
        #print("FDSFSDFDSFJKSDHFJKSDHFJKSKF\n\n\n\n")
        #print(received_info)
        #test+=1
        #print(received_info["abilities"])
        for stat in stats:
            pkmon[stat] = pkmon["base"][stat]
        del pkmon["base"]
        pkmon["name"] = pkmon["name"]["english"]
        abilities = [k["ability"]["name"] for k in received_info["abilities"]]
        pkmon["abilities"] = abilities
        sprite = received_info["sprites"]["front_default"]
        pkmon["sprite"] = sprite
        height = "%.1f" % (received_info["height"] * .1)
        weight = "%.1f" % (received_info["weight"] * .1)
        pkmon["height"] = height
        pkmon["weight"] = weight
        print(pkmon["id"])
    pk_str = "[\n"
    for pkmon in data[:-2]:
        pk_str += json.dumps(pkmon)
        pk_str += ",\n"
    pk_str = pk_str[:-2] + "\n]"
    with open("pokedex_parsed.json", "r+") as f:
        f.truncate()
        f.write(pk_str)
    
        
parsefile()


def setup(db):
    # server_addr = ip
    # connection = pymongo.MongoClient(server_addr)
    # db = connection.test
    # connection = db.pokedex_unparsed
    #this only needs be run once!
    if not os.path.isfile("pokedex_parsed.json"):
        parsefile()
    else:
        collection = db.miesesgang
        collection.drop()
        f=open("pokedex_parsed.json","r")
        json_data = f.read()
        f.close()
        data = json.loads(json_data)
        collection.insert_many(data)

#setup("jayy.mooo.com")
