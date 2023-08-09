<?php
session_start();

$username = $_SESSION['username'];
$common_name = $_POST['common_name'];
$box_index = $_POST['box_index'];

$mysqli = new mysqli("localhost", "username", "password", "database");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$stmt = $mysqli->prepare("SELECT id FROM user_gardens WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$garden_id = $result->fetch_assoc()['id'];

$stmt->close();

$stmt = $mysqli->prepare("INSERT INTO garden_plants (garden_id, common_name, box_index) VALUES (?, ?, ?)");
$stmt->bind_param("isi", $garden_id, $common_name, $box_index);
$stmt->execute();

$stmt->close();
$mysqli->close();

echo json_encode(["success" => true]);
?>
