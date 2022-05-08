<<<<<<< HEAD
class Level1 extends levelScene {
=======
class Level1 extends Phaser.Scene {
>>>>>>> f28cb28607f9d32cb5efd59d6dae1dfd0e2e45f0

    constructor() {
        super({
            key: 'Level1',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1500 },
                    debug: true
                }
            }
        })
<<<<<<< HEAD
    }

=======

        

        this.player;
        this.platforms;
        this.juke;
        this.deathBoxes;
        //this.spawns = [[64+32,640*3 + 320]] ;
        //this.spawns = [[64+32, 320]] ;
        this.spawns;
        this.checkpoints;
        this.screenBounds = [
            [0, 0, 32 * 64, 14 * 64],
            [32 * 64, 0, 54 * 64, 15 * 64],
            [0, 13 * 64, 37 * 64, 13 * 64],
            [37 * 64, 13 * 64, 12000, 13 * 64]
        ]

        this.p4 = new Array(4);
        this.p4overlap = new Array(4).fill(new Array());
        this.db4 = new Array(4);
        this.db4overlap = new Array(4).fill(new Array());

        this.p8 = new Array(8);
        this.p8overlap = new Array(8).fill(new Array());
        this.db8 = new Array(8);
        this.db8overlap = new Array(8).fill(new Array());

        console.log(this.db4overlap);

        this.text;
    }

    /*##################################################################################################################################################
    Partie 0 Variables Globales et Preload
    ##################################################################################################################################################*/

    buildBetterHitBox(layer, hitboxVar, beatmap) {
        for (let i = 0; i < layer.height; i++) {
            for (let j = 0; j < layer.width; j++) {
                if (layer.data[i][j].index >= 0) {
                    hitboxVar.push(new RythmPlat(this, j * 64, i * 64, 'transparent', beatmap).setOrigin(0, 0));
                    if (layer.name = '4beats/deathbox41') {
                        //console.log(this.db4overlap);
                    }
                }
            }
        }
    }

    buildGamePlaformsFromMap(map, tileset) {
        this.platforms = map.createLayer('platforms', tileset);
        this.platforms.setCollisionByExclusion(-1, true);

        this.deathBoxes = map.createLayer('deathBoxes', tileset);
        this.deathBoxes.setCollisionByExclusion(-1, true);

        for (let i = 0; i < 4; i++) {
            this.p4[i] = map.createLayer('4beats/plat4' + (i + 1), tileset);
            var beatmap = new Array(4).fill(0);
            beatmap[i] = 1;
            this.p4[i] = new RythmMover(this.p4[i], beatmap);
            //console.log(this.p4[i]);
        }

        for (let i = 0; i < 4; i++) {
            this.db4[i] = map.createLayer('4beats/deathbox4' + (i + 1), tileset);
            var beatmap = new Array(4).fill(0);
            beatmap[i] = 1;
            this.db4[i] = new RythmMover(this.db4[i], beatmap);
        }

        for (let i = 0; i < 8; i++) {
            this.p8[i] = map.createLayer('8beats/plat8' + (i + 1), tileset);
            var beatmap = new Array(8).fill(0);
            beatmap[i] = 1;
            this.p8[i] = new RythmMover(this.p8[i], beatmap);
        }

        for (let i = 0; i < 8; i++) {
            this.db8[i] = map.createLayer('8beats/deathbox8' + (i + 1), tileset);
            var beatmap = new Array(8).fill(0);
            beatmap[i] = 1;
            this.db8[i] = new RythmMover(this.db8[i], beatmap);
        }

        // Mise en place des better bodies

        console.log(this.db4overlap);

        /*map.layers.forEach(layer => {
            switch (layer.name[0]) {

                // Patterns sur 4 temps

                case '4':
                    if (layer.name.length == 13) { // 4beats/plat4X
                        var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                        var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                        beatmap[index] = 1;
                        console.log(beatmap);
                        this.buildBetterHitBox(layer, this.db4overlap[index], beatmap);
                    }
                    else if (layer.name.length == 17) { // 4beats/deathbox4X
                        var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                        var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                        beatmap[index] = 1;
                        console.log(beatmap);
                        console.log(this.db4overlap);
                        this.buildBetterHitBox(layer, this.p4overlap[index], beatmap);
                        console.log(this.db4overlap);
                    }
                    break;

                // Patterns sur 8 temps 

                case '8':
                    if (layer.name.length == 13) { // 8beats/plat8X
                        var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                        var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                        beatmap[index] = 1;
                        this.buildBetterHitBox(layer, this.db8overlap[index], beatmap);
                    }
                    else if (layer.name.length == 17) { // 8beats/deathbox8X
                        var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                        var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                        beatmap[index] = 1;
                        this.buildBetterHitBox(layer, this.p8overlap[index], beatmap);
                    }
                    break;
            }
        })*/

        map.layers.forEach(layer => {
            switch (layer.name[0] + '-' + layer.name.length) {

                // Patterns sur 4 temps

                case '4-13': // 4beats/plat4X

                    var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                    var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                    beatmap[index] = 1;
                    console.log(beatmap);
                    this.buildBetterHitBox(layer, this.p4overlap[index], beatmap);
                    break;

                case '4-17': // 4beats/deathbox4X
                    console.log('test');
                    var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                    var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                    beatmap[index] = 1;
                    console.log(beatmap);
                    console.log(this.db4overlap);
                    this.buildBetterHitBox(layer, this.db4overlap[index], beatmap);
                    console.log(this.db4overlap);
                    break;

                // Patterns sur 8 temps 

                case '8-13': // 8beats/plat8X

                    var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                    var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                    beatmap[index] = 1;
                    this.buildBetterHitBox(layer, this.p8overlap[index], beatmap);
                    break;

                case '8-17': // 8beats/deathbox8X

                    var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                    var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                    beatmap[index] = 1;
                    this.buildBetterHitBox(layer, this.db8overlap[index], beatmap);
                    break;
            }
        })
    }

    buildCollisions() {

        // Colliders avec les layers

        this.physics.add.collider(this.player, this.platforms);

        this.physics.add.collider(this.player, this.deathBoxes, function (currPlayer) {
            currPlayer.die();
        }, null, this);

        for (let i = 0; i < 4; i++) {
            this.p4[i].plat.setCollisionByExclusion(-1, true);
            this.physics.add.collider(this.player, this.p4[i].plat);
        }

        for (let i = 0; i < 4; i++) {
            this.db4[i].plat.setCollisionByExclusion(-1, true);
            this.physics.add.collider(this.player, this.db4[i].plat, function (currPlayer) {
                currPlayer.die();
            });
        }

        for (let i = 0; i < 8; i++) {
            this.p8[i].plat.setCollisionByExclusion(-1, true);
            this.physics.add.collider(this.player, this.p8[i].plat);
        }

        for (let i = 0; i < 8; i++) {
            this.db8[i].plat.setCollisionByExclusion(-1, true);
            this.physics.add.collider(this.player, this.db8[i].plat, function (currPlayer) {
                currPlayer.die();
            });
        }

        // Overlaps avec les better bodies

        for (let i = 0; i < 4; i++) {
            this.physics.add.overlap(this.player, this.p4overlap[i]);
        }

        for (let i = 0; i < 4; i++) {
            this.physics.add.overlap(this.player, this.db4overlap[i], function (currPlayer) {
                currPlayer.die();
            });
        }

        for (let i = 0; i < 8; i++) {
            this.physics.add.overlap(this.player, this.p8overlap[i]);
        }

        for (let i = 0; i < 8; i++) {
            this.physics.add.overlap(this.player, this.db8overlap[i], function (currPlayer) {
                currPlayer.die();
            });
        }

        // Autres

        this.physics.add.overlap(this.player, this.checkpoints, function (currPlayer) {
            currPlayer.spawnIndex += 1;
            currPlayer.die();
        });
    }

    buildLevel(map, tileset) {

        // Décor

        this.add.image(0, 0, 'fond').setOrigin(0, 0);
        map.createLayer('pointilles', tileset);

        // Plateformes

        this.buildGamePlaformsFromMap(map, tileset);

        // Player & Object layers

        var _checkpoints = this.physics.add.group({ allowGravity: false, immovable: true });

        map.getObjectLayer('portals').objects.forEach(function (currCheck) { _checkpoints.create(currCheck.x, currCheck.y - 64, 'greenBlock').setOrigin(0); });

        this.checkpoints = _checkpoints;

        this.spawns = map.getObjectLayer('spawns').objects;

        this.player = new Chara(this, 0, 0, 'miko').setOrigin(0, 0);
        this.player.setSize(350, 896);
        this.player.setScale(1 / 7);
        this.player.die();

        this.buildCollisions();

        //this.juke = new JukeBox(this,this);

        // Camera
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setFollowOffset(-32, -64);
        cam.setBounds(0, 0, 12800, 640 * 4 - 64, true, true, true); // Empêche de voir sous le sol notamment
        //cam.setBounds(this.screenBounds[this.player.spawnIndex][0],this.screenBounds[this.player.spawnIndex][1],this.screenBounds[this.player.spawnIndex][2],this.screenBounds[this.player.spawnIndex][3]) ; // Empêche de voir sous le sol notamment
        cam.setZoom(1.2);


        // Touches utilisées
        this.cursors = this.input.keyboard.createCursorKeys(); // Flèches directionnelles 
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Touche espace 
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //this.time.addEvent({ delay: 300, callbackScope: this, callback: function () { this.juke.start(this.keyA); } });
    }

    standardUpdate(time) {
        // Actions (cf chara.js)
        this.player.move(this.cursors, this.keySpace, undefined);
        this.player.jump(this.keySpace, undefined);
        this.player.dash(this.keyE, this.cursors, undefined);
        this.player.animate(this.cursors);

        this.player.restoreAbilities();

        /*
        //console.log(timer.getElapsed()) ;
        //console.log(time) ;
        console.log(player.x)
        if (juke.on && (player.y > 5*64 || player.x < 4*640-64)) {
            if ( Math.floor(juke.oneSec.getElapsed()) != 1000 ) {
                console.log(juke.globalTime+ '.' + Math.floor(juke.oneSec.getElapsed())) ;
            }
        }
        */
    }
>>>>>>> f28cb28607f9d32cb5efd59d6dae1dfd0e2e45f0

    init(_musicScene) {
        this.musicScene = _musicScene;
        this.musicScene.jukebox.setLevelScene(this);
    }

    preload() { }

    create() {
        const MAP = this.make.tilemap({ key: 'level1' });
        const TILESET = MAP.addTilesetImage('tilesetProto', 'tileset');

        this.buildLevel(MAP, TILESET);
    }

    update(time) {
        this.standardUpdate(time);
    }
<<<<<<< HEAD
}
=======

}
>>>>>>> f28cb28607f9d32cb5efd59d6dae1dfd0e2e45f0
