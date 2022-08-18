import * as Phaser from 'phaser';

export default class menu extends Phaser.Scene {
    constructor() {
      super({ key: 'menu' });
    }
    preload(){
    }

    create(){
      console.log('menu');
      // this.scene.launch('level1');
      this.add.image(0,0, 'idk').setOrigin(0,0).setScale(0.8,0.8);
      this.add.text(0,0, "Click here to start", {fill: "#ffffff", fontSize: 64}).setOrigin(0,0);
    }
    update(){
    }
}