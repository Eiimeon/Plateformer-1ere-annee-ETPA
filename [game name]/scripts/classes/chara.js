/*##################################################################################################################################################
Classe : Personnage
##################################################################################################################################################*/
class Chara extends Phaser.Physics.Arcade.Sprite {

    constructor (_scene,_x=64,_y=64, _keyCache, arms) {
        super (_scene,_x,_y,_keyCache) ;

        _scene.add.existing(this) ;
        _scene.physics.add.existing(this) ;
        this.arms = arms ; // Le personnage a des bras, qui proviennent du main
        this.attackDelay = 0 ; // Utilisé dans attack pour la rendre plus visuelle
        this.bumped = false ; // Utilisé dans bump,  pour que le nuancier de saut n'affecte pas les rebonds
        this.jumpAllowed = true ; // Empêche de pouvoir sauter sur les pêches, false quand on touche un pêche, redevient vrai quand on touche le sol
    }

    // Déplacements gauche droite basiques
    move(cursors,keySpace) {
        if (cursors.left.isDown) {
            this.setVelocityX(-260);
            if ( !keySpace.isDown ) { // Pour ne pas entrer en conflit avec l'animation d'attaque
                this.flipX = true ;
            }
        }
        else if (cursors.right.isDown) {
            this.setVelocityX(260);
            if ( !keySpace.isDown ) { // Pour ne pas entrer en conflit avec l'animation d'attaque
                this.flipX = false ;
            }
        }
        else {
            this.setVelocityX(0);
        }
    }

    
    // Saut avec nuancier à la MeatBoy, et vitesse terminale pour mieux viser les sauts
    jump(cursors) {

        if ( this.body.onFloor() ) { // Si on touche le sol, on ré autorise le saut, et on est plus bumped
            this.jumpAllowed = true ;
            //this.bumped = false ; // fonctionne mal
        }
        if (cursors.up.isDown && this.body.touching.down && this.jumpAllowed == true) {
            this.setVelocityY(-550) ;    
        }
        if ( !this.body.touching.down && !cursors.up.isDown && this.body.velocity.y < 0 && this.bumped == false) {
            this.setVelocityY ( 0 ) ; // Si on est pas bumped et qu'on appuie pas sur haut, arrête de monter (nuancier MeatBoy)
        } 

        if (this.body.velocity.y > 300 ) { // Vitesse terminale
            this.setVelocityY (300) ;
        }
    }
    
    // Comme un saut, déclenché quand on saute sur un ennemi ou une caisse, désactive le nuancier jusqu'au prochain saut
    bump() {
        this.bumped = true ;
        this.setVelocityY(-550) ;
    }

    // Déplace les bras autour de Crash, ils détruisent caisses et ennemis
    attack(keySpace) {
        if ( keySpace.isDown ) {
            this.attackDelay += 1 ;
            this.arms.setVelocityY(0) ; // Lutte contre la gravité
            this.arms.setXY(this.x-(32+64),this.y-64,128) ; // Place un bras à gauche et un bras à droite de Crash
            if (this.attackDelay%10 == 0 ) { // Annimation de flip périodique toutes les 10 frames
                player.flipX = (player.flipX - 1)**2 ; //tranforme true en false et réciproquement
            }
        }
        else { // Quand les bras ne sont pas utilisés il sont rangés en 0,0 
            this.arms.setVelocityY(0) ;
            this.arms.setXY(0,0) ;
        }
    }
}