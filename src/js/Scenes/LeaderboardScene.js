import Phaser from 'phaser';
import config from '../Config/config.js';
import getScores from '../Api/getScore.js';
import Button from '../Objects/Button.js';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  async create() {
    this.add.text(config.width / 2, 32, 'Score Board', {
      color: '#FFFFFF',
      fontSize: 24,
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(config.width / 2, 100,
      `   ${this.sys.game.globals.name}${'.'.repeat(30 - this.sys.game.globals.name.length)}${this.sys.game.globals.score}`,
      { color: '#ffff00' }).setOrigin(0.5);

    let yCord = 132;

    Object.entries(await getScores()).forEach((s, i) => {
      const name = s[1].user;
      const { score } = s[1];
      const space = 30 - name.length;
      this.add.text(config.width / 2, yCord,
        `${i + 1}   ${name}${'.'.repeat(space)}${score}`,
        { color: '#fff' }).setOrigin(0.5);

      yCord += 32;
    });

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn) this.model.musicOn = !this.model.musicOn;

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}