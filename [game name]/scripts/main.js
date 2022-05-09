/*##################################################################################################################################################
BOMONT Jérémy (Noé) - ETPA 2021-2022
[Game name], plateformer de fin de première année



##################################################################################################################################################*/
var g = 1500;

var config = {
    type: Phaser.AUTO,
    width: 1920 - 30,
    height: 1080,
    input: {
        gamepad: true
    },
    scene: [
        StartScreen,
        MusicAndData,
        L1_0,
        L1_1,
        L1_2,
        Level1,
        Gym
    ],
    audio: {
        disableWebAudio: false
    }
};

var game = new Phaser.Game(config);