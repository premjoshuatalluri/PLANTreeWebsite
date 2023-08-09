<?php
include 'db_connect.php';

$gardenName = $_POST['garden_name'];
$userName = $_POST['username'];

// Check the current garden count
$query = "SELECT COUNT(*) as count FROM user_gardens WHERE username=?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $userName);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$currentGardenCount = $row['count'];
$stmt->close();

if ($currentGardenCount < 5) {
    $sql = "INSERT INTO user_gardens (username, garden_name) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $userName, $gardenName);

    if ($stmt->execute()) {
        echo "New garden added successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
} else {
    echo "Maximum garden count reached.";
}

$conn->close();
?>
