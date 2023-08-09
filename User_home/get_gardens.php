<?php
include 'db_connect.php';

$userName = $_GET['username'];
$sql = "SELECT garden_name FROM user_gardens WHERE username=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userName);
$stmt->execute();
$result = $stmt->get_result();

$gardens = [];
while ($row = $result->fetch_assoc()) {
    $gardens[] = $row['garden_name'];
}

echo json_encode($gardens);

$stmt->close();
$conn->close();
?>
