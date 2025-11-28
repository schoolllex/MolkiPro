async function getPlayer(player) {
    const response = await $.ajax({
        url: "http://192.168.1.33:5000/server/getPlayer.php?player=" + player,
        method: "GET",
        dataType: "json",
    });
    console.log("GetPlayer: ");
    console.log(response);
    console.log("After JSON Parse", response);
    console.log("Response.nom: ", response.nom);
    return response.nom;
}

async function nextPlayer(player){
    console.log("New Player Function Enter");
    let nextPlayerGame = await getPlayer(player);

    console.log("NextPlayerGame in NextPlayer()", nextPlayerGame);
    inputElement = document.getElementById("playerInput");
    textElement = document.getElementById("playerNameText");

    console.log("NextPlayerGame.nom: ", nextPlayerGame);

    inputElement.value = nextPlayerGame;
    textElement.textContent = nextPlayerGame;

    const checkbox = document.querySelectorAll("input[type='checkbox']");
    const checkedCheckBox = [];
    checkbox.forEach(function(checkbox, index){
        if(checkbox.checked){
            checkbox.checked=false;            
        }
    })
}

async function refreshDatabase(player, newPlayerPointDB) {
    try {
        const response = await $.ajax({
            url: "http://192.168.1.33:5000/server/refreshDB.php?player=" + player + "&playerpoint=" + newPlayerPointDB,
            method: "GET",
            dataType: "json",
        });
        console.log(response);
        await nextPlayer(player);
    } catch (error) {
        // alert("Erreur Requete Ajax: " + JSON.stringify(error));
        // alert("Erreur refreshDB")
    }
}


async function getPointFromPlayer(player) {
    console.log("getPointFromPlayer: ", player);
    try {
        const response = await $.ajax({
            url: "http://192.168.1.33:5000/server/getPoint.php?player=" + player,
            method: "GET",
            dataType: "json",
        });
        console.log("JSON PARSE: ", response.score);
        return response.score;
    } catch (error) {
        alert("Erreur Requete Ajax: " + JSON.stringify(error));
        alert("Erreur getPointFromPlayer");
        return 0;
    }
}

function finish(winner){
    localStorage.setItem('winner', winner);
    localStorage.setItem('win-notify', 'true');
    

    textElement = document.getElementById("gamefinisher");
    
    textElement.textContent = "Game Finish Winner: "+ winner;

    textElement = document.getElementById("show_classement");
    
    textElement.style = "";
}

function return25(player){
    localStorage.setItem('returner', player);
    localStorage.setItem('return-notify', 'true');
}

async function gameLoop(player, newPoint){
    console.log("GameLoop:")
    console.log(newPoint);
    let playerPoint = await getPointFromPlayer(player);
    console.log("Player Point: ", playerPoint);
    console.log("PlayerPoint Type:", typeof playerPoint);
    playerPoint = parseInt(playerPoint);
    console.log("PlayerPoint parseInt: ", playerPoint);
    let newPlayerPoint = playerPoint + newPoint;
    console.log("NewPlayerPoint :")
    console.log(newPlayerPoint);

    if(newPlayerPoint === 50){
        //game finish -> Win
        finish(player);
        newPlayerPoint = 50;
    }else if(newPlayerPoint > 50){
        //return to 25
        return25(player);
        newPlayerPoint = 25;
    }
    return newPlayerPoint;
}


async function pointCalcul(player, checkcheckbox){
    // console.log("Point calcul");
    // console.log(checkcheckbox);
    length = checkcheckbox.length;
    let newPlayerPointCalc;
    if(length === 1){
        newPlayerPointCalc = await gameLoop(player, checkcheckbox[0])
    }else{
        newPlayerPointCalc = await gameLoop(player, length);    
    }

    console.log("Return pointCalcul NewPlayerPointCalc (=1): ");
    console.log(newPlayerPointCalc);
    if(newPlayerPointCalc != undefined){
        await refreshDatabase(player, newPlayerPointCalc);   
    }
}


async function getFirstPlayer(){
    const response = await $.ajax({
        url: "http://192.168.1.33:5000/server/getFirstPlayer.php",
        method: "GET",
        dataType: "json",
    });
    console.log("GetFirstPlayer: ");
    console.log(response);

    inputElement = document.getElementById("playerInput");
    textElement = document.getElementById("playerNameText");

    inputElement.value = response["nom"];
    textElement.textContent = response["nom"];
}


