import Phaser from 'phaser';

import tilesImg from '../../assets/map/hyptosis_til-art-batch-2.png';
import tilesJson from '../../assets/map/world.json';
import characterImg from '../../assets/player.png';
import coin from '../../assets/coin.png';
import dragon from '../../assets/skyll.png';
import updateScore from '../Api/updateScore.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.sys.game.globals.score = 0;
    this.life = 5;
  }

  preload() {
    this.load.image('tiles', tilesImg);
    this.load.tilemapTiledJSON('map', tilesJson);
    this.load.spritesheet('player', characterImg, {
      frameWidth: 24,
      frameHeight: 32,
    });
    this.load.spritesheet('coin', coin, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('dragon', dragon, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('field', 'tiles');
    map.createLayer('floor', tiles, 0, 0);
    const obstacles = map.createLayer('obstacle', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(10, 10, 'player', 7);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, obstacles);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [10, 9, 10, 11],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [4, 5, 4, 3],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [1, 0, 1, 2],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [7, 6, 7, 8],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, obstacles);

    //--------------------------
    this.coin = this.physics.add.group();

    this.coinGen();

    this.physics.add.overlap(
      this.player,
      this.coin,
      this.onMeetCoin,
      false,
      this,
    );

    //-------------------------------------
    this.dragon = this.physics.add.group();

    this.time.addEvent({
      delay: 3000,
      callback: this.dragonGen,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(
      this.player,
      this.dragon,
      this.onMeetDragon,
      false,
      this,
    );

    //----------------------------------

    this.scoreText = this.add.text(8, 8, 'Score: 0', {
      fontSize: '16px',
      fill: '#fff',
      backgroundColor: '#000',
    });
    this.scoreText.scrollFactorX = 0;
    this.scoreText.scrollFactorY = 0;

    this.lifeText = this.add.text(720, 8, 'Life: 5', {
      fontSize: '16px',
      fill: '#fff',
      backgroundColor: '#000',
    });
    this.lifeText.scrollFactorX = 0;
    this.lifeText.scrollFactorY = 0;
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
      this.player.anims.play('down', true);
    } else {
      this.player.body.setVelocity(0);
      this.player.anims.stop();
    }
  }

  onMeetCoin(player, zone) {
    // we move the zone to some other location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // start battle
    this.sys.game.globals.score += 10;
    this.scoreText.setText(`Score: ${this.sys.game.globals.score}`);
  }

  async onMeetDragon(player, zone) {
    // we move the zone to some other location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // shake the world
    this.cameras.main.shake(200);

    // start battle
    this.life -= 1;
    this.lifeText.setText(`Life: ${this.life}`);

    if (this.life === 0) {
      this.scene.start('Leaderboard');
      await updateScore({
        user: this.sys.game.globals.name,
        score: this.sys.game.globals.score,
      });
    }
  }

  coinGen() {
    for (let i = 0; i < 20; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

      this.coin.create(x, y, 'coin', 3);
    }
  }

  dragonGen() {
    for (let i = 0; i < 10; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      const v = Phaser.Math.RND.between(20, 40);

      this.dragon.create(x, y, 'dragon', 1);
      this.dragon.setVelocityX(-v);
    }
  }
}
