class L1_2 extends levelScene {

    constructor() {
        super({
            key: 'L1_2',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: g },
                    // debug: true
                }
            }
        })
    }

    preload() { }

    create() {
        const MAP = this.make.tilemap({ key: 'L1_2' });
        const TILESET = MAP.addTilesetImage('tilesetProto++', 'tileset');

        this.buildLevel(MAP, TILESET);
    }

    update(time,delta) {
        this.standardUpdate(time,delta);
    }

}