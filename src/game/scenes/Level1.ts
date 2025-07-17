// src/game/scenes/Level1.ts

import Phaser from "phaser";

export default class Level1 extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super("Level1");
  }

  preload() {
    // Blocks & character -- adjust paths as needed
    this.load.image("ground", "assets/Sprites/Tiles/Default/block_brown.png");
    this.load.image(
      "platform",
      "assets/Sprites/Tiles/Default/block_planks.png"
    );
    this.load.image("block", "assets/Sprites/Tiles/Default/block_yellow.png");
    this.load.image(
      "background",
      "assets/Sprites/Backgrounds/Default/background_color_hills.png"
    );
    this.load.image(
      "player",
      "assets/Sprites/Characters/Default/character_yellow_idle.png"
    );
  }

  create() {
    // Background - make it cover the whole screen (assuming 800x600 canvas)
    this.add
      .image(0, 0, "background")
      .setOrigin(0, 0)
      .setDisplaySize(
        this.sys.game.config.width as number,
        this.sys.game.config.height as number
      );

    // Platforms
    this.platforms = this.physics.add.staticGroup();

    // Ground (multiple blocks to cover screen width)
    for (let x = 0; x < 800; x += 70) {
      this.platforms.create(x, 568, "ground").setScale(2).refreshBody();
    }

    // Floating blocks
    this.platforms.create(600, 400, "platform").setScale(1.5);
    this.platforms.create(50, 250, "block").setScale(1.5);
    this.platforms.create(750, 220, "block").setScale(1.5);

    // Player starts above ground
    this.player = this.physics.add.sprite(100, 500, "player");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Physics
    this.physics.add.collider(this.player, this.platforms);

    // Input
    this.cursors = this.input.keyboard?.createCursorKeys();
  }
  update() {
    // Safeguard for cursors and player
    if (!this.cursors || !this.player.body) return;

    // Horizontal movement
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    // Jump, only if touching ground
    const body = this.player.body as Phaser.Physics.Arcade.Body | undefined;
    if (this.cursors.up?.isDown && body?.blocked.down) {
      this.player.setVelocityY(-330);
    }
  }
}
