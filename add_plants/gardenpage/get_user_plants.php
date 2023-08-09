<?php
header('Content-Type: application/json');

// Connect to the MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "auth_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Get the parameters from the URL
$username_param = $_GET['username'] ?? "Guest";
$garden_id_param = $_GET['garden_id'] ?? "DefaultUserId";

// Prepare the SQL statement
$stmt = $conn->prepare("SELECT id, username, common_name, box_index, image_url, garden_id FROM user_plants WHERE username = ? AND garden_id = ?");
$stmt->bind_param("si", $username_param, $garden_id_param);

// Execute the query
$stmt->execute();

// Bind the result variables
$stmt->bind_result($id, $username, $common_name, $box_index, $image_url, $garden_id);

// Fetch the results into an array
$plants = [];
while ($stmt->fetch()) {
    $plants[] = [
        'id' => $id,
        'username' => $username,
        'common_name' => $common_name,
        'box_index' => $box_index,
        'image_url' => $image_url,
        'garden_id' => $garden_id
    ];
}

// Close the connection
$stmt->close();
$conn->close();

// Return the results as JSON
echo json_encode($plants);
?>
