<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: * ");
header("Access-Control-Allow-Methods: * ");
header("Content-Type: application/json");

include 'DbConnect.php';
$objDB = new DBConnect;
$conn = $objDB->connect();


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt =  $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt =  $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($users);
        break;
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO users(id, name, email, mobile, create_at) VALUES(NULL,:name, :email, :mobile,:create_at)";
        $stmt = $conn->prepare($sql);
        $create_at = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':create_at', $create_at);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Success'];
        } else {
            $response = ['status' => 0, 'message' => 'Unsuccess'];
        }
        break;
    case "PUT":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE users SET name = :name, email =:email, mobile=:mobile, updated_at =:updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Success'];
        } else {
            $response = ['status' => 0, 'message' => 'Unsuccess'];
        }
        break;
    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt =  $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);
        $stmt->execute();
        if ($stmt->execute()) {
            $conn->exec("ALTER TABLE users AUTO_INCREMENT = 1");
            $response = ['status' => 1, 'message' => 'Success'];
        } else {
            $response = ['status' => 0, 'message' => 'Unsuccess'];
        }
        echo json_encode($response);
        break;
}
