import Phaser from 'phaser';
import config from './js/Config/config.js';
import GameScene from './js/Scenes/GameScene.js';
import BootScene from './js/Scenes/BootScene.js';
import PreloaderScene from './js/Scenes/PreloaderScene.js';
import TitleScene from './js/Scenes/TitleScene.js';
import OptionsScene from './js/Scenes/OptionsScene.js';
import CreditsScene from './js/Scenes/CreditsScene.js';
import LeaderboardScene from './js/Scenes/LeaderboardScene.js';
import Model from './js/Model.js';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = {
      model, bgMusic: null, name: 'Kene', score: 0,
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Leaderboard', LeaderboardScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();