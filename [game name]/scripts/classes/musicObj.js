class MusicObj {

    constructor (_scene, key, beatLength = 16 , BPM = 115, next = null) {

        this.key = key ;
        this.beatLength = beatLength ;
        this.BPM = BPM ;
        this.sound = _scene.sound.add(key) ;


    }

    //Bfxr


    play() {
        this.sound.play() ; 
    }
}