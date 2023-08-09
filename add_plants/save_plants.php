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

$common_name = $_POST['common_name'];
$box_index = $_POST['box_index'];
$user_username = $_POST['username']; 
$garden_id = $_POST['garden_id'];

$sql = "INSERT INTO user_plants (username, common_name, box_index, image_url, garden_id) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssisi", $user_username, $common_name, $box_index, $image_url, $garden_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
