class Level1 extends Phaser.Scene {

    constructor() {
        super({
            key : 'Level1',
            physics: {  
                default: 'arcade',
                arcade: {
                    gravity: { y : 1500 },
                    //debug: true
                }
            }
        })
        this.player ;
        this.platforms ;
        this.juke ;
        this.deathBoxes ;
        this.spawns = [[64+32,640*3 + 320]] ;

        // 4 beat plats
        this.platB1 ;
        this.platB1db ;
        this.beat1 ;
        this.beat1db
        this.platB2 ;
        this.beat2 ;
        this.platB3 ;
        this.beat3 ;
        this.platB4 ;
        this.beat4 ;

        // 8Beats plats
        this.p81 , this.b81 ;
        this.p82 , this.b82 ;
        this.p83 , this.b83 ;
        this.p84 , this.b84 ;
        this.p85 , this.b85 ;
        this.p86 , this.b86 ;
        this.p87 , this.b87 ;
        this.p88 , this.b88 ;

        this.text ;
    }

    /*##################################################################################################################################################
Partie 0 Variables Globales et Preload
##################################################################################################################################################*/



    preload (){
    }

/*##################################################################################################################################################
Partie 1 : Groupes et Parser
##################################################################################################################################################*/

    create() {

        this.add.image(0,0,'tileset').setOrigin(0,0) ;

        const map = this.make.tilemap({key:'map'}) ;
        const tileset = map.addTilesetImage('tilesetProto','tileset') ;

        map.createLayer('sky',tileset) ;
        map.createLayer('pointilles',tileset) ;
        this.platforms = map.createLayer('platforms',tileset) ;
        console.log(this.platforms.body) ; // -> null
        
        this.platforms.setCollisionByExclusion(-1,true) ;
        console.log(this.platforms.body) ;

        this.deathBoxes = map.createLayer('deathBoxes',tileset) ;
        this.deathBoxes.setCollisionByExclusion(-1,true) ;

        //player = new Chara(this,64+32,640*4-256,'crash').setOrigin(0,0) ;
        this.player = new Chara(this,this.spawns[0][0],this.spawns[0][1],'miko').setOrigin(0,0) ;
        this.player.setSize(350,896 ) ;
        this.player.setScale(1/7) ;
        

        this.platB1 = map.createLayer('4beats/beat1',tileset) ;
        this.platB1.setCollisionByExclusion(-1,true) ;
        this.beat1 = new RythmMover (this.platB1,[1,0,0,0],this.player) ;
        /*platB1db = map.createLayer('4beats/beat1db',tileset) ;
        platB1db.setCollisionByExclusion(-1,true) ;
        beat1db = new RythmMover (platB1db,[1,0,0,0],player) ;*/

        this.platB2 = map.createLayer('4beats/beat2',tileset) ;
        this.platB2.setCollisionByExclusion(-1,true) ;
        this.beat2 = new RythmMover (this.platB2,[0,1,0,0],this.player) ;

        this.platB3 = map.createLayer('4beats/beat3',tileset) ;
        this.platB3.setCollisionByExclusion(-1,true) ;
        this.beat3 = new RythmMover (this.platB3,[0,0,1,0],this.player) ;

        this.platB4 = map.createLayer('4beats/beat4',tileset) ;
        this.platB4.setCollisionByExclusion(-1,true) ;
        this.beat4 = new RythmMover (this.platB4,[0,0,0,1],this.player) ;


        this.p81 = map.createLayer('8beats/beat81',tileset) ;
        this.p81.setCollisionByExclusion(-1,true) ;
        this.b81 = new RythmMover(this.p81,[1,0,0,0,0,0,0,0],this.player) ;

        this.p82 = map.createLayer('8beats/beat82',tileset) ;
        this.p82.setCollisionByExclusion(-1,true) ;
        this.b82 = new RythmMover(this.p82,[0,1,0,0,0,0,0,0],this.player) ;

        this.p83 = map.createLayer('8beats/beat83',tileset) ;
        this.p83.setCollisionByExclusion(-1,true) ;
        this.b83 = new RythmMover(this.p83,[0,0,1,0,0,0,0,0],this.player) ;

        this.p84 = map.createLayer('8beats/beat84',tileset) ;
        this.p84.setCollisionByExclusion(-1,true) ;
        this.b84 = new RythmMover(this.p84,[0,0,0,1,0,0,0,0],this.player) ;

        this.p85 = map.createLayer('8beats/beat85',tileset) ;
        this.p85.setCollisionByExclusion(-1,true) ;
        this.b85 = new RythmMover(this.p85,[0,0,0,0,1,0,0,0],this.player) ;

        this.p86 = map.createLayer('8beats/beat86',tileset) ;
        this.p86.setCollisionByExclusion(-1,true) ;
        this.b86 = new RythmMover(this.p86,[0,0,0,0,0,1,0,0],this.player) ;

        this.p87 = map.createLayer('8beats/beat87',tileset) ;
        this.p87.setCollisionByExclusion(-1,true) ;
        this.b87 = new RythmMover(this.p87,[0,0,0,0,0,0,1,0],this.player) ;

        this.p88 = map.createLayer('8beats/beat88',tileset) ;
        this.p88.setCollisionByExclusion(-1,true) ;
        this.b88 = new RythmMover(this.p88,[0,0,0,0,0,0,0,1],this.player) ;


        this.juke = new JukeBox(this) ;
        
        

        //  Using the Scene Data Plugin we can store data on a Scene level
        this.data.set('beatCount', 0) ;


        
    
        //peches.create(37*64,9*64,'peche').setOrigin(0,0).refreshBody() ;
        //player.setScale(0.25)


    /*##################################################################################################################################################
    Partie 2 : Collisions
    ##################################################################################################################################################*/
        
        // Joueur avec le sol
        this.physics.add.collider(this.player, this.platforms,function(currPlayer,currPlat) { 
            currPlayer.bumped = false ; // Gestion galère du reset du bumped, pourrait poser problème dans  (cf. Chara)
            //console.log('Plat x : ' + currPlat.x * 64) ;
            //console.log('Player x : ' + currPlayer.x) ;
            if ((currPlayer.x > currPlat.x * 64 + 16) && (currPlayer.x < currPlat.x*64 -16) && (currPlayer.y > currPlat.y * 64 + 16) && (currPlayer.y < currPlat.y*64 -16)) {
                currPlayer.die() ;
            }
        },null,this);

        
        this.physics.add.collider(this.player, this.deathBoxes, function(currPlayer) { 
            console.log('test')
            currPlayer.die() ;
        },null,this);

        
        this.physics.add.collider(this.player, this.platB1) ;
        this.physics.add.collider(this.player, this.platB1db, function(currPlayer) {
            currPlayer.die() ;
        }) ;
        this.physics.add.collider(this.player, this.platB2) ;
        this.physics.add.collider(this.player, this.platB3) ;
        this.physics.add.collider(this.player, this.platB4) ;


        this.physics.add.collider(this.player, this.p81) ;
        this.physics.add.collider(this.player, this.p82) ;
        this.physics.add.collider(this.player, this.p83) ;
        this.physics.add.collider(this.player, this.p84) ;
        this.physics.add.collider(this.player, this.p85) ;
        this.physics.add.collider(this.player, this.p86) ;
        this.physics.add.collider(this.player, this.p87) ;
        this.physics.add.collider(this.player, this.p88) ;


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
        var cam = this.cameras.main ;
        cam.startFollow(this.player) ;
        cam.setFollowOffset(-32,-64) ;
        //cam.setBounds(0,0,12800,640*2,true,true,true) ; // Empêche de voir sous le sol notamment
        cam.setBounds(0,0,12800,640*4-64,true,true,true) ; // Empêche de voir sous le sol notamment
        cam.setZoom(1.2) ;


        // Touches utilisées
        this.cursors = this.input.keyboard.createCursorKeys(); // Flèches directionnelles 
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Touche espace 
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        

        // Affiche le score
        /*this.data.set('score', 0);
        score = this.add.text(100, 100, '', { font: '64px Courier', fill: '#00ff00' });
        score.setText([
            'Score: ' + this.data.get('score')
        ]);

        text = this.add.text(10, 30, '', { font: '16px Courier', fill: '#ffffff' });
        */

        this.time.addEvent({delay : 300 , callbackScope : this , callback : function(){this.juke.start(this.keyA) ;}}) ;
    }

/*##################################################################################################################################################
Partie 4 : Update
##################################################################################################################################################*/

    update(time) {

        /*if (this.input.gamepad.total === 0)
        {
            return;
        }*/

        /*var debug = [] ;
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
        
        text.setText(debug);*/


        // Actions (cf chara.js)
        this.player.move(this.cursors,this.keySpace,undefined) ;
        this.player.jump(this.keySpace,undefined) ;
        this.player.dash(this.keyE,this.cursors,undefined) ;
        this.player.animate(this.cursors) ;

        this.player.restoreAbilities() ;

        /*

        if ( keyE.isDown ) {
            //console.log('['+player.x+','+player.y+']') ;
            //console.log('['+player.body.velocity.x+','+player.body.velocity.y+']') ;
            console.log('['+player.body.velocity.y+']') ;
        }

        //console.log(timer.getElapsed()) ;
        //console.log(time) ;
        console.log(player.x)
        if (juke.on && (player.y > 5*64 || player.x < 4*640-64)) {
            if ( Math.floor(juke.oneSec.getElapsed()) != 1000 ) {
                console.log(juke.globalTime+ '.' + Math.floor(juke.oneSec.getElapsed())) ;
            }
        }
        */


        

        //Maintient de l'affichage du score à sa place et mise à jour du score
        /*
        text.x = cam.scrollX + 110 ;
        text.y = cam.scrollY + 50 ;
        text.setText([
            'Score: ' + this.data.get('score')
        ]);*/

    }

}
