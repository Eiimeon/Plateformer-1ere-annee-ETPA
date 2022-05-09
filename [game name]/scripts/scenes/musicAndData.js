class MusicAndData extends Phaser.Scene {
    constructor() {
        super({
            key: 'MusicAndData',
        })
    }

    preload() { }

    create() {
        
        this.jukebox = new JukeBox(this,null);
        this.scene.run('L1_0',this);
    }

    update() {
        this.jukebox.start();
    }
}   