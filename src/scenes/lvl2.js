import * as Phaser from 'phaser';
let  keyA, keyD, keyW, keyY;
var cursors;
var key = false;
var ynak;
var tst = 1;
var rndm = 0;

export default class level2 extends Phaser.Scene {
    constructor() {
      super('level2');
    }
    
    preload(){
      cursors = this.input.keyboard.createCursorKeys();
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
      this.load.image('background', '/static/background.jpg');
      this.load.image('lvl2', '/static/level2.png');
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
      this.background = this.add.tileSprite(-1000, -900, 2240, 0, 'background')
      .setOrigin(0, 0)
      .setScrollFactor(0.5, 0)
      .setDepth(-100);

      
    //images, sprites,...
      const platforma = this.physics.add.image(0,320, 'lvl2').setOrigin(0,0);
      this.player = this.physics.add.sprite(0, 260, 'player').setOrigin(0,0);
      this.dr1 = this.physics.add.image(2176,192, 'dr1').setOrigin(0, 0).setImmovable(true).setDepth(-50);
      this.key1 = this.physics.add.image(1300,260, 'key1').setOrigin(0,0).setImmovable(true);
      this.btn1 = this.physics.add.image(1504,208.5, 'btn1').setImmovable(true).setAngle(180)


      var tls = [
        this.physics.add.image(384,256, 'tl2').setOrigin(0, 0).setImmovable(true), 
        this.physics.add.image(448,192, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(512,128, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(576,128, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(640,128, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(704,128, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(896,256, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(1088,192, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(1280,128, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(1472,128, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(1600,256, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(1728,256, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(1728,192, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(1856,256, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(1856,192, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(1856,128, 'tl2').setOrigin(0, 0).setImmovable(true),
        this.physics.add.image(1856,128, 'tl2').setOrigin(0, 0).setImmovable(true),
      ];
      var spks = [
        this.physics.add.image(704,256, 'sp1').setOrigin(0,0).setImmovable(true).setSize(64,34).setOffset(0,30),
        this.physics.add.image(768,256, 'sp1').setOrigin(0,0).setImmovable(true).setSize(64,34).setOffset(0,30),
        this.physics.add.image(832,256, 'sp1').setOrigin(0,0).setImmovable(true).setSize(64,34).setOffset(0,30),
        this.physics.add.image(960,256, 'sp1').setOrigin(0,0).setImmovable(true).setSize(64,34).setOffset(0,30),
        this.physics.add.image(1024,256, 'sp1').setOrigin(0,0).setImmovable(true).setSize(64,34).setOffset(0,30),
        this.physics.add.image(1152,256, 'sp1').setOrigin(0,0).setImmovable(true).setSize(64,34).setOffset(0,30),
        this.physics.add.image(1216,256, 'sp1').setOrigin(0,0).setImmovable(true).setSize(64,34).setOffset(0,30),
        this.physics.add.image(1312,224, 'sp1').setImmovable(true).setSize(64,34).setOffset(0,0).setAngle(180),
        this.physics.add.image(1568,288, 'sp1').setImmovable(true).setSize(34,62).setOffset(30,0).setAngle(-90),
        this.physics.add.image(1664,256, 'sp1').setOrigin(0,0).setImmovable(true).setSize(64,34).setOffset(0,30),
        this.physics.add.image(1792,256, 'sp1').setOrigin(0,0).setImmovable(true).setSize(64,34).setOffset(0,30),
        this.physics.add.image(1920,256, 'sp1').setOrigin(0,0).setImmovable(true).setSize(64,34).setOffset(0,30),
        
      ]
        
        
      
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
      this.physics.add.collider(this.player, tls);
      this.physics.add.collider(this.player, spks, function(){rndm = 1});
    
    //camera follow
      this.cameras.main.startFollow(this.player, true, 0.05, 1, 0, 4);
      this.cameras.main.setBounds(0, -400,  2240, 1024);
    
      

    }
    
    
    update(){    
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

      if (this.player.x < 0) {
        this.player.x = 0;
      }
      if (this.player.x > 2181) {
        this.player.x = 2181;
      }
      if(keyY.isDown){
        this.player.x = 2048;
        this.player.y = 128;
      }
      if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.dr1.getBounds()) == true && key == true) { //door change texture(door texture == door opened), sceene change to level2
        this.dr1.setTexture('dr2');
        if(tst == 1){
          this.cameras.main.fadeOut(1000, 0, 0, 0)
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
          this.scene.start('level3')
        })
        tst = 0;
        }
        
      }
      /*if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.dr1.getBounds()) == true && key == false) { //door change texture(door texture == door opened), sceene change to level2
        //add text(you need a key)
      }*/
      if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.dr1.getBounds()) == false) { //door texture == door closed, if player isn't touching the door
        this.dr1.setTexture('dr1');
      }
      if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.key1.getBounds()) == true) { //door texture == door closed, if player isn't touching the door
        this.key1.destroy();
        key = true;
      }
      if(rndm == 1){
        this.scene.restart();
        rndm = 0;
      }
      if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.btn1.getBounds()) == true && key == true) { 
        this.btn1.setTexture('btn2');
        setTimeout(() => {
          this.player.x = 1603; 
          this.player.y = 196; 
        }, 680);
        
      }
      if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.btn1.getBounds()) == true && key == false) { 
        this.btn1.setTexture('btn2')
      }
      if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.btn1.getBounds()) == false) { 
        this.btn1.setTexture('btn1')
      }
    }

    preUpdate() {
      this.background.setTilePosition(this.scene.cameras.main.scrollX * 0.2);
    }
    




}