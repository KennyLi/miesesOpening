# miesesOpening
Kenny Li(PM), Mohammed Uddin, Jason Tung, Raymond Wu

P #04: Viz not to be confused with vis or vis-a-vis

## Description Of Data Sets
[Pokemon Base Stats](https://github.com/fanzeyi/pokemon.json/blob/master/pokedex.json)
provides name of pokemon, pokedex number, type, and base stats

[Pokemon Go](https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json)
provides name of pokemon, pokedex number, height, weight, weaknesses, evolutions

We plan to analyze the base stats, height, weight, and type of all pokemon released as of right now to see how the game is balanced. In 
addition, we can make predictions about the new pokemon games being released this year based on patterns and trends from the previous 
generations.

## How To Make This Data Come Alive
We will have users pick between the hp, attack, defense, special attack, special defense, speed, height and weight as variables to compare
to one another in a scatter plot. To filter out the data set, we will allow the users to pick a specific type of pokemon and/or the
generation that they are from. The user can also interact with the individual data points and see the pokemon that corresponds to that
point. Using scatter plots can help answer “Is there a correlation between two specific stats when it comes to creating a pokemon and how
is it balanced around the battling?”

We will also use the pokemon’s type and the generation that they were from to create a radar chart and pie chart. Once again, the user
will choose from a category of types and see the stat distribution of all pokemon that fall into that type with a radar chart. The pie
chart will be used to analyze each generation and the distribution of types that were released in that generation. These two charts can be
used to look for patterns in the past generations of pokemon and maybe make predictions for future pokemon games. A question that may
arise is “How does Game Phreak actually decide the distribution of types?”

## Explanation Of D3 Feature Utilization
We will split the window into two parts: graph and user interface. The user interface will have the various variables listed out in a
table for the user to interact with. Depending on what type of chart they pick, they will be able to choose from different variables that
are required for the graphs to work. If the user decides to switch what he wants to display, he can interact with the user interface.
Through the use of transitions, we can make the data change smoothly. For example, the radar chart will have hp, attack, defense, special
attack, special defense, and speed as its variables. The type will be used to filter the data out so whenever the user decides to switch
type, the variables will smoothly transition to their new point on the graph.

### Gallery
* [Scatter Plot Matrix](https://observablehq.com/@d3/scatterplot-matrix)
* [Radar Chart](https://www.visualcinnamon.com/2013/09/making-d3-radar-chart-look-bit-better.html)
* [Pie Chart](https://observablehq.com/@d3/pie-chart)

## Sketch-Up Of Envisioned Visualization
![Scatter Plot Matrix](https://i.imgur.com/1RdvWRI.png)
![Radar Chart](https://imgur.com/1KkQvSZ.png)
![Pie Chart](https://imgur.com/VhNjhgY.png)

## LAUNCH CODES
Our dependencies, as listed in requirements.txt, are as follows:

| Dependency | Version | Origin | Description | 
| --- | --- | --- | --- |
| Click | 7.0 | Flask | unused |
| Flask | 1.0.2 | Flask | microframework of choice |
| itsdangerous | 1.1.0 | Flask | unused |
| Jinja2 | 2.10 | Flask | templating language |
| MarkupSafe | 1.1.1 | Flask | unused |
| Werkzeug | 0.15.1 | Flask | unused |
