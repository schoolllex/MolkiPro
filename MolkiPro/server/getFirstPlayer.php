<?php
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "trainingparty_infra";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT MIN(id) FROM game;";
$result = $conn->query($sql);
$globalId = intval(mysqli_fetch_assoc($result)["MIN(id)"]);
    
$sql = "SELECT nom from game WHERE id = '".$globalId."'";
$result = $conn->query($sql);
$result = mysqli_fetch_assoc($result);
$value = json_encode($result);
echo $value;
?>