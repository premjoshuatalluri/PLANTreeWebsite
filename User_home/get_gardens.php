<?php
include 'db_connect.php';

$userName = $_GET['username'];
$sql = "SELECT id, garden_name FROM user_gardens WHERE username=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userName);
$stmt->execute();
$result = $stmt->get_result();

$gardens = [];
while ($row = $result->fetch_assoc()) {
    $gardens[] = ['garden_name' => $row['garden_name'], 'garden_id' => $row['id']];
}

echo json_encode($gardens);

$stmt->close();
$conn->close();
?>
