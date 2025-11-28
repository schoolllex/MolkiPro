
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

$sql = "SELECT * FROM game;";

$result = $conn->query($sql);

if ($result !== NULL) {
    $json = [];
    while ($row = $result->fetch_assoc()) {
        $json[] = ["nom" => $row['nom'], "PP"=> $row['PP'], "score" => $row['score']];
    }
    echo json_encode($json);
} else {
    echo json_encode(['status' => 'error', 'message' => $conn->error]);
}


$conn->close();
?>