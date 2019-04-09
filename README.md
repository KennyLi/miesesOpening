# miesesOpening
Kenny Li(PM), Mohammed Uddin, Jason Tung, Raymond Wu

P #04: Viz not to be confused with vis or vis-a-vis

## Description Of Data Sets
[Pokemon Base Stats](https://github.com/fanzeyi/pokemon.json/blob/master/pokedex.json)
provides name of pokemon, pokedex number, type, and base stats

[Pokemon Go](https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json)
provides name of pokemon, pokedex number, height, weight, weaknesses, evolutions

[PokeAPI](https://pokeapi.co/)
Used to fetch pokemon pictures, weights, height

We plan to analyze the base stats and type of all pokemon released as of right now to see how the game is balanced. In addition, we can make predictions about the new pokemon games (Pokemon Sword & Pokemon Shield) being released this year based on patterns and trends from the previous generations.

## How To Make This Data Come Alive
We will also use the pokemon’s type and the generation that they were from to create a radar chart. The user will choose from a category of types and see the average stat distribution of all pokemon that fall into that type with a radar chart. This can be used to look for patterns in the past generations of pokemon and maybe make predictions for future pokemon games. A question that may arise is “How does Game Phreak actually decide the stat distribution of types?” A question that is answered is "What types of pokemon fit better for roles in competitive battling such as a tank or physical/special sweeper?"

We will use range sliders to enable the user to search for pokemon that fall within the given range of stat values. The user can alter the six base stats of pokemon on separate sliders and a visualization of the radar chart will match the range. A list of pokemon that fall within the range will be displayed in a table alongside its sprite and base stats. The pokemon's name will be color coded based on its primary type. This expands on the previous question by showing the types given by the distribution.

## Explanation Of D3 Feature Utilization
For the first radar chart we will split the window into two parts: graph and user interface. The user interface will a dropdown menu to select types that will dynamically update the radar chart. The user can also hover over a data point in the radar chart to display its actual value.

For the second radar chart we will split the window into three parts: graph, user interface, and table. The user interface will be six sliders that each control a different base stat. The radar chart will display two graphs to show the max range and min range of pokemon for each stat. The table will dynamically update with its results everytime the user changes a value in the slider.

### Gallery
* [Radar Chart](https://www.visualcinnamon.com/2013/09/making-d3-radar-chart-look-bit-better.html)

## Sketch-Up Of Envisioned Visualization
![Radar Chart](https://imgur.com/1KkQvSZ.png)


## LAUNCH CODES
### Requirements
Our dependencies, as listed in requirements.txt, are as follows:

| Dependency | Version | Origin | Description | 
| --- | --- | --- | --- |
| Click | 7.0 | Flask | unused |
| Flask | 1.0.2 | Flask | microframework of choice |
| itsdangerous | 1.1.0 | Flask | unused |
| Jinja2 | 2.10 | Flask | templating language |
| MarkupSafe | 1.1.1 | Flask | unused |
| Werkzeug | 0.15.1 | Flask | unused |
| pymongo | 3.7.2 | mongo | db lang |

Install our dependencies with the follow command in the root directory of our repo:
```pip3 install -r requirements.txt```
### Instructions
1. Clone the repo via ssh or https
   - SSH: ```git clone git@github.com:lli15/miesesOpening.git```
   - HTTPS: ```git clone https://github.com/lli15/miesesOpening.git```
2. **(Optional)** Make and activate virtual environment
```
python3 -m venv <venv_name>
. <path-to-venv>/bin/activate
```
3. Enter the repo directory
```
cd <path-to-repo>
```
4. Install requirements
   - Python 3.7: ```pip3 install -r requirements.txt```
   - If in virtual environment with Python 3.7: ```pip install -r requirements.txt```
5. Run app.py
   - Python 3.7: ```python3 app.py```
   - If in virtual environment with Python 3.7: ```python app.py```
6. Go to http://127.0.0.1:5000/ on any browser
