class MusicAndData extends Phaser.Scene {
    constructor() {
        super({
            key: 'MusicAndData',
        })

    //this.jukebox = new JukeBox(this,undefined);
    }

    preload() { }

    create() {
        
        this.jukebox = new JukeBox(this,null);
        //this.jukebox.start();
        this.scene.run('Level1',this);
    }

    update() {
        this.jukebox.start();
    }
}   