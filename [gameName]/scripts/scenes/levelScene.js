class levelScene extends Phaser.Scene {

    constructor(config) {
        super(config);

        this.player;
        this.platforms;
        this.deathBoxes;
        this.spawns;
        this.checkpoints;

        this.p4 = new Array(4);
        this.p4overlap = new Array(4).fill(new Array());
        this.db4 = new Array(4);
        this.db4overlap = new Array(4).fill(new Array());

        this.p8 = new Array(8);
        this.p8overlap = new Array(8).fill(new Array());
        this.db8 = new Array(8);
        this.db8overlap = new Array(8).fill(new Array());

        this.text;
    }


    buildBetterHitBox(layer, hitboxVar, beatmap) {
        for (let i = 0; i < layer.height; i++) {
            for (let j = 0; j < layer.width; j++) {
                if (layer.data[i][j].index >= 0) {
                    hitboxVar.push(new RythmPlat(this, j * 64, i * 64, 'transparent', beatmap).setOrigin(0, 0));
                    if (layer.name = '4beats/deathbox41') {
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

        map.layers.forEach(layer => {
            switch (layer.name[0] + '-' + layer.name.length) {

                // Patterns sur 4 temps

                case '4-13': // 4beats/plat4X

                    var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                    var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                    beatmap[index] = 1;
                    this.buildBetterHitBox(layer, this.p4overlap[index], beatmap);
                    break;

                case '4-17': // 4beats/deathbox4X
                    var beatmap = new Array(parseInt(layer.name[0])).fill(0);
                    var index = parseInt(layer.name[layer.name.length - 1]) - 1;
                    beatmap[index] = 1;
                    this.buildBetterHitBox(layer, this.db4overlap[index], beatmap);
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

        this.physics.add.overlap(this.player, this.checkpoints, (currPlayer) => {
            //currPlayer.spawnIndex += 1;
            //currPlayer.die();
            if (true) {
                console.log(((parseInt(this.scene.key[3])+1)%6));
                this.scene.start('L1_' + ((parseInt(this.scene.key[3])+1)%6), this.musicScene);
            }
        });
    }

    buildLevel(map, tileset) {

        // Décor

        this.add.image(0, 0, 'fond').setOrigin(0, 0).setScrollFactor(0);
        map.createLayer('pointilles', tileset);

        // Plateformes

        this.buildGamePlaformsFromMap(map, tileset);

        // Player & Object layers

        var _checkpoints = this.physics.add.group({ allowGravity: false, immovable: true });

        map.getObjectLayer('portals').objects.forEach(function (currCheck) { _checkpoints.create(currCheck.x, currCheck.y - 64, 'greenBlock').setOrigin(0); });

        this.checkpoints = _checkpoints;

        this.spawns = map.getObjectLayer('spawns').objects;

        this.player = new Chara(this, this.spawns[0].x-64, this.spawns[0].y-3*64 , 'miko').setOrigin(0, 0);
        console.log(this.spawns[0].x)
        // this.player.setSize(350, 896);
        // this.player.setScale(1 / 7);
        //this.player.die();

        this.buildCollisions();

        // Camera
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setFollowOffset(0, -128);
        cam.setBounds(64, 64, map.width * 64 - 128, map.height * 64 - 3 * 64, true, true, true); // Empêche de voir sous le sol notamment
        cam.setZoom(1.2);

        this.cameras.main.fadeIn(1000);


        // Touches utilisées
        this.cursors = this.input.keyboard.createCursorKeys(); // Flèches directionnelles 
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Touche espace 
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // this.musicScene.jukebox.start();
        this.musicScene.jukebox.tick(false);
    }

    standardUpdate(time,delta) {

        if (this.keyP.isDown) {
            console.log('pause');
            this.scene.run('PauseMenu');
            this.scene.bringToTop('PauseMenu');
            this.scene.pause();
            this.musicScene.scene.pause();
            this.musicScene.jukebox.currMusic.pause();
        }

        // Actions (cf chara.js)
        this.player.move(this.cursors, this.keySpace, undefined);
        this.player.jump(this.keySpace, undefined, time);
        this.player.animate(this.cursors,time);

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

    init(_musicScene) {
        this.musicScene = _musicScene;
        this.musicScene.jukebox.setLevelScene(this);
        this.musicScene.levelScene = this;
        console.log('Nouvelle scene : ' + this.scene.key);
    }

    update(time,delta) { }
}
