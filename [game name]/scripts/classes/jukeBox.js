class JukeBox {

    constructor(musicScene = null, levelScene = null) {
        this.musicScene = musicScene;
        this.levelScene = levelScene;
        this.timer;
        this.oneSec;
        this.globalTime = 0;
        //this.music = this.scene.sound.add('angry100bpm') ;

        this.on = false;
        this.beatCount = 1;

        // Construction des objets musicaux du niveau
        this._music = new Array();
        this._music.push(new MusicObj(musicScene, 'HP8', 16));
        this._music.push(new MusicObj(musicScene, 'HP4'));
        this._music.push(new MusicObj(musicScene, 'HP5'));
        this._music.push(new MusicObj(musicScene, 'HP6'));
        this._music.push(new MusicObj(musicScene, 'HP7'));

        this._sequence = [0, 1, 2, 1, 2, 3, 4, 3, 4, 0];
        this.sequenceIndex = 0;


        this.currMusic = this._music[0];
        this.currMusicBeatCount = 1;
    }

    setMusicScene(musicScene) {
        this.musicScene = musicScene;
    }

    setLevelScene(levelScene) {
        this.levelScene = levelScene;
    }

    start(key) {
        if (this.on == false && this.levelScene != null) {
            this.on = true;
            //console.log(this._music[0]) ;

            this.currMusic.play();

            //préparation de l'igt
            this.oneSec = this.musicScene.time.addEvent({
                delay: 1000, loop: true, callbackScope: this, callback: function () {
                    this.globalTime += 1;
                }
            });

            // Main timer
            this.timer = this.musicScene.time.addEvent({
                delay: (1000 * 60) / 115, loop: true, callbackScope: this, callback: function () {
                    //console.log('test');

                    for (let i = 0; i < 4; i++) {
                        this.levelScene.p4[i].tick3(this.beatCount);
                    }

                    for (let i = 0; i < 4; i++) {
                        this.levelScene.db4[i].tick3(this.beatCount);
                    }

                    for (let i = 0; i < 8; i++) {
                        this.levelScene.p8[i].tick3(this.beatCount);
                    }

                    for (let i = 0; i < 8; i++) {
                        this.levelScene.db8[i].tick3(this.beatCount);
                    }

                    this.levelScene.p4overlap.forEach(layer => {
                        layer.forEach(rythmPlat => {
                            rythmPlat.tick3(this.beatCount);
                        })
                    })

                    this.levelScene.db4overlap.forEach(layer => {
                        layer.forEach(rythmPlat => {
                            rythmPlat.tick3(this.beatCount);
                        })
                    })

                    this.levelScene.p8overlap.forEach(layer => {
                        layer.forEach(rythmPlat => {
                            rythmPlat.tick3(this.beatCount);
                        })
                    })

                    this.levelScene.db8overlap.forEach(layer => {
                        layer.forEach(rythmPlat => {
                            rythmPlat.tick3(this.beatCount);
                        })
                    })

                    if (this.currMusicBeatCount == this.currMusic.beatLength) {
                        this.sequenceIndex += 1;
                        this.sequenceIndex = this.sequenceIndex % this._sequence.length;
                        this.currMusic = this._music[this._sequence[this.sequenceIndex]];
                        this.currMusic.play();
                        this.currMusicBeatCount = 0;
                    }

                    try { this.levelScene.denial.denialTick(this.beatCount); }
                    catch (error) { /*console.log(error);*/}


                    this.beatCount += 1;
                    this.currMusicBeatCount += 1;
                }
            });
        }
    }
}   