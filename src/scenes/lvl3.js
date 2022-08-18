import * as Phaser from 'phaser';
import Player from '../objects/player'
var key = false;
var ynak;
var tst = 1;
var dead = 0;
var keyY;
var cursors;

export default class level3 extends Phaser.Scene {
    constructor() {
      super({ key: 'level3' });
    }
    
    preload(){
    }
    create(){
      //background
      this.background = this.add.tileSprite(-500, -900, 2240, 0, 'background').setDepth(-100)
      .setOrigin(0, 0)
      .setScrollFactor(0.5, 0)
      .setDepth(-100);
        
      //images, sprites,...
      const platforma = this.physics.add.image(0,320, 'lvl3').setOrigin(0,0);
      // this.player = this.physics.add.sprite(0, 260, 'player').setOrigin(0,0);
      this.player = new Player(this, 0, 260).setOrigin(0,0);
        
      //physics for this.player
      this.player.setBounce(0, 0);
      this.player.setCollideWorldBounds(false);
      this.player.setGravityY(850);
      this.player.setFrictionX(1);

      //physics for platforma
      platforma.setGravityY(0)
      platforma.setGravity(false);
      platforma.setImmovable(true);

      //colliders
      this.physics.add.collider(this.player, platforma);
      /*this.physics.add.collider(this.player, spks, function(){dead = 1});*/
      
      //camera follow
      this.cameras.main.startFollow(this.player, true, 0.05, 1, 0, 4);
      this.cameras.main.setBounds(0, -400,  3520, 1024);
        
      //keyboard input
      cursors = this.input.keyboard.createCursorKeys();
      keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

      this.tls = this.physics.add.group({ allowGravity: false, immovable: true,});
      this.spks = this.physics.add.group({ allowGravity: false, immovable: true,});
      this.tls.createMultiple({ key: 'tl3', quantity: 5, setXY: {x: 384, y: 288, stepX: 192, stepY: -64}});
      this.tls.createMultiple({ key: 'tl3', quantity: 3, setXY: {x: 1344, y: 32, stepX: 192, }});
      this.tls.createMultiple({ key: 'tl3', quantity: 2, setXY: {x: 1984, y: 156, stepX: 192, }});
      this.spks.createMultiple({ key: 'spike_c', quantity: 25, setXY: {x: 448, y: 305, stepX: 64}});
      this.spks.createMultiple({ key: 'spike_c', quantity: 2, setXY: {x: 1984, y: 109, stepX:192}});
      this.spks.createMultiple({ key: 'spike_c', quantity: 1, setXY: {x: 2240, y: 305,}});
      this.physics.add.collider(this.player, this.tls);
      this.physics.add.collider(this.player, this.spks, function(){dead = 1});
      this.dr1 = this.physics.add.image(3456,192, 'dr1').setOrigin(0, 0).setImmovable(true).setDepth(-50);
      this.key1 = this.physics.add.image(2240,156, 'key1').setOrigin(0,0).setImmovable(true);
    }
       
    update(){  
      //key destroy if touched
      if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.key1.getBounds()) == true) { 
        this.key1.destroy();
        this.key = true;
      }

      //if player dies, this scene restarts
      if(dead == 1){
        this.scene.restart();
        dead = 0;
      }
      
      //teleport shortcut  
      if(keyY.isDown){
        this.player.x = 2048;
        this.player.y = 128;
      }

      //movement limit
      if (this.player.x < 0) {
        this.player.x = 0;
      }

      //movement limit 
      if (this.player.x > 3460) {
        this.player.x = 3460;
      }
    }

    preUpdate() {
      this.background.setTilePosition(this.scene.cameras.main.scrollX * 0.2);
    }
}