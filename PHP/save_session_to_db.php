<?php
    session_start();
    include_once('connexion.php');
    header('Content-Type: text/plain; charset=utf-8');
    
    try 
    {
        if(isset($_SESSION["to_save"]))
        {
            $response["found"] = true;
            $l = "|";
            $to_auto_save = $_SESSION['to_save']['rep']['seqid'] . $l .
            $_SESSION['to_save']['rep']['seqserial'] . $l .
            $_SESSION['to_save']['rep']['type'] . $l .
            $_SESSION['to_save']['rep']['elid'] . $l .
            $_SESSION['to_save']['bg'] . $l .
            $_SESSION['to_save']['sprite']['image_name'] . $l .
            $_SESSION['to_save']['sprite']['width'] . $l .
            $_SESSION['to_save']['sprite']['height'] . $l .
            $_SESSION['to_save']['sprite']['image_tag'] . $l .
            $_SESSION['to_save']['sprite']['pos'] . $l .
            $_SESSION['to_save']['music'];

            if(isset($_SESSION["user_id"]))
            {
                $response["connected"] = true;
                $user_id = $_SESSION["user_id"];
                $query = "UPDATE users SET auto_save = :to_auto_save WHERE users.id_user = :user_id";
                $stmt = $pdo->prepare($query);
                $stmt->bindValue(':to_auto_save', $to_auto_save, PDO::PARAM_STR);
                $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
                $stmt->execute();
            }
            else $response["connected"] = false;
        }
        else $response["found"] = false;

        echo json_encode($response);
    } 
    catch (PDOException $e) 
    {
        error_log("save_to_session.php -> PDOException: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["type" => "error", "message" => $e->getMessage()]);
        exit;
    }
?>