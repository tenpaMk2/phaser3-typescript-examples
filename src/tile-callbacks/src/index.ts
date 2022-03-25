import * as Phaser from "phaser";

export default class Demo extends Phaser.Scene {
  cursors: any;
  player: Phaser.Physics.Arcade.Image;

  constructor() {
    super("demo");
  }

  preload() {
    this.load.image("pipo", "assets/[Base]BaseChip_pipo.png");
  }

  create() {
    const map = this.make.tilemap({
      tileWidth: 32,
      tileHeight: 32,
      width: 30,
      height: 30,
    });
    const tileset = map.addTilesetImage("pipo");
    const layer = map.createBlankLayer("hoge", tileset, 0, 0, 10, 10);
    map.fill(48);

    map.removeTileAt(9, 0);

    this.player = this.physics.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      "pipo"
    );
    this.player.width = 20;
    this.player.setDisplaySize(100, 100);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Collisions
    this.physics.add.overlap(
      this.player,
      layer,
      (
        obj1: Phaser.Types.Physics.Arcade.GameObjectWithBody,
        obj2: Phaser.Types.Physics.Arcade.GameObjectWithBody
      ) => {}
    );
    layer.setCollisionBetween(0, 48);

    layer.setTileIndexCallback(
      48,
      (image: Phaser.Physics.Arcade.Image, tile: Phaser.Tilemaps.Tile) => {
        map.removeTileAt(tile.x, tile.y);
      },
      this
    );
  }

  update() {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setAngle(-90).setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setAngle(90).setVelocityX(200);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(200);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: Demo,
};

const game = new Phaser.Game(config);
