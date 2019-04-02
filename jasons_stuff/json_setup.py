# azrael -- Jason Tung and Mohammed Uddin
#
# SoftDev2 pd7
#
# K #07: Import/Export Bank
#
# 2019-03-01
import json

import pymongo

import urllib.request

def load_bypass(thing):
    req = urllib.request.Request(thing,headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urllib.request.urlopen(req).read()
    return json.loads(webpage)

def parsefile():
    '''
    with open('pokedex.json') as f:
        data = json.load(f)
    pk_col = data["pokemon
    '''
    with open('pokedex_extra.json') as f:
        data = json.load(f)
    load_str = "https://pokeapi.co/api/v2/pokemon/"
    #test = 0
    for pkmon in data:
        recieved_info = load_bypass(load_str+str(pkmon["id"]))
        #print("FDSFSDFDSFJKSDHFJKSDHFJKSKF\n\n\n\n")
        #print(recieved_info)
        #test+=1
        height = recieved_info["height"]
        weight = recieved_info["weight"]
        pkmon["height"] = height
        pkmon["weight"] = weight
    
        
parsefile()


def setup(db):
    # server_addr = ip
    # connection = pymongo.MongoClient(server_addr)
    # db = connection.test
    connection = db.pokedex_unparsed
    parsefile()
    '''
    id = 1
    pkmon_list = data["pokemon"]
    print(pkmon_list)
    with open("pokedex_parsed.json", "w") as f:
        f.write("[")
        for pkmon in pkmon_list:
            f.write(json.dumps(pkmon))
            if id < 151:
                f.write(",\n")
            id+=1
        f.write("]")
    '''
    collection = db.azrael
    collection.drop()
    f=open("pokedex_parsed.json","r")
    json_data = f.read()
    f.close()
    data = json.loads(json_data)

    collection.insert_many(data)

# setup("jayy.mooo.com")
