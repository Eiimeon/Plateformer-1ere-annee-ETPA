class StartScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartScreen',
        })

    }

    preload() {
        this.load.image('titleScreen', 'assets/images/titleScreen.png');

        this.load.tilemapTiledJSON('map', 'assets/images/map/proto.json');
        this.load.image('tileset', 'assets/images/map/tilesetProto++.png')

        this.load.spritesheet('runSheet', 'assets/images/runAnimTestSheet.png', { frameWidth: 1000, frameHeight: 1270 });

        this.load.image('fond', 'assets/images/protoFond.png')
        this.load.image('bSquare', 'assets/images/bSquare.png');
        this.load.image('miko', 'assets/images/miko0.png');
        this.load.image('crash', 'assets/images/crash.png');
        this.load.image('foe', 'assets/images/foe.png');
        this.load.image('bg', 'assets/images/sky.png');
        this.load.image('crate', 'assets/images/crate.png');
        this.load.image('peche', 'assets/images/peche.png');
        this.load.image('testNet', 'assets/images/testNet.PNG');
        this.load.image('greenBlock', 'assets/images/greenBlock.png');
        this.load.image('transparent', 'assets/images/transparent.png');

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
    }

    update() {
        var keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (keySpace.isDown) {
            this.scene.start('Level1');
        }
    }
}   