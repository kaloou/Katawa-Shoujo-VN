<?php
    session_start();
    include_once("connexion.php");
    header("Content-Type: text/plain; charset=utf-8");
    
    try
    {
        if(isset($_SESSION["to_save"]))
        {
            $response["found"] = true;

            if(isset($_SESSION["interpreter"])) {
                $_SESSION["to_save"]["interpreter"]["ip"] = $_SESSION["interpreter"]["ip"];
                $_SESSION["to_save"]["interpreter"]["last_qcm_choice"] = $_SESSION["interpreter"]["last_qcm_choice"];
                $_SESSION["to_save"]["interpreter"]["scenes_viewed"] = $_SESSION["interpreter"]["scenes_viewed"];
                $_SESSION["to_save"]["interpreter"]["variables"] = $_SESSION["interpreter"]["variables"];
            }

            $to_auto_save = serialize($_SESSION["to_save"]);

            if(isset($_SESSION["user_id"]))
            {
                $response["connected"] = true;
                $user_id = $_SESSION["user_id"];
                $query = "UPDATE users SET auto_save = :to_auto_save WHERE users.id_user = :user_id";
                $stmt = $pdo->prepare($query);
                $stmt->bindValue(":to_auto_save", $to_auto_save, PDO::PARAM_STR);
                $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
                $stmt->execute();
            }
            else $response["connected"] = false;
        }
        else $response["found"] = false;

        echo json_encode($response);
    } 
    catch (Exception $e) 
    {
        error_log("save_to_session.php -> Exception: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["type" => "error", "message" => $e->getMessage()]);
        exit;
    }
?>