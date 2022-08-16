import * as Phaser from 'phaser';
import level1 from './scenes/lvl1';
import level2 from './scenes/lvl2';
import level3 from './scenes/lvl3';

const config = {
  name: 'app',
  type: Phaser.AUTO,
  scale:{
    //autoCenter: Phaser.Scale.CENTER_BOTH,
    //mode: Phaser.Scale.NONE,
  },
  
  width: 1024,
  height: 512,
  scene: [level1, level2, level3],
  autoCenter: true,

  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },


};

window.game = new Phaser.Game(config);
