
/*##################################################################################################################################################
BOMONT Jérémy (Noé) - ETPA 2021-2022
[Game name], plateformer de din de première année

Partie 0 : Variables Globales et Preload
Partie 1 : Groupes et Parser
Partie 2 : Collisions
Partie 3 : Camera, Contrôles, et Textes
Partie 4 : Update

##################################################################################################################################################*/
var g = 1500 ;

var config = {
    type : Phaser.AUTO ,
    width : 1280  ,
    height : 640,
    physics: {  
        default: 'arcade',
        arcade: {
            gravity: { y : g },
            //debug: true
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

var platB1 ;
var platB1db
var beat1 ;
var beat1db
var platB2 ;
var beat2 ;
var platB3 ;
var beat3 ;
var platB4 ;
var beat4 ;

var text ;


function preload (){

    this.load.tilemapTiledJSON('map','assets/images/map/proto.json') ;
    this.load.image('tileset','assets/images/map/tilesetProto.png')

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

    this.add.image(0,0,'tileset').setOrigin(0,0) ;

    const map = this.make.tilemap({key:'map'}) ;
    const tileset = map.addTilesetImage('tilesetProto','tileset') ;
    map.createLayer('sky',tileset) ;
    platforms = map.createLayer('platforms',tileset) ;
    console.log(platforms.body) ; // -> null
    
    platforms.setCollisionByExclusion(-1,true) ;
    console.log(platforms.body) ;

    deathBoxes = map.createLayer('deathBoxes',tileset) ;
    deathBoxes.setCollisionByExclusion(-1,true) ;

    player = new Chara(this,64+32,640,'crash').setOrigin(0,0) ;

    platB1 = map.createLayer('beat1',tileset) ;
    platB1.setCollisionByExclusion(-1,true) ;
    beat1 = new RythmMover (platB1,[1,0,0,0],player) ;
    platB1db = map.createLayer('beat1db',tileset) ;
    platB1db.setCollisionByExclusion(-1,true) ;
    beat1db = new RythmMover (platB1db,[1,0,0,0],player) ;

    platB2 = map.createLayer('beat2',tileset) ;
    platB2.setCollisionByExclusion(-1,true) ;
    beat2 = new RythmMover (platB2,[0,1,0,0],player) ;

    platB3 = map.createLayer('beat3',tileset) ;
    platB3.setCollisionByExclusion(-1,true) ;
    beat3 = new RythmMover (platB3,[0,0,1,0],player) ;

    platB4 = map.createLayer('beat4',tileset) ;
    platB4.setCollisionByExclusion(-1,true) ;
    beat4 = new RythmMover (platB4,[0,0,0,1],player) ;

    juke = new JukeBox(this) ;
    

    //  Using the Scene Data Plugin we can store data on a Scene level
    this.data.set('beatCount', 0) ;


    
   
    //peches.create(37*64,9*64,'peche').setOrigin(0,0).refreshBody() ;
    //player.setScale(0.25)


/*##################################################################################################################################################
Partie 2 : Collisions
##################################################################################################################################################*/
    
    // Joueur avec le sol
    this.physics.add.collider(player, platforms,function(currPlayer,currPlat) { 
        currPlayer.bumped = false ; // Gestion galère du reset du bumped, pourrait poser problème dans  (cf. Chara)
        //console.log('Plat x : ' + currPlat.x * 64) ;
        //console.log('Player x : ' + currPlayer.x) ;
        if ((currPlayer.x > currPlat.x * 64 + 16) && (currPlayer.x < currPlat.x*64 -16) && (currPlayer.y > currPlat.y * 64 + 16) && (currPlayer.y < currPlat.y*64 -16)) {
            currPlayer.die() ;
        }
    },null,this);

    
    this.physics.add.collider(player, deathBoxes, function() { 
        console.log('test')
        this.scene.restart() ;
    },null,this);

    
    this.physics.add.collider(player, platB1) ;
    this.physics.add.collider(player, platB1db, function(currPlayer) {
        currPlayer.die() ;
    }) ;
    this.physics.add.collider(player, platB2) ;
    this.physics.add.collider(player, platB3) ;
    this.physics.add.collider(player, platB4) ;

    /*

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

    */
  
    
/*##################################################################################################################################################
Partie 3 : Camera, contrôles, et textes
##################################################################################################################################################*/

    
    // Camera
    cam = this.cameras.main ;
    cam.startFollow(player) ;
    cam.setBounds(0,0,12800,640*2,true,true,true) ; // Empêche de voir sous le sol notamment
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

    /*if (this.input.gamepad.total === 0)
    {
        return;
    }*/

    var debug = [] ;
    var pads = this.input.gamepad.gamepads ;
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

