class L1_0 extends levelScene {

    constructor() {
        super({
            key: 'L1_0',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: g },
                    debug: true
                }
            }
        })
    }

    preload() { }

    create() {
        const MAP = this.make.tilemap({ key: 'L1_0' });
        const TILESET = MAP.addTilesetImage('tilesetProto++', 'tileset');

        this.buildLevel(MAP, TILESET);

        this.denial = new Denial(this, 300,500,'miko');

    }

    update(time) {
        this.standardUpdate(time);
    }

}