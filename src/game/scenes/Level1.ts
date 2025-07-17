import Phaser from "phaser";

export default class Level1 extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super("Level1");
  }

  preload() {
    // Use your tile PNG from the Pico-8 Platformer pack
    this.load.image("ground", "assets/tiles/tile_0000.png");
  }

  create() {
    // --- GROUND ---
    this.platforms = this.physics.add.staticGroup();
    const groundY = 568;
    const tileSize = 16;
    for (let x = 0; x < 800; x += tileSize) {
      this.platforms.create(x, groundY, "ground").setOrigin(0, 0);
    }

    // --- ADD MORE PLATFORMS ---
    this.platforms.create(300, 450, "ground").setOrigin(0, 0);
    this.platforms.create(500, 350, "ground").setOrigin(0, 0);
    this.platforms.create(700, 250, "ground").setOrigin(0, 0);

    // --- PLAYER ---
    const graphics = this.add.graphics();
    graphics.fillStyle(0x00ff00, 1);
    graphics.fillRect(0, 0, 16, 16);
    graphics.generateTexture("player", 16, 16);
    graphics.destroy();

    this.player = this.physics.add.sprite(100, 450, "player");
    this.player.setDisplaySize(32, 32); // Bigger player
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    if (!this.cursors || !this.player) return;

    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    // Type guard for player body
    const body = this.player.body as Phaser.Physics.Arcade.Body | undefined;
    if (this.cursors.up?.isDown && body?.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
