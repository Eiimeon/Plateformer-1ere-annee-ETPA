class StartScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartScreen',
        })

    }

    preload() {
        this.load.image('titleScreen', 'assets/images/titleScreen.png');
        this.load.image('pause','assets/images/pause.png');

        this.load.tilemapTiledJSON('gym', 'assets/images/map/proto.json');
        this.load.tilemapTiledJSON('level1', 'assets/images/map/level1.tmj');

        // Maps Level 1
        this.load.tilemapTiledJSON('L1_0', 'assets/images/map/L1_0.tmj');
        this.load.tilemapTiledJSON('L1_1', 'assets/images/map/L1_1.tmj');
        this.load.tilemapTiledJSON('L1_2', 'assets/images/map/L1_2.tmj');
        this.load.tilemapTiledJSON('L1_3', 'assets/images/map/L1_3.json');
        this.load.tilemapTiledJSON('L1_4', 'assets/images/map/L1_4.json');
        this.load.tilemapTiledJSON('L1_5', 'assets/images/map/L1_5.json');
        this.load.tilemapTiledJSON('L1_6', 'assets/images/map/L1_6.json');
        this.load.tilemapTiledJSON('L1_7', 'assets/images/map/L1_7.json');
        this.load.tilemapTiledJSON('L1_8', 'assets/images/map/L1_8.json');
        this.load.tilemapTiledJSON('L1_9', 'assets/images/map/L1_9.json');

        this.load.image('tileset', 'assets/images/map/tilesetProto++.png')

        this.load.spritesheet('runSheet', 'assets/images/runAnimTestSheet.png', { frameWidth: 1000, frameHeight: 1270 });

        this.load.image('fond', 'assets/images/protoFond.png')
        this.load.image('bSquare', 'assets/images/bSquare.png');
        this.load.image('miko', 'assets/images/miko0.png');
        this.load.image('denial', 'assets/images/denialProto.png');
        this.load.image('crash', 'assets/images/crash.png');
        this.load.image('foe', 'assets/images/foe.png');
        this.load.image('bg', 'assets/images/sky.png');
        this.load.image('crate', 'assets/images/crate.png');
        this.load.image('peche', 'assets/images/peche.png');
        this.load.image('testNet', 'assets/images/testNet.PNG');
        this.load.image('greenBlock', 'assets/images/greenBlock.png');
        this.load.image('transparent', 'assets/images/transparent.png');
        this.load.image('beam', 'assets/images/beam.png');

        this.load.audio('120bpm', 'assets/musiques/120bpm.mp3');
        this.load.audio('angry100bpm', 'assets/musiques/angry3.wav');
        this.load.audio('HP4', 'assets/musiques/HP4.mp3')
        this.load.audio('HP5', 'assets/musiques/HP5.mp3')
        this.load.audio('HP6', 'assets/musiques/HP6.mp3')
        this.load.audio('HP7', 'assets/musiques/HP7.mp3')
        this.load.audio('HP8', 'assets/musiques/HP8.mp3')
    }

    create() {
        this.add.image(0, 0, 'titleScreen').setOrigin(0, 0).setScale(1);
        this.cameras.main.fadeIn(1000);
    }

    update() {
        var keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (keySpace.isDown) {
            this.scene.start('MusicAndData');
        }
    }
}   