class Denial extends Phaser.Physics.Arcade.Sprite {

    constructor(_scene, _x, _y, _key, _flip = false, _beatMap = [1, 1, 1, 1, 0, 0, 0, 0]) {
        super(_scene, _x, _y, _key);

        _scene.add.existing(this);
        _scene.physics.add.existing(this);
        this.body.setImmovable(true);
        //this.body.setGravity(0, -g);
        this.setOrigin(0, 0);
        //this.setSize(350,896);
        //this.setScale(1/7);

        this.scene = _scene;

        this.map = _beatMap;
        this.initialFlip = _flip;

        this.x0 = _x;
        this.y0 = _y;

        this.beam = new Phaser.Physics.Arcade.Sprite(_scene, _x + 64, _y, 'beam').setOrigin(0, 0);
        _scene.add.existing(this.beam);
        _scene.physics.add.existing(this.beam);
        this.beam.setGravityY(-g);

        console.log(this.beam);

        this.scene.physics.add.collider(this, this.scene.platforms);
        this.scene.physics.add.overlap(this.beam, this.scene.player, () => { this.scene.player.die(); });
    }

    flipped(flip) {
        return (flip - 1) ** 2;
    }

    flip() {
        this.flipX = this.flipped(this.flip);
    }

    setAsFlipped(flip) {
        this.flipX = (flip - 1) ** 2;
    }

    denialTick(BC) {
        var reducedBC = BC % this.map.length;
        if (this.map[reducedBC] == 1) {
            this.setAsFlipped(this.initialFlip);
            if (this.initialFlip) {
                this.beam.setOrigin(0, 0);
                this.beam.x = this.x + 64;
                this.beam.y = this.y;
            }
            else {
                this.beam.setOrigin(1, 0);
                this.beam.x = this.x;
                this.beam.y = this.y;
            }
        }
        else {
            this.setAsFlipped(!this.initialFlip);
            this.beam.x = 0;
            this.beam.y = 0;
        }
    }
}
