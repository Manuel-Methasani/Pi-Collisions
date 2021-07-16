[*Italian*]()

# Galperin Collisions

This is a repository for a web-page that I designed as part of my final high-school exam.

Using the [p5.js](https://p5js.org/) library and basing myself on Gregor Galperin's work, [*Playing pool with π*](https://www.maths.tcd.ie/~lebed/Galperin.%20Playing%20pool%20with%20pi.pdf), I coded an interactive web-page that shows the system considered by Galperin itself.

## Galperin's system

In his work Galperin considers a frictionless system where two blocks of arbitrary mass, one initially still and the other in motion, and a wall of "infinite" mass (so that both energy and momentum are conserved) collide with each other in a completely elastic way. We note that, with bigger masses of the block initially in motion, the number of collisions that would happen in the system will progressively approximate the digits of π.
We can then prove geometrically this approximation.

## Content of the web-page

In this web-page I coded an interactive animation of what would happen in Galperin's system.
The page shows a window with two blocks, a *slider* and two buttons: **Inizia!** (*Start!*) and **Attiva grafico** (*Toggle graph*).

+ by moving the slider we can see the text beneath, counting the collisions, change getting each time more zeros to it, at the same time in the window one of the two blocks (whose masses are always reported) will get bigger and with more mass;
+ by clicking the **Inizia!** button the simulation of the system will start;
+ by clicking the **Attiva grafico** button another window will show up where as the collisions happen will get drawn a *phase diagram* at the same moment; by pressing the button again which now reads **Disattiva grafico** (*Toggle off graph*) it will have the opposite effect as before, removing the graph.

### Troubleshooting

Especially when the block has a very big mass, with the slider set to the higher settings (max. **8**), the simulation of the collisions can become considerably slower because the program has now to count a very big number of collisions.
**It is recommended** to toggle off the graph beneath if you want to keep the slider to the higher values since the graph will in this case slow down the simulation even more.

If the graph is toggled off when a lot of collisions are happening, the page may just stop working. This happens because of the way the code itself is written. When the graph is toggled off, the audio of the page is also turned off and it needs a small amount of time to turn on again. If the program wants to play a sound before the turning on of the audio itself, then an error occurs and the page stops working.
**It is recommended* to toggle off the graph when there is enough time between collisions.

### Resources used for this project

To build this project I mainly used two resources found online:

1. a YouTube video from the channel *3Blue1Brown* which shows the geometric explanation of Galperin's system, [link to the video](https://www.youtube.com/watch?v=jsYwFizhncE);
2. a tutorial found online that helped me to code part of the web-page, [link to the tutorial](https://thecodingtrain.com/CodingChallenges/139-pi-collisions.html)).
