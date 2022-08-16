import * as Phaser from 'phaser';

let keyA, keyD, keyW, keyS;
var cursors;
var tst = 1;
var rndm = 0;

export default class level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'level1' });
  }

  preload() {
    //load images
    this.load.image('background', '/static/background.jpg');
    this.load.image('spike', '/static/spike.png');
    this.load.image('dr1', '/static/door1.png');
    this.load.image('player', '/static/character.png');
    this.load.image('tiles', '/static/platformPack_tilesheet.png');
    this.load.image('lvl1', '/static/level1.png');
    this.load.image('tl1', '/static/tile1.png');
    this.load.image('dr2', '/static/door2.png');
    this.load.image('dr3', '/static/door3.png')
    
    //movement keys
    cursors = this.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  }

  create() {
    //images, sprites  
    const backgroundImage = this.add.image(-1000, -900, 'background').setOrigin(0, 0).setDepth(-100);
    const platforma = this.physics.add.image(0,321, 'lvl1').setOrigin(0,0);
    this.player = this.physics.add.sprite(0, 225, 'player').setOrigin(0,0);
    this.dr1 = this.physics.add.image(960, 192, 'dr1').setOrigin(0,0).setDepth(-50).setImmovable(true);  
    this.dr3 = this.physics.add.image(960, 192, 'dr3').setOrigin(0,0).setImmovable(true);

    var tls = [
    this.physics.add.image(170,256, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(234,192, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(298,192, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(362,128, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(570,128, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(710,192, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(852,256, 'tl1').setOrigin(0, 0).setImmovable(true),
    ]
    
    var spks = [
    this.physics.add.image(375,256, 'spike').setOrigin(0, 0).setImmovable(true).setSize(64,34).setOffset(0,30),
    this.physics.add.image(439,256, 'spike').setOrigin(0, 0).setImmovable(true).setSize(64,34).setOffset(0,30),
    this.physics.add.image(503,256, 'spike').setOrigin(0, 0).setImmovable(true).setSize(64,34).setOffset(0,30),
    this.physics.add.image(567,256, 'spike').setOrigin(0, 0).setImmovable(true).setSize(64,34).setOffset(0,30),
    this.physics.add.image(640,256, 'spike').setOrigin(0, 0).setImmovable(true).setSize(64,34).setOffset(0,30), 
    this.physics.add.image(767,256, 'spike').setOrigin(0, 0).setImmovable(true).setSize(64,34).setOffset(0,30)
    ];


    //physics for this.player
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.player.setGravityY(850);

    //physics for platforma
    platforma.setGravityY(0)
    platforma.setGravity(false);
    platforma.setImmovable(true);


    

    //coliders
    this.physics.add.collider(this.player, platforma);
    this.physics.add.collider(this.player, tls);
    this.physics.add.collider(this.player, spks, function(){rndm = 1});
  }

  update(){
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.dr3.getBounds()) == true) { //door change texture(door texture == door opened), sceene change to level2
      this.dr1.setTexture('dr2');
      if(tst == 1){
        this.cameras.main.fadeOut(1000, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('level2');
      })
      tst = 0;
      }
      
    }
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.dr3.getBounds()) == false) { //door texture == door closed, if player isn't touching the door
      this.dr1.setTexture('dr1');
    }
    if(keyW.isDown && this.player.body.touching.down){ //jump
      this.player.setVelocityY(-380);
    }
    if(keyD.isDown && !keyA.isDown){ //player move right
      this.player.setVelocityX(280);
    }
    if(keyA.isDown && !keyD.isDown){ //player move left
      this.player.setVelocityX(-280);
    }
    if(!keyA.isDown && !keyD.isDown){ //player keep still
      this.player.setVelocityX(0);
    }
    if(keyS.isDown){
      if(tst == 1){
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('level2');
      })
      tst = 0;
      }
    }
    if(rndm == 1){
      this.scene.restart();
      rndm = 0
    }
    
    
  }




}

