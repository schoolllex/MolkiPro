function showVictoryPopup(player) {
    document.getElementById('winnerText').textContent = player + ' a gagné la partie !';
    
    const popup = document.getElementById('victoryPopup');
    popup.classList.remove('hidden');

    const container = document.getElementById('fireworks');
    const fireworks = new Fireworks(container, {
        rocketsPoint: 50,
        speed: 2,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1.5,
        particles: 150,
        trace: 3,
        explosion: 6,
        autoresize: true,
        brightness: {
            min: 50,
            max: 80,
            decay: {
                min: 0.015,     
                max: 0.03
            }
        },
        boundaries: {
            top: 50,
            bottom: container.clientHeight,
            left: 0,
            right: container.clientWidth
        },
        sound: {
            enable: true,
            files: [
                'https://cdn.jsdelivr.net/npm/fireworks-js/sounds/explosion0.mp3',
                'https://cdn.jsdelivr.net/npm/fireworks-js/sounds/explosion1.mp3'
            ],
            volume: {
                min: 4,
                max: 8
            }
        },
        delay: {
            min: 30,
            max: 60
        }
    });
    
    fireworks.start();

    setTimeout(function () {
        popup.classList.add('hidden');
        fireworks.stop();

        setTimeout(() => {
            window.location.href = "../play/classement.html";
        }, 1000);
    }, 10000);
}



function showFallTo25Popup(player) {
    // Afficher le texte du joueur
    document.getElementById('fallText').textContent = player + ' retombe à 25 points !';
    
    // Afficher la popup
    const popup = document.getElementById('fallTo25Popup');
    popup.classList.remove('hidden');

    // Ajouter une animation de flash pour indiquer la chute
    setTimeout(() => {
        popup.classList.add('flash');
    }, 1000);

    // Masquer la popup après 3 secondes
    setTimeout(function () {
        popup.classList.add('hidden');
        popup.classList.remove('flash');
    }, 3000); // Popup visible pendant 3 secondes
}