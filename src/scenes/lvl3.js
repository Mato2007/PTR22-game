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
      super('level3');
    }
    
    preload(){
    }
    create(){
      //background
      this.background = this.add.tileSprite(-500, -900, 2240, 0, 'background')
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

    }
       
    update(){    
      if(keyY.isDown){ //teleport shortcut
        this.player.x = 2048;
        this.player.y = 128;
      }
      if (this.player.x < 0) { //movement limit
        this.player.x = 0;
      }
      if (this.player.x > 3460) { //movement limit 
        this.player.x = 3460;
      }
    }

    preUpdate() {
      this.background.setTilePosition(this.scene.cameras.main.scrollX * 0.2);
    }
}