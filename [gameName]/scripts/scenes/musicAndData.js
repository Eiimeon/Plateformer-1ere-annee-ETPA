class MusicAndData extends Phaser.Scene {
    constructor() {
        super({
            key: 'MusicAndData',
        })
        this.seenCinematic1_5 = false ;
        this.playingCinematic1_5 = false ;

    }

    preload() { }

    create() {
        
        this.scene.run(STARTLEVELKEY,this);
        this.levelScene = this.scene.get(STARTLEVELKEY);

        this.jukebox = new JukeBox(this,this.levelScene);
        this.jukebox.start();
        
    }

    update() {

    }
}   