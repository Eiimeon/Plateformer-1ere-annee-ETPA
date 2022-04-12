
/*##################################################################################################################################################
BOMONT Jérémy (Noé) - ETPA 2021-2022
[Game name], plateformer de din de première année

Partie 0 : Variables Globales et Preload
Partie 1 : Groupes et Parser
Partie 2 : Collisions
Partie 3 : Camera, Contrôles, et Textes
Partie 4 : Update

##################################################################################################################################################*/
var g = 1000 ;

var config = {
    type : Phaser.AUTO ,
    width : 1280  ,
    height : 640,
    physics: {  
        default: 'arcade',
        arcade: {
            gravity: { y : g },
            debug: true
        }
    },
    input: {
        gamepad: true
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
// var manager = new Phaser.WebAudioSoundManager(game) ;

var player ;
var platforms ;
var test ;
var juke ;
var deathBoxes ;
var peches ;

var text ;


function preload (){
    this.load.image('bSquare', 'assets/images/bSquare.png') ;
    this.load.image('arm', 'assets/images/crashArm.png')
    this.load.image('crash', 'assets/images/crash.png') ;
    this.load.image('foe', 'assets/images/foe.png') ;
    this.load.image('bg', 'assets/images/sky.png') ;
    this.load.image('crate', 'assets/images/crate.png') ;
    this.load.image('peche', 'assets/images/peche.png') ;
    this.load.image('testNet', 'assets/images/testNet.PNG') ;

    this.load.audio('120bpm', 'assets/musiques/120bpm.mp3') ;
    this.load.audio('angry100bpm', 'assets/musiques/angry3.wav') ;
    this.load.audio('HP4', 'assets/musiques/HP4.mp3')
    this.load.audio('HP5', 'assets/musiques/HP5.mp3')
    this.load.audio('HP6', 'assets/musiques/HP6.mp3')
    this.load.audio('HP7', 'assets/musiques/HP7.mp3')
    this.load.audio('HP8', 'assets/musiques/HP8.mp3')

}

/*##################################################################################################################################################
Partie 1 : Groupes et Parser
##################################################################################################################################################*/

function create() {

    

    //  Using the Scene Data Plugin we can store data on a Scene level
    this.data.set('beatCount', 0) ;


    // Différents groupes et vecteurs d'objets
    platforms = this.physics.add.staticGroup();
    peches = this.physics.add.staticGroup();
    deathBoxes = this.physics.add.staticGroup();
    //test = new RythmPlat(this.physics.world,this) ;
    juke = new JukeBox(this) ;

    beat1 = new Array() ;
    beat2 = new Array() ;
    beat3 = new Array() ;
    beat4 = new Array() ;

    

    // Ces images constituent le fond
    this.add.image(0,0,'bg').setOrigin(0,0) ;
    this.add.image(1280,0,'bg').setOrigin(0,0) ;
    this.add.image(1280*2,0,'bg').setOrigin(0,0) ;
    this.add.image(1280*3,0,'bg').setOrigin(0,0) ;
    this.add.image(1280*3+5*64,0,'bg').setOrigin(0,0) ;
    
    // Première version du niveau pour les tests
    // Rename en 'level' pour essayer'
    var level0 = [
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
        [1,2,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,2,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,1,1,1,1,1,1,1,5,5,5,5,1,1,1,1,1,5,5,5,5,5,5]
    ] ;

    var level = [
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,5,5,0,6,6,0,7,7,0,8,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,2,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,1,1,1,1,1,1,1,3,3,3,3,1,1,1,1,1,3,3,3,3,3,3]
    ] ;


    // Parser, crée à l'emplacement de chaque case l'objet correspondant au nombre, rien si 0
    for ( var i = 0 ; i < level.length ; i++ ) {
        for ( var j=0 ; j < level[i].length ; j++ ) {
            if ( level[i][j] == 1 ) {
                platforms.create(j*64,i*64,'bSquare').setOrigin(0,0).refreshBody() ;
            }
            if ( level[i][j] == 2 ) {
                //test.create(j*64,i*64,'crate',[1]).setOrigin(0,0).refreshBody() ;
            }
            if ( level[i][j] == 4 ) {
                peches.create(j*64,i*64,'peche').setOrigin(0,0).refreshBody() ;
            }
            if ( level[i][j] == 3 ) {
                deathBoxes.create(j*64,i*64,'crate').setOrigin(0,0).refreshBody() ;
            }
            if ( level[i][j] == 5 ) {
                beat1.push(new RythmPlat(this,j*64,i*64,'crate',[1,0,0,0]));
            }
            if ( level[i][j] == 6 ) {
                beat2.push(new RythmPlat(this,j*64,i*64,'crate',[0,1,0,0]));
            }
            if ( level[i][j] == 7 ) {
                beat3.push(new RythmPlat(this,j*64,i*64,'crate',[0,0,1,0]));
            }
            if ( level[i][j] == 8 ) {
                beat4.push(new RythmPlat(this,j*64,i*64,'crate',[0,0,0,1]));
            }
        }
    }
    
    // Création du personnage joueur et ses bras après le niveau, pour être on top
    player = new Chara(this,64+32,0,'crash') ;
    peches.create(37*64,9*64,'peche').setOrigin(0,0).refreshBody() ;
    //player.setScale(0.25)


/*##################################################################################################################################################
Partie 2 : Collisions
##################################################################################################################################################*/

    // Joueur avec le sol
    this.physics.add.collider(player, platforms,function(currPlayer) { 
        currPlayer.bumped = false ; // Gestion galère du reset du bumped, pourrait poser problème dans  (cf. Chara)
    },null,this);

    this.physics.add.overlap(player, deathBoxes, function() { 
        this.scene.restart() ;
    },null,this);

    this.physics.add.collider(player, beat1) ;
    this.physics.add.collider(player, beat2) ;
    this.physics.add.collider(player, beat3) ;
    this.physics.add.collider(player, beat4) ;



    // Ramasse les pêches
    this.physics.add.overlap(player, peches,function(currPlayer,currPeche) { 
        //currPeche.x = -64 ;
        //currPeche.refreshBody() ;
        console.log('150' - 50 ) ;
        currPlayer.jumpAllowed = false ; // Empeche de saute sur la hitbox de la pêche (cf chara.js)
        this.data.values.score += 1 ;
        if ( currPeche.x == 37*64 ) {
            currPeche.x = 5*64 ;
            currPeche.y = 6*64 ;
            currPeche.refreshBody() ;
        }
        else {
            currPeche.x = 37*64 ;
            currPeche.y = 9*64 ;
            currPeche.refreshBody() ;
        }
        
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
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
     

    // Affiche le score
    this.data.set('score', 0);
    score = this.add.text(100, 100, '', { font: '64px Courier', fill: '#00ff00' });
    score.setText([
        'Score: ' + this.data.get('score')
    ]);

    text = this.add.text(10, 30, '', { font: '16px Courier', fill: '#ffffff' });
}

/*##################################################################################################################################################
Partie 4 : Update
##################################################################################################################################################*/

function update() {

    if (this.input.gamepad.total === 0)
    {
        return;
    }

    var debug = [];
    var pads = this.input.gamepad.gamepads;
    // var pads = this.input.gamepad.getAll();
    // var pads = navigator.getGamepads();

    for (var i = 0; i < pads.length; i++)
    {
        var pad = pads[i];

        if (!pad)
        {
            continue;
        }

        //  Timestamp, index. ID
        debug.push(pad.id);
        debug.push('Index: ' + pad.index + ' Timestamp: ' + pad.timestamp);

        //  Buttons

        var buttons = '';

        for (var b = 0; b < pad.buttons.length; b++)
        {
            var button = pad.buttons[b];

            buttons = buttons.concat('B' + button.index + ': ' + button.value + '  ');
            // buttons = buttons.concat('B' + b + ': ' + button.value + '  ');

            if (b === 8)
            {
                debug.push(buttons);
                buttons = '';
            }
        }
        
        debug.push(buttons);

        //  Axis

        var axes = '';

        for (var a = 0; a < pad.axes.length; a++)
        {
            var axis = pad.axes[a];

            axes = axes.concat('A' + axis.index + ': ' + axis.getValue() + '  ');
            // axes = axes.concat('A' + a + ': ' + axis + '  ');

            if (a === 1)
            {
                debug.push(axes);
                axes = '';
            }
        }
        
        debug.push(axes);
        debug.push('');
    }
    
    text.setText(debug);


    // Actions (cf chara.js)
    player.move(cursors,keySpace,pads[0]) ;
    player.jump(keySpace,pads[0]) ;
    player.dash(keyE,cursors,pads[0]) ;

    player.restoreAbilities() ;

    if ( keyE.isDown ) {
        //console.log('['+player.x+','+player.y+']') ;
        //console.log('['+player.body.velocity.x+','+player.body.velocity.y+']') ;
        console.log('['+player.body.velocity.y+']') ;
    }

    //console.log(timer.getElapsed()) ;

    juke.start(keyA) ;

    //Maintient de l'affichage du score à sa place et mise à jour du score
    /*
    text.x = cam.scrollX + 110 ;
    text.y = cam.scrollY + 50 ;
    text.setText([
        'Score: ' + this.data.get('score')
    ]);*/

}

