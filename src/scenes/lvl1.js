import * as Phaser from 'phaser';
import Player from '../objects/player'

var tst = 1;
var dead = 0;
let keyS;
var cursors;

export default class level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'level1' });
  }

  preload() {
  }

  create() {
    //sprite(player)
    this.player = new Player(this, 0, 260).setOrigin(0,0);

    //background
    this.background = this.add.tileSprite(-1000, -900, 2240, 0, 'background')
      .setOrigin(0, 0)
      .setScrollFactor(0.5, 0)
      .setDepth(-100);

    //images 
    const platforma = this.physics.add.image(0,321, 'lvl1').setOrigin(0,0);
    this.dr1 = this.physics.add.image(960, 192, 'dr1').setOrigin(0,0).setDepth(-50).setImmovable(true);  
    this.dr3 = this.physics.add.image(960, 192, 'dr3').setOrigin(0,0).setImmovable(true);

    //tiles
    var tls = [
    this.physics.add.image(170,256, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(234,192, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(298,192, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(362,128, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(570,128, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(710,192, 'tl1').setOrigin(0, 0).setImmovable(true),
    this.physics.add.image(852,256, 'tl1').setOrigin(0, 0).setImmovable(true),
    ]
    
    //spikes
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
    this.physics.add.collider(this.player, spks, function(){dead = 1});

    //keyboard input
    cursors = this.input.keyboard.createCursorKeys();
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);  
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
    
    if(keyS.isDown){
      if(tst == 1){
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('level2');
      })
      tst = 0;
      }
    }
    if(dead == 1){
      this.scene.restart();
      dead = 0;
    }
    
    
  }




}

