/*##################################################################################################################################################
Classe : Personnage
##################################################################################################################################################*/
class Chara extends Phaser.Physics.Arcade.Sprite {

    constructor (_scene,_x=64,_y=64, _keyCache, arms) {
        super (_scene,_x,_y,_keyCache) ;

        _scene.add.existing(this) ;
        _scene.physics.add.existing(this) ;

        this.body.useDamping = true ;
        this.friction = 0.001 ;
        

        this.scene = _scene ;
        this.arms = arms ; // Le personnage a des bras, qui proviennent du main
        this.attackDelay = 0 ; // Utilisé dans attack pour la rendre plus visuelle
        this.bumped = false ; // Utilisé dans bump,  pour que le nuancier de saut n'affecte pas les rebonds
        this.jumpAllowed = true ; // Empêche de pouvoir sauter sur les pêches, false quand on touche un pêche, redevient vrai quand on touche le sol

        this.dashAllowed = true ;
        this.dashing = false ;

        this.runSpeed = 400 ;
        this.dashSpeed = 1000 ;
        this.dashDuration = 200 ;

        this._currSpeed = new Vector([0,0]) ;
    }

    // Déplacements gauche droite basiques
    move(cursors,keySpace,gamepad) {
        if ( gamepad != undefined ) {
            if ( !this.dashing ) {
                if ((cursors.left.isDown || gamepad.left) && this.body.velocity.x > -this.runSpeed) {
                    this.setVelocityX(-this.runSpeed);
                    if ( !keySpace.isDown ) { // Pour ne pas entrer en conflit avec l'animation d'attaque
                        this.flipX = true ;
                    }
                }
                else if ((cursors.right.isDown || gamepad.right) && this.body.velocity.x < this.runSpeed) {
                    this.setVelocityX(this.runSpeed);
                    if ( !keySpace.isDown ) { // Pour ne pas entrer en conflit avec l'animation d'attaque
                        this.flipX = false ;
                    }
                }
                else if ( (!cursors.left.isDown && !cursors.right.isDown) && (!gamepad.left && !gamepad.right) && this.body.onFloor()) {
                    this.setVelocityX(0);
                    //this.setDragX(this.friction) ;
                }
            }
        }
        else {
            if ( !this.dashing ) {
                if ((cursors.left.isDown) && this.body.velocity.x > -this.runSpeed) {
                    this.setVelocityX(-this.runSpeed);
                    if ( !keySpace.isDown ) { // Pour ne pas entrer en conflit avec l'animation d'attaque
                        this.flipX = true ;
                    }
                }
                else if ((cursors.right.isDown) && this.body.velocity.x < this.runSpeed) {
                    this.setVelocityX(this.runSpeed);
                    if ( !keySpace.isDown ) { // Pour ne pas entrer en conflit avec l'animation d'attaque
                        this.flipX = false ;
                    }
                }
                else if ( (!cursors.left.isDown && !cursors.right.isDown) && this.body.onFloor()) {
                    this.setVelocityX(0);
                    //this.setDragX(this.friction) ;
                }
            }
        }
    }

    
    // Saut avec nuancier à la MeatBoy, et vitesse terminale pour mieux viser les sauts
    jump(keySpace,gamepad) {
        if ( gamepad != undefined ) {
            if ( this.dashAllowed ) {
                if ( this.body.onFloor() ) { // Si on touche le sol, on ré autorise le saut, et on est plus bumped
                    this.jumpAllowed = true ;
                    //this.bumped = false ; // fonctionne mal
                }
                if ((keySpace.isDown || gamepad.A) && this.body.touching.down && this.jumpAllowed == true) {
                    this.setVelocityY(-550) ;    
                }
                if ( !this.body.touching.down && !(keySpace.isDown || gamepad.A) && this.body.velocity.y < 0 && this.bumped == false) {
                    this.setVelocityY ( 0 ) ; // Si on est pas bumped et qu'on appuie pas sur haut, arrête de monter (nuancier MeatBoy)
                } 
    
                if (this.body.velocity.y > 300 ) { // Vitesse terminale
                    this.setVelocityY (500) ;
                }
            }
        }
        else {
            if ( this.dashAllowed ) {
                if ( this.body.onFloor() ) { // Si on touche le sol, on ré autorise le saut, et on est plus bumped
                    this.jumpAllowed = true ;
                    //this.bumped = false ; // fonctionne mal
                }
                if ((keySpace.isDown) && this.body.touching.down && this.jumpAllowed == true) {
                    this.setVelocityY(-550) ;    
                }
                if ( !this.body.touching.down && !(keySpace.isDown) && this.body.velocity.y < 0 && this.bumped == false) {
                    this.setVelocityY ( 0 ) ; // Si on est pas bumped et qu'on appuie pas sur haut, arrête de monter (nuancier MeatBoy)
                } 
    
                if (this.body.velocity.y > 300 ) { // Vitesse terminale
                    this.setVelocityY (500) ;
                }
            }
        }
    }

    dash(dashKey, cursors, gamepad) {
        if ( gamepad != undefined ) {
            if ( (dashKey.isDown || gamepad.B) && this.dashAllowed && !this.body.onFloor()) {
                // Préparation du vecteur vitesse du dash
                var _direction = new Phaser.Math.Vector2(0,0) ;
                if ( cursors.up.isDown || gamepad.up) {
                    _direction.add(new  Phaser.Math.Vector2(0,-1)) ;
                }
                if ( cursors.left.isDown || gamepad.left ) {
                    _direction.add(new  Phaser.Math.Vector2(-1,0)) ;
                }
                if ( cursors.down.isDown || gamepad.down ) {
                    _direction.add(new  Phaser.Math.Vector2(0,1)) ;
                }
                if ( cursors.right.isDown || gamepad.right ) {
                    _direction.add(new  Phaser.Math.Vector2(1,0)) ;
                }
                _direction.normalize() ; // ça marche
                
                _direction.scale(this.dashSpeed) ;
                //console.log(_direction.data) ;
                //console.log('Norme de la direction : ' + _direction.norm()) ;
                //console.log(_direction.norm() != 0)
                                                                    //this.setPosition(this.x + direction.data[0],this.y + direction.data[1]) ; //Blink
    
                // Partie Dash
                if ( _direction.x != 0 || _direction.y != 0 ) {
                    this.dashAllowed = false ;
                    //console.log('test') ;
                    
                    
                    this.dashing = true ;
                    this.body.setGravity(0,-g) ;
                    this.setVelocityX(_direction.x) ;
                    this.setVelocityY(_direction.y) ;
                    this.scene.time.addEvent({delay : this.dashDuration , callbackScope : this , callback : function(){
                        this.body.setGravity(0,0) ;
                        this.dashing = false ;
                        _direction.scale(1/this.dashSpeed) ;
                        console.log(_direction) ;
                        _direction.scale(450) ;
                        this.setVelocityX(_direction.x) ;
                        this.setVelocityY(_direction.y) ;
                        } 
                    }) ;
                }
            }
        }
        else {
            if ( (dashKey.isDown || gamepad.B) && this.dashAllowed && !this.body.onFloor()) {
                // Préparation du vecteur vitesse du dash
                var _direction = new Phaser.Math.Vector2(0,0) ;
                if ( cursors.up.isDown || gamepad.up) {
                    _direction.add(new  Phaser.Math.Vector2(0,-1)) ;
                }
                if ( cursors.left.isDown || gamepad.left ) {
                    _direction.add(new  Phaser.Math.Vector2(-1,0)) ;
                }
                if ( cursors.down.isDown || gamepad.down ) {
                    _direction.add(new  Phaser.Math.Vector2(0,1)) ;
                }
                if ( cursors.right.isDown || gamepad.right ) {
                    _direction.add(new  Phaser.Math.Vector2(1,0)) ;
                }
                _direction.normalize() ; // ça marche
                
                _direction.scale(this.dashSpeed) ;
                //console.log(_direction.data) ;
                //console.log('Norme de la direction : ' + _direction.norm()) ;
                //console.log(_direction.norm() != 0)
                                                                    //this.setPosition(this.x + direction.data[0],this.y + direction.data[1]) ; //Blink
    
                // Partie Dash
                if ( _direction.x != 0 || _direction.y != 0 ) {
                    this.dashAllowed = false ;
                    //console.log('test') ;
                    
                    
                    this.dashing = true ;
                    this.body.setGravity(0,-g) ;
                    this.setVelocityX(_direction.x) ;
                    this.setVelocityY(_direction.y) ;
                    this.scene.time.addEvent({delay : this.dashDuration , callbackScope : this , callback : function(){
                        this.body.setGravity(0,0) ;
                        this.dashing = false ;
                        _direction.scale(1/this.dashSpeed) ;
                        console.log(_direction) ;
                        _direction.scale(450) ;
                        this.setVelocityX(_direction.x) ;
                        this.setVelocityY(_direction.y) ;
                        } 
                    }) ;
                }
            }
            else {
                if ( (dashKey.isDown) && this.dashAllowed && !this.body.onFloor()) {
                    // Préparation du vecteur vitesse du dash
                    var _direction = new Phaser.Math.Vector2(0,0) ;
                    if ( cursors.up.isDown) {
                        _direction.add(new  Phaser.Math.Vector2(0,-1)) ;
                    }
                    if ( cursors.left.isDown) {
                        _direction.add(new  Phaser.Math.Vector2(-1,0)) ;
                    }
                    if ( cursors.down.isDown) {
                        _direction.add(new  Phaser.Math.Vector2(0,1)) ;
                    }
                    if ( cursors.right.isDown) {
                        _direction.add(new  Phaser.Math.Vector2(1,0)) ;
                    }
                    _direction.normalize() ; // ça marche
                    
                    _direction.scale(this.dashSpeed) ;
                    //console.log(_direction.data) ;
                    //console.log('Norme de la direction : ' + _direction.norm()) ;
                    //console.log(_direction.norm() != 0)
                                                                        //this.setPosition(this.x + direction.data[0],this.y + direction.data[1]) ; //Blink
        
                    // Partie Dash
                    if ( _direction.x != 0 || _direction.y != 0 ) {
                        this.dashAllowed = false ;
                        //console.log('test') ;
                        
                        
                        this.dashing = true ;
                        this.body.setGravity(0,-g) ;
                        this.setVelocityX(_direction.x) ;
                        this.setVelocityY(_direction.y) ;
                        this.scene.time.addEvent({delay : this.dashDuration , callbackScope : this , callback : function(){
                            this.body.setGravity(0,0) ;
                            this.dashing = false ;
                            _direction.scale(1/this.dashSpeed) ;
                            console.log(_direction) ;
                            _direction.scale(450) ;
                            this.setVelocityX(_direction.x) ;
                            this.setVelocityY(_direction.y) ;
                            } 
                        }) ;
                    }
                }
            }
        }
    }
    
    // Comme un saut, déclenché quand on saute sur un ennemi ou une caisse, désactive le nuancier jusqu'au prochain saut
    bump() {
        this.bumped = true ;
        this.setVelocityY(-550) ;
    }


    restoreAbilities() {
        if ( this.body.onFloor() ) { 
            this.jumpAllowed = true ;
            this.dashAllowed = true ;
        }
        this._currSpeed.data = [this.body.velocity.x,this.body.velocity.y] ;
        //console.log(this._currSpeed.data) ;
    }
}