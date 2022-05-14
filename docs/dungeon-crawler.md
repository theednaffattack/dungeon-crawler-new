# React-Redux Dungeon Crawler

from: https://medium.com/@victorcatalintorac/react-redux-dungeon-crawler-7b52e67806bd#.1mpjrxn7y

![img](https://miro.medium.com/max/1278/1*BJs5mzY6sjqYMg46vJh9pw.jpeg)

If you are here, probably you are like me, an Camper at

[Free Code Camp](https://medium.com/u/8b318225c16a?source=post_page-----7b52e67806bd-----------------------------------)

that has arrived at the last project of the React curriculum and you just don’t know where to start from, well, you are in the right place.

Thanks to [Peter Daily](https://github.com/thepeted) for providing the entire code, i am just dissecting it and creating different versions, starting from the first with a basic code, and finishing with the last that has the complete project.

Zed Shaw, the author of “Learn Code the Hard Way” series, recently wrote an excellent blog post called Early v.s. Beginning Coders. In his post, Zed criticizes programming educators who claim that their materials are for “beginners”, but in reality are incomprehensible for most “total” beginners.

This is an tutorial written by an Redux “total” beginner for all the Redux “total” beginners :)

> I will guide trough the journey of making an app just like the one below, giving you all the tutorials needed and the finished github [code](https://github.com/Spartano/CodeCamp-Dungeon-Crawler) of all the versions that we will create together.

![img](https://miro.medium.com/max/1400/1*Ug0qRcOi2j3Cst8A1kZLww.jpeg)

http://codepen.io/thepeted/pen/aNrdzP

# Required Knowledge:

- Beginning developers who have completed basic React tutorials online.
- Beginning developers who know just enough Redux to create a ToDo List.

# If you are not one of this, here are some recommended tutorials:

<iframe src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2Fvideoseries%3Flist%3DPLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b&amp;url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DMhkGQAoc7bc&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FMhkGQAoc7bc%2Fhqdefault.jpg&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;type=text%2Fhtml&amp;schema=youtube" allowfullscreen="" frameborder="0" height="480" width="854" title="REACT JS TUTORIAL #1 - Reactjs Javascript Introduction &amp; Workspace Setup" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 388.938px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

Here you will learn basic React and basic Redux, and then if you want, you can deep into the rabbit hole more, with these intermediate [tutorials](https://egghead.io/courses/getting-started-with-redux):

![img](https://miro.medium.com/max/1400/1*HPYQYZ7G3KoJml_KCyGsag.png)

In the later versions we will use an IDE, but for now let’s start by warming up with an simple empty [pen](http://codepen.io/) using Babel and Sass, no directories, no actions, no Redux.

> [Here](http://codepen.io/Spartano/pen/dpoZdw) is and Pen with the complete code as an reference — split your screen and follow along the tutorial. Remember, if you want to really learn then you should avoid copy paste.

We begin creating the random rooms. Its basically an algorithm that generates a 2d array of objects made of a `type` property of either 0, ‘floor’ or ‘door’ and an opacity property.

If you want more info I have dedicated an [tutorial](https://medium.com/@victorcatalintorac/dungeon-with-rooms-algorithm-for-javascript-ultimate-begginer-guide-ec1489e90314#.av2b00c6h) alone just for this algorithm.

```
//////example/////
array=[
{type: ‘floor’, opacity: 0.51}
{type: ‘door’, opacity: 1}
{type: 0 , opacity: 1}
]
```

<iframe src="https://medium.com/media/85c858d403a954a1c27ca8469dfd4474" allowfullscreen="" frameborder="0" height="2808" width="692" title="game-map-creator.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 2808px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

Next we create an property for out store and make use of our function,

```
let firstStore = {
  dungeon: createDungeon()
}
```

then we pass this property into our component so we can generate the grid from it,

```
ReactDOM.render(
 <Dungeon store={firstStore.dungeon}/>,
 document.getElementById(“container”)
);
```

and finaly we create our component.

<iframe src="https://medium.com/media/96204ba0221cbc485a9808125dc92d3a" allowfullscreen="" frameborder="0" height="307" width="692" title="v01_prov.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 307px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

![img](https://miro.medium.com/max/412/1*PbrTmc3sCh3CmSpNAa0Pxw.jpeg)

Now let’s talk a bit about the CSS, and more specifacly about[ ](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)FlexBox.

<iframe src="https://medium.com/media/09a719ed6f88aec6e4c1d447fa5e0d54" allowfullscreen="" frameborder="0" height="571" width="692" title="css-v01.css" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 571px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

By default, flex items will all try to fit onto one line

> [FlexBox Layout](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) aims at providing a more efficient way to lay out, align and distribute space among items in a container, even when their size is unknown and/or dynamic (thus the word “flex”)

The last thing we must do is to create the cells and make use of the css above by assingning apropriate class names, and then pass the ‘cells’ into our component render() method.

<iframe src="https://medium.com/media/63ad790bb4b6deb12078b6df00bdf394" allowfullscreen="" frameborder="0" height="476" width="692" title="create_cells.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 476px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

There you have it, our simple Dungeon is finished now, in part 2 we will implement the entities(player, enemies, weapons )and the fog mode.

<iframe src="https://medium.com/media/a8732fd671ccd8d7daa215d5c10b8610" allowfullscreen="" frameborder="0" height="828" width="692" title="v01.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 828px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

![img](https://miro.medium.com/max/1400/1*5YX-y9ISW_DGXBJ0ACYjiA.png)

The logic behind this is simple, like in the first tutorial we will create an property for our store making use of our function, but before we do that we change the code a little. This time it will be the entities property that will store the grid with all the rooms and using that, we will place everithing inside of it.

```
let dungeon = createDungeon();
let firstStore = {
 entities: createEntities(dungeon)
};
```

then, we will use this property so we can create the map inside of our component.More about this and the fog later.

```
ReactDOM.render(
 <Dungeon
    entities={firstStore.entities}
/>,
 document.getElementById(“container”)
);
```

Let’s begin writing our function and defining our entities

```
const createEntities (gameMap, level = 1) => {
 //they are all arrays because we will use
// pop() with an (while array has length > 0) loop

 const bosses = [];
 const enemies = [];
 const exits = [];
 const potions = [];
 const weapons = [];
 const players = [];}
```

Before filling our arrays i want to focus on how we will make use of them in our function.So we need to create an method that will randomly place all the entities on to floor cells on the game map, and we do that using an forEach() method.

<iframe src="https://medium.com/media/da24343c11a34d794fe3f89820f11f10" allowfullscreen="" frameborder="0" height="1158" width="692" title="rr_v2_1.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 1157.98px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

Now that the logic is clear we can fill our arrays.

<iframe src="https://medium.com/media/96fee9a9110f645ba89ab880b48da07e" allowfullscreen="" frameborder="0" height="2192" width="692" title="rr_v2_2.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 2192px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

Now let’s pass to the React part, since we have an entities prop we make use of it so we can render the new map and we add some console logs for ease of understanding.

<iframe src="https://medium.com/media/77b7fb635d7f9d13feb759ba521cea84" allowfullscreen="" frameborder="0" height="1011" width="692" title="rr_v2_3.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 1011px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

Since now we have different types we update our CSS too.

<iframe src="https://medium.com/media/449c2c875974c291f5cdee82d6aa804b" allowfullscreen="" frameborder="0" height="1275" width="692" title="rr_v2_4.css" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 1275px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

The last thing we miss is enabling the fog mode.The aproach in this case will be very simple: we give our flex-container an grey background color, and using each Cell opacity and the newly created distanceFromPlayer property, we create the illusion of the fog.

<iframe src="https://medium.com/media/298dca91090b4f7c781612ef9a8695a5" allowfullscreen="" frameborder="0" height="395" width="692" title="rr_v2_5.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 395px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

Et voilà, our code now is [finished](http://codepen.io/Spartano/pen/LRGXrR?editors=0010),hope you enjoyed this tutorial, in the next one we will begin using Redux and make our player move around the dungeon.

![img](https://miro.medium.com/max/1400/1*0Pd9-bywkA05KChuqNujKw.png)

When setting up our app with Redux, we just have to decide where to start writing our code. All the tutorials i have seen until now start always with the initial state, then the reducers and lastly the actions, so it is the same thing that we will do.

Initial state and reducer:

<iframe src="https://medium.com/media/b30e9f32923d07a696e7aa021d7dd808" allowfullscreen="" frameborder="0" height="1312" width="692" title="rr_v3_1.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 1312px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

Actions :

<iframe src="https://medium.com/media/96ec4decabb0ceedd910128dc196695e" allowfullscreen="" frameborder="0" height="879" width="692" title="rr_v3_2.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 879px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

We now rewrite our code using Redux and we generate the map using the actions above.

<iframe src="https://medium.com/media/43be4ef533577dcfb246e6dfa5283ee4" allowfullscreen="" frameborder="0" height="1730" width="692" title="rr_v3_3.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 1730px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

Now we just need to dispatch actions based on the events triggered by the keyboard being pressed.

<iframe src="https://medium.com/media/33ce3fdd9fe1e8ec6b7c3b7b6a06fc71" allowfullscreen="" frameborder="0" height="417" width="692" title="rr_v3_7.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 417px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

As you can see each time we press an key the console log updates.Now it’s the moment to add some complexity to our app.Until now we have used just our Dungeon component, but now in order to implement the events we need to wrap it inside another component.

We transform our Dungeon in a [Presentational](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.f9bnf0e12) component( it takes care only of rendering) so it does not need to know anithing about logic and events, but in order to make it work we need to create an **Container** component, so it will be this component that will handle logic and data, and then passes that data down to our Dungeon.

<iframe src="https://medium.com/media/a7a310819fae0148749ac35ade0515dc" allowfullscreen="" frameborder="0" height="1950" width="692" title="rr_v3_4.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 1950px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

And now our Dungeon looks like this

<iframe src="https://medium.com/media/463cc056eeae76546eb89028857652ff" allowfullscreen="" frameborder="0" height="1165" width="692" title="rr_v3_5.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 1165px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

We have 2 problems now: our cells have lost ther’re opacity randomnes, and the app rerenders each time an action is dispatched, since we dont want that we create a way for passing multiple actions to the store.

<iframe src="https://medium.com/media/2c9983c0ea475882b2822df27f464d3c" allowfullscreen="" frameborder="0" height="263" width="692" title="rr_v3_6.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 263px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

> Because we are dispatching actions one after another, our App that is registered to the store, rerenderes as soon as the first action arrives and changes the store.

Introducing **Redux-batched-actions** and **Two sets of parentheses** after function call.

In order to understand how we can achieve all this, you first have to know how double parentheses works. Here is an simple example:

```
function boo( number ) {
 return number * 2;
}function add( anotherFunction ){
    return function test (y){
       return anotherFunction( y );
 };
}console.log(     add(boo)(5)    ); // 10
```

Noticed that the add function returns an function that it is called **tes**t and takes **one** argument, then uses that argument with the function in the first parentheses.Let’s use the same principle and update our code. Here is an example how everything works.

<iframe src="https://medium.com/media/aec2bc552ec2a23fad515d6fde3a358b" allowfullscreen="" frameborder="0" height="1510" width="692" title="rr_v3_8.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 1510px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

> Exercise: With the example above, implement in you’re pen the code by you’re self

Now is much better, but our player keeps eating all the cells while moving, we need to implement an condition so that we can limit it’s movements.

<iframe src="https://medium.com/media/e169c111b16867e2f36d64323641ae64" allowfullscreen="" frameborder="0" height="300" width="692" title="rr_v3_9.js" class="fc aq as ag dq" scrolling="auto" style="box-sizing: inherit; height: 300px; top: 0px; left: 0px; width: 692px; position: absolute;"></iframe>

Yayyyyyyyyyyyyyyy, we have made it the player now moves the fog is implemented and we dont run trough walls. Our [pen](http://codepen.io/Spartano/pen/qakOod?editors=0010) is almost finished now. If you sticked with me until this point, congratulatios, you are a determined person, be proud of you’re self, you deserved it.

# Bye Bye

![img](https://miro.medium.com/max/800/1*W7NyP22gSXEmGP3JIZVHUA.gif)

I will not guide you until the end, i am afraid that these article is too long, so no one will continue reading, so i rather leave you with some exercises and the [solution](http://codepen.io/thepeted/pen/aNrdzP)(i am not that heartless). Take it as an graduation test, give it you’re best, and good luck.

PS: if comments are positive, i will continue these series :)

> Exercises:

- create an Cell component and restore the opacity property using destination as an prop
- create an reducer that takes care of the Player info and an initial state
- use combine reducers
- create an action that gives Player hp
- create an action that takes hp from Player
- create an action that gives Player additional damage when weapon change
- create an action that handles exit cell and generates new Dungeon with level+1
- handle them with an switch(destination.type) inside playerInput()
- create an action that toggles Fog mode on/off
- when moving you will have to take in consideration the viewport, so handle that inside the render method

50

1
