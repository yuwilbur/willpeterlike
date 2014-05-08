var game;
var circle;
var shape;
var firebase = new Firebase('https://jnks031h2o4.firebaseio-demo.com/users/jim');
var prevPoint = new Phaser.Point();
var players = [];
var bitmap;
var handle1;
var handle2;
var line1;

firebase.remove(function() {
  game = new Phaser.Game(800,600,Phaser.CANVAS, 'phaser', {preload: preload, create: create, });  
});

function preload() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#0000FF';
  game.load.image('circleImg', 'assets/sprites/circle.jpg');

  // Don't pause game if tab loses focus
  game.stage.disableVisibilityChange = true;
}

function create() {
  /*
  //handle1 = new PhaserPoint(200,300);
  handle1 = game.add.sprite(100,200,'circleImg',0);
  handle1.anchor.set(0.5);
  handle1.inputEnabled = true;
  handle1.input.enableDrag(true);

  //handel2 = new PhaserPoint(300,300);
  handle2 = game.add.sprite(200,200,'circleImg',0);
  handle2.anchor.set(0.5);
  handle2.inputEnabled = true;
  handle2.input.enableDrag(true);

  
  line1 = new Phaser.Line(handle1.x, handle1.y, handle2.x, handle2.y);
  */
/*
  cb = game.add.bitmapData(200, 200);

  console.log(cb.circle);
  console.log(cb);
  cb.circle(50, 50, 25, '#FFFFFF');
  */
	
  //game.physics.enable(circle, Phaser.Physics.ARCADE);

  firebase.on('child_added', function(snapshot) {
    var data = snapshot.val();
    var id = data.id;
    var point = new Phaser.Point(data.point.x, data.point.y);
    var filter = players.filter(function(item) {
      return item.id === id;
    });
    var player;

    if(filter.length) {
      player = filter[0];
    } else {
      player = new Player(id, game, firebase, false);
      players.push(player);
    }

    player.circle.body.velocity = point;
    player.polygon.translate(point.x, point.y);
  });

  var player = new Player(Date.now(), game, firebase,  true);
  players.push(player);
}

