class JukeBox {

    constructor(scene) {
        this.scene = scene
        this.timer;
        this.oneSec;
        this.globalTime = 0;
        //this.music = this.scene.sound.add('angry100bpm') ;

        this.on = false;
        this.beatCount = 1;

        // Construction des objets musicaux du niveau
        this._music = new Array;
        this._music.push(new MusicObj(scene, 'HP8', 16));
        this._music.push(new MusicObj(scene, 'HP4'));
        this._music.push(new MusicObj(scene, 'HP5'));
        this._music.push(new MusicObj(scene, 'HP6'));
        this._music.push(new MusicObj(scene, 'HP7'));

        this._sequence = [0, 1, 2, 1, 2, 3, 4, 3, 4, 0];
        this.sequenceIndex = 0;


        this.currMusic = this._music[0];
        this.currMusicBeatCount = 1;
    }

    start(key) {
        if (this.on == false) {
            this.on = true;
            //console.log(this._music[0]) ;

            this.currMusic.play();

            this.oneSec = this.scene.time.addEvent({
                delay: 1000, loop: true, callbackScope: this, callback: function () {
                    this.globalTime += 1;
                }
            });

            // Main timer
            this.timer = this.scene.time.addEvent({
                delay: (1000 * 60) / 115, loop: true, callbackScope: this, callback: function () {
                    //console.log(this.beatCount) ;
                    this.scene.beat1.tick3(this.beatCount);
                    //beat1db.tick3(this.beatCount) ;
                    this.scene.beat2.tick3(this.beatCount);
                    this.scene.beat3.tick3(this.beatCount);
                    this.scene.beat4.tick3(this.beatCount);

                    this.scene.b81.tick3(this.beatCount);
                    this.scene.b82.tick3(this.beatCount);
                    this.scene.b83.tick3(this.beatCount);
                    this.scene.b84.tick3(this.beatCount);
                    this.scene.b85.tick3(this.beatCount);
                    this.scene.b86.tick3(this.beatCount);
                    this.scene.b87.tick3(this.beatCount);
                    this.scene.b88.tick3(this.beatCount);

                    this.scene.p41overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })
                    this.scene.p42overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })
                    this.scene.p43overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })
                    this.scene.p44overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })


                    this.scene.p81overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })
                    this.scene.p82overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })
                    this.scene.p83overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })
                    this.scene.p84overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })
                    this.scene.p85overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })
                    this.scene.p86overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })
                    this.scene.p87overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })
                    this.scene.p88overlap.forEach(rythmPlat => {
                        rythmPlat.tick3(this.beatCount);
                    })

                    if (this.currMusicBeatCount == this.currMusic.beatLength) {
                        this.sequenceIndex += 1;
                        this.sequenceIndex = this.sequenceIndex % this._sequence.length;
                        this.currMusic = this._music[this._sequence[this.sequenceIndex]];
                        this.currMusic.play();
                        this.currMusicBeatCount = 0;
                    }

                    this.beatCount += 1;
                    this.currMusicBeatCount += 1;


                }
            });
        }
    }
}   