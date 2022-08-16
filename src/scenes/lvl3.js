import * as Phaser from 'phaser';
let  keyA, keyD, keyW, keyY;
var cursors;
var key = false;
var ynak;
var tst = 1;
var rndm = 0;

export default class level3 extends Phaser.Scene {
    constructor() {
      super('level3');
    }
    
    preload(){
      cursors = this.input.keyboard.createCursorKeys();
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
      this.load.image('background', '/static/background.jpg');
      this.load.image('lvl3', '/static/level3.png');
      this.load.image('character', '/static/character.png');
      this.load.image('tl2', '/static/tile2.png');
      this.load.image('dr1', '/static/door1.png');
      this.load.image('dr2', '/static/door2.png');
      this.load.image('key1', '/static/key1.png');
      this.load.image('sp1', '/static/spike.png');
      this.load.image('btn1', '/static/button1.png')
      this.load.image('btn2', '/static/button2.png')    
    }
    create(){
    //background
      this.background = this.add.tileSprite(-500, -900, 2240, 0, 'background')
      .setOrigin(0, 0)
      .setScrollFactor(0.5, 0)
      .setDepth(-100);
      
    //images, sprites,...
      const platforma = this.physics.add.image(0,320, 'lvl3').setOrigin(0,0);
      this.player = this.physics.add.sprite(0, 260, 'player').setOrigin(0,0);
      
    //physics for this.player
      this.player.setBounce(0, 0);
      this.player.setCollideWorldBounds(false);
      this.player.setGravityY(850);
      this.player.setFrictionX(1);

    //physics for platforma
      platforma.setGravityY(0)
      platforma.setGravity(false);
      platforma.setImmovable(true);

    //coliders
      this.physics.add.collider(this.player, platforma);
      
      /*this.physics.add.collider(this.player, spks, function(){rndm = 1});*/
    
    //camera follow
      this.cameras.main.startFollow(this.player, true, 0.05, 1, 0, 4);
      this.cameras.main.setBounds(0, -400,  3520, 1024);
      

    }
    
    
    update(){    
      if(keyW.isDown && this.player.body.touching.down){ //jump
        this.player.setVelocityY(-380);
      }
      if(keyD.isDown && !keyA.isDown){ //player move right and keep the defaut texture
        this.player.setTexture('player');
        this.player.setVelocityX(280);
      }
      if(keyA.isDown && !keyD.isDown){ //player move left and set texture to player_mirror
        this.player.setTexture('player_mirror');
        this.player.setVelocityX(-280);
      }
      if(!keyA.isDown && !keyD.isDown){ //player keep still
        this.player.setVelocityX(0);
      }
      if(keyY.isDown){ //teleport shortcut
        this.player.x = 2048;
        this.player.y = 128;
      }
      if (this.player.x < 0) { 
        this.player.x = 0;
      }
      if (this.player.x > 3460) {
        this.player.x = 3460;
      }
    }

    preUpdate() {
      this.background.setTilePosition(this.scene.cameras.main.scrollX * 0.2);
    }
    




}