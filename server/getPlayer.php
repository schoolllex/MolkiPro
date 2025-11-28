<?php
header('Access-Control-Allow-Origin: *');
if(isset($_GET['player'])){
    $player = $_GET['player'];

    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "trainingparty_infra";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT id FROM game WHERE nom='".$player."';";
    $result = $conn->query($sql);

    $playerId = intval(mysqli_fetch_assoc($result)["id"]);
    $sql = "SELECT MAX(id) FROM game;";
    $result = $conn->query($sql);

    $globalId = intval(mysqli_fetch_assoc($result)["MAX(id)"]);
    

    $playerNewId = $playerId + 1;

    

    if ($playerNewId > $globalId) {
        $playerNewId = 1;
    }


    $sql = "SELECT nom from game WHERE id = '".$playerNewId."'";
    $result = $conn->query($sql);

    $result = mysqli_fetch_assoc($result);

    $value = json_encode($result);
    echo $value;
}
?>