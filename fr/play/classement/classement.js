async function getDB(){
    return new Promise((resolve) =>{
        setTimeout(async () => {
            const response = await $.ajax({
                url: "http://192.168.1.33:5000/server/classement.php",
                method: "GET",
                dataType: "json",
            });
            console.log("Classement: ");
            console.log(response);
            resolve(response);
        }, 1000);
    });
    // const response = await $.ajax({
    //     url: "https://example.com/getFirstPlayer.php",
    //     method: "GET",
    //     dataType: "json",
    // });
    // console.log("GetFirstPlayer: ");
    // console.log(response);
    // return(response);
}


async function getLeaderboard() {
    console.log("Fetching leaderboard data...");

    const leaderboard = await getDB();
    console.log("Leaderboard: ", leaderboard);
    displayLeaderboard(leaderboard);
}

function displayLeaderboard(leaderboard) {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';

    leaderboard.forEach((player, index) => {
        const playerEntry = document.createElement('li');
        playerEntry.className = 'leaderboard-item';
        
        const rank = document.createElement('span');
        rank.className = 'rank';
        rank.textContent = `${index + 1}. `;
        
        const playerName = document.createElement('span');
        playerName.className = 'player-name';
        playerName.textContent = player.nom;
        
        const playerScore = document.createElement('span');
        playerScore.className = 'player-score';
        playerScore.textContent = `${player.score} pts`;

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        const progressBarInner = document.createElement('div');
        progressBarInner.className = 'progress-bar-inner';
        progressBarInner.style.width = `${player.score}%`;

        progressBar.appendChild(progressBarInner);

        playerEntry.appendChild(rank);
        playerEntry.appendChild(playerName);
        playerEntry.appendChild(playerScore);
        playerEntry.appendChild(progressBar);

        if (index === 0) {
            playerEntry.classList.add('new-entry');
        }

        leaderboardElement.appendChild(playerEntry);
    });
}

setInterval(getLeaderboard, 30000);

getLeaderboard();
