import json

import os

import pymongo

import urllib.request

def load_bypass(thing):
    req = urllib.request.Request(thing,headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urllib.request.urlopen(req).read()
    return json.loads(webpage)

def parsefile():
    with open('data_stuff/pokedex_extra.json') as f:
        data = json.load(f)
    load_str = "https://pokeapi.co/api/v2/pokemon/"
    #test = 0
    stats = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"]
    # for x in range(10):
    #     pkmon = data[x]
    for pkmon in data[:-2]:
        received_info = load_bypass(load_str+str(pkmon["id"]))
        #print("FDSFSDFDSFJKSDHFJKSDHFJKSKF\n\n\n\n")
        #print(received_info)
        #test+=1
        #print(received_info["abilities"])
        for stat in stats:
            pkmon[stat.replace(".","")] = pkmon["base"][stat]
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
        print(str(pkmon["id"]) + "/807")
    pk_str = "[\n"
    for pkmon in data[:-2]:
        pk_str += json.dumps(pkmon)
        pk_str += ",\n"
    pk_str = pk_str[:-2] + "\n]"
    with open("data_stuff/pokedex_parsed.json", "w+") as f:
        f.truncate()
        f.write(pk_str)
    
        
#parsefile()

#
def setup(ip):
    server_addr = ip
    print("hello!")
    connection = pymongo.MongoClient(server_addr)
    connection.server_info()
#print(connection.server_info())
    print("hello 2")
    db = connection.test
#    db.server_info()
    print("hello 3")
    #connection = db.pokedex_unparsed
    #this only needs be run once!
    if not os.path.isfile("data_stuff/pokedex_parsed.json"):
        parsefile()
    else:
        collection = db["miesesgang"]
        #collection.drop()
        f=open("data_stuff/pokedex_parsed.json","r")
        json_data = f.read()
        f.close()
        data = json.loads(json_data)
        collection.insert_many(data)

setup("jasontung.me")
