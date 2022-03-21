class RythmPlat extends Phaser.Physics.Arcade.StaticGroup {

    constructor (_world,_scene,_beatMap = [1,0]) {
        super (_world,_scene) ;

        _scene.add.existing(this) ;
        _scene.physics.add.existing(this) ;

        this.beatCount = 0 ;
        this.map = _beatMap ;

        this.setX(5*64) ;

        

    }

    incBeat () {
        this.beatCount += 1 ;
        this.beatCount = this.beatCount % this.map.length ;
        //console.log(this.beatCount) ; 
        this.tick() ;
    }


    tick () {
        //this.setX(this.map[this.beatCount] * 5*64 + (1 - this.map[this.beatCount]) * 64) ;

        this.incX((2*this.map[this.beatCount]-1)*4*64) ;
    }

    tick2 (BC) {

        var reducedBC = BC % this.map.length ;

        //this.setX(this.map[this.beatCount] * 5*64 + (1 - this.map[this.beatCount]) * 64) ;

        this.incX((2*this.map[reducedBC]-1)*4*64) ;
    }
}
