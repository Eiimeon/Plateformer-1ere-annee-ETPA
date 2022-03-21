
/*##################################################################################################################################################
BOMONT Jérémy (Noé) - ETPA 2021-2022
[Game name], plateformer de din de première année

Partie 0 : Variables Globales et Preload
Partie 1 : Groupes et Parser
Partie 2 : Collisions
Partie 3 : Camera, Contrôles, et Textes
Partie 4 : Update

##################################################################################################################################################*/

var config = {
    type : Phaser.AUTO ,
    width : 1280  ,
    height : 640,
    physics: {  
        default: 'arcade',
        arcade: {
            gravity: { y : 1000 },
            debug: false
        }
    },
    scene : {
        preload : preload ,
        create : create ,
        update : update ,
    },
    audio: {
        disableWebAudio: false
    }
} ;

/*##################################################################################################################################################
Partie 0 Variables Globales et Preload
##################################################################################################################################################*/

var game = new Phaser.Game(config);
var player ;
var platforms ;
var test ;
var test2 ;
var timer ;
var beatCount = 0 ;


function preload (){
    this.load.image('bSquare', 'assets/images/bSquare.png') ;
    this.load.image('arm', 'assets/images/crashArm.png')
    this.load.image('crash', 'assets/images/crash.png') ;
    this.load.image('foe', 'assets/images/foe.png') ;
    this.load.image('bg', 'assets/images/sky.png') ;
    this.load.image('crate', 'assets/images/crate.png') ;
    this.load.image('peche', 'assets/images/peche.png') ;

    this.load.audio('120bpm', 'assets/musiques/120bpm.mp3')
}

/*##################################################################################################################################################
Partie 1 : Groupes et Parser
##################################################################################################################################################*/

function create() {

    //  Using the Scene Data Plugin we can store data on a Scene level
    this.data.set('beatCount', 0) ;
    this.data.set('bpm', 120) ;
    this.data.set('period', 1 / (this.data.values.bpm/(1000*60))) ; // Période musicale en ms
    console.log(this.data.values.period) ;


    // Différents groupes et vecteurs d'objets
    platforms = this.physics.add.staticGroup();
    test = new RythmPlat(this.physics.world,this) ;
    test2 = new RythmPlat(this.physics.world,this) ;
    


    // Ces images constituent le fond
    this.add.image(0,0,'bg').setOrigin(0,0) ;
    this.add.image(1280,0,'bg').setOrigin(0,0) ;
    this.add.image(1280*2,0,'bg').setOrigin(0,0) ;
    this.add.image(1280*3,0,'bg').setOrigin(0,0) ;
    this.add.image(1280*3+5*64,0,'bg').setOrigin(0,0) ;
    
    // Première version du niveau pour les tests
    // Rename en 'level' pour essayer'
    var level = [
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1]
    ] ;


    // Parser, crée à l'emplacement de chaque case l'objet correspondant au nombre, rien si 0
    for ( var i = 0 ; i < level.length ; i++ ) {
        for ( var j=0 ; j < level[i].length ; j++ ) {
            if ( level[i][j] == 1 ) {
                platforms.create(j*64,i*64,'bSquare').setOrigin(0,0).refreshBody() ;
            }
            if ( level[i][j] == 2 ) {
                test.create(j*64,i*64,'crate').setOrigin(0,0).refreshBody() ;
            }
        }
    }
    
    // Création du personnage joueur et ses bras après le niveau, pour être on top
    player = new Chara(this,64+32,64*8,'crash') ;


    var music = this.sound.add('120bpm') ;
    music.play() ;

    /*timer = this.time.addEvent({delay : 500 , loop : true , callback : function(){
        test.incBeat() ;
        if ( test.beatCount == 0 ) {
            music.play() ;
        }
    }}) ;*/

    timer = this.time.addEvent({delay : this.data.values.period , loop : true , callback : function(){
        beatCount += 1 ;
        test.tick2(beatCount) ;
        if ( beatCount % 8 == 0 ) {
            music.play() ;
        }
    }}) ;








/*##################################################################################################################################################
Partie 2 : Collisions
##################################################################################################################################################*/

    // Joueur avec le sol
    this.physics.add.collider(player, platforms,function(currPlayer) { 
        currPlayer.bumped = false ; // Gestion galère du reset du bumped, pourrait poser problème dans  (cf. Chara)
    },null,this);




    
    
    
/*##################################################################################################################################################
Partie 3 : Camera, contrôles, et textes
##################################################################################################################################################*/

    
    // Camera
    cam = this.cameras.main ;
    cam.startFollow(player) ;
    cam.setBounds(0,0,12800,640,true,true,true) ; // Empêche de voir sous le sol notamment
    cam.setZoom(1) ;


    // Touches utilisées
    cursors = this.input.keyboard.createCursorKeys(); // Flèches directionnelles 
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Touche espace 

    


    

}

/*##################################################################################################################################################
Partie 4 : Update
##################################################################################################################################################*/


function update() {
    // Actions (cf chara.js)
    player.move(cursors,keySpace) ;
    player.jump(cursors) ;

    //console.log(timer.getElapsed()) ;
}

