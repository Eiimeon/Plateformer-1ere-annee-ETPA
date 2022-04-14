class JukeBox {

    constructor (scene) {
        this.scene = scene
        this.timer ;
        //this.music = this.scene.sound.add('angry100bpm') ;

        this.on = false ;
        this.beatCount = 1 ;

        // Construction des objets musicaux du niveau
        this._music = new Array ;
        this._music.push(new MusicObj(scene, 'HP8', 16)) ;
        this._music.push(new MusicObj(scene, 'HP4')) ;
        this._music.push(new MusicObj(scene, 'HP5')) ;
        this._music.push(new MusicObj(scene, 'HP6')) ;
        this._music.push(new MusicObj(scene, 'HP7')) ;
    
        this._sequence = [0,1,2,1,2,3,4,3,4,0] ;
        this.sequenceIndex = 0 ;
        

        this.currMusic = this._music[0] ;
        this.currMusicBeatCount = 1 ;
    }

    start(key) {
        if ( key.isDown && this.on == false ) {
            this.on = true ;
            console.log(this._music[0]) ;
            
            this.currMusic.play() ;

            // Main timer
            this.timer = this.scene.time.addEvent({delay : (1000*60)/115 , loop : true , callbackScope : this , callback : function(){
                //console.log(this.beatCount) ;
                beat1.tick3(this.beatCount) ;
                //beat1db.tick3(this.beatCount) ;
                beat2.tick3(this.beatCount) ;
                beat3.tick3(this.beatCount) ;
                beat4.tick3(this.beatCount) ;
                

                if ( this.currMusicBeatCount == this.currMusic.beatLength ) {
                    this.sequenceIndex += 1 ;
                    this.sequenceIndex = this.sequenceIndex % this._sequence.length ;
                    this.currMusic = this._music[this._sequence[this.sequenceIndex]] ;
                    this.currMusic.play() ;
                    this.currMusicBeatCount = 0 ;
                }

                this.beatCount += 1 ;
                this.currMusicBeatCount += 1 ;
                

            }}) ;
        }
    }
}   