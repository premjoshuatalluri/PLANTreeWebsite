<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "auth_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user_username = $_GET['username'];
$garden_id = $_GET['garden_id'];

$sql = "SELECT common_name, box_index, image_url FROM user_plants WHERE username = ? AND garden_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $user_username, $garden_id);
$stmt->execute();
$result = $stmt->get_result();

$plants = [];
while($row = $result->fetch_assoc()) {
    $plants[] = $row;
}

echo json_encode(['data' => $plants]);

$stmt->close();
$conn->close();
?>
