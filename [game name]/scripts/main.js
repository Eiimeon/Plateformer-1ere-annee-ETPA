
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
    width : 1920 -30  ,
    height : 1080,
    input: {
        gamepad: true
    },
    scene :[
        StartScreen ,
        Level1
    ],
    audio: {
        disableWebAudio: false
    }
} ;

var game = new Phaser.Game(config);



