<?php
header('Access-Control-Allow-Origin: *');
if(isset($_GET['player'])){
    if(isset($_GET['playerpoint'])){
        $player = $_GET['player'];
        $playerPoint = $_GET['playerpoint'];

        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "trainingparty_infra";

        $conn = new mysqli($servername, $username, $password, $dbname);


        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    
        $sql = "UPDATE game SET score = '".$playerPoint."' WHERE nom='".$player."';";
        $result = $conn->query($sql);

        $response = json_encode(["result" => "success"]);
        echo($response);
    }
}
$conn->close();
?>