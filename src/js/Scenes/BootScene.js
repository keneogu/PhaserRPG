import Phaser from 'phaser';
import phaserLogo from '../../assets/logo.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', phaserLogo);
  }

  create() {
    this.scene.start('Preloader');
  }
}