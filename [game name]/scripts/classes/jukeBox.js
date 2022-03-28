class JukeBox {

    constructor (scene) {
        this.scene = scene
        this.timer ;
        this.music = this.scene.sound.add('angry100bpm') ;

        this.on = false ;
        this.beatCount = 0
    }

    start(key) {
        if ( key.isDown && this.on == false ) {
            this.on = true ;
            this.music.play() ;

            this.timer = this.scene.time.addEvent({delay : (1000*60)/100 , loop : true , callbackScope : this , callback : function(){
                console.log(this.beatCount) ;
                this.beatCount += 1 ;
                test.tick2(this.beatCount) ;
                if ( this.beatCount % 104 == 0 ) {
                    this.music.play() ;
                }
            }}) ;
        }
    }
}   