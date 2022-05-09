class L1_1 extends levelScene {

    constructor() {
        super({
            key: 'L1_1',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1500 },
                    debug: true
                }
            }
        })
    }

    preload() { }

    create() {
        const MAP = this.make.tilemap({ key: 'L1_1' });
        const TILESET = MAP.addTilesetImage('tilesetProto++', 'tileset');

        this.buildLevel(MAP, TILESET);
    }

    update(time) {
        this.standardUpdate(time);
    }

}