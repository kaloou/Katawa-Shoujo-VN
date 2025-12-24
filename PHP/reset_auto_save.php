<?php
    session_start();
    include_once("connexion.php");
    header("Content-Type: text/plain; charset=utf-8");

    $DEBUG = false;
    $regex_save_title = "/^[-_ a-zA-Z0-9]{1,16}$/";
    try 
    {
        if(isset($_SESSION["user_id"]))
        {
            $response["connected"] = true;
            $user_id = $_SESSION["user_id"];
            $query = "UPDATE users SET auto_save = :default_save WHERE id_user = :user_id";
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(":default_save", $default_save, PDO::PARAM_STR);
            $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
            $stmt->execute();
        }
        else $response["connected"] = false;
        echo json_encode($response);
    }
    catch (Exception $e) 
    {
        error_log("save_game.php -> Exception: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["type" => "error", "message" => $e->getMessage()]);
        exit;
    }
?>