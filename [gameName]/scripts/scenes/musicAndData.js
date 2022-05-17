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
        
        this.scene.run('L1_5',this);
        this.levelScene = this.scene.get('L1_5');

        this.jukebox = new JukeBox(this,this.levelScene);
        this.jukebox.start();
        
    }

    update() {

    }
}   