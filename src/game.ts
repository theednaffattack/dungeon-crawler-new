//
// Game object
//

type VoidFn = () => void;

interface Game {
  run: (context: CanvasRenderingContext2D) => void;
  tick: (elapsed: number) => void;
}

var Game: any = {};

Game.run = function (context: CanvasRenderingContext2D) {
  this.ctx = context;
  this._previousElapsed = 0;

  var p = this.load();
  Promise.all(p).then(
    function (loaded) {
      this.init();
      window.requestAnimationFrame(this.tick);
    }.bind(this)
  );
};

Game.tick = function (elapsed) {
  window.requestAnimationFrame(this.tick);

  // clear previous frame
  this.ctx.clearRect(0, 0, 512, 512);

  // compute delta time in seconds -- also cap it
  var delta = (elapsed - this._previousElapsed) / 1000.0;
  delta = Math.min(delta, 0.25); // maximum delta of 250 ms
  this._previousElapsed = elapsed;

  this.update(delta);
  this.render();
}.bind(Game);

// override these methods to create the demo
Game.init = function () {};
Game.update = function (delta) {};
Game.render = function () {};
