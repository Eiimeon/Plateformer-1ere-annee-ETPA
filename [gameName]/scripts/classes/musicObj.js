class MusicObj {

    constructor(_scene, key, beatLength = 16, BPM = 115, next = null) {

        this.key = key;
        this.beatLength = beatLength;
        this.BPM = BPM;
        this.sound = _scene.sound.add(key);
        this.sound.setVolume(0.2);
    }

    //Bfxr

    play() {
        this.sound.play();
    }

    pause() {
        this.sound.pause();
    }

    resume() {
        this.sound.resume();
    }

    stop() {
        this.sound.stop();
    }
}