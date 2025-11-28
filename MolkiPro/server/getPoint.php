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

    $sql = "SELECT score FROM game WHERE nom = '".$player."';";
    $result = $conn->query($sql);


    $result = mysqli_fetch_assoc($result);

    $value = json_encode($result);
    echo $value;  
}
$conn->close();
?>