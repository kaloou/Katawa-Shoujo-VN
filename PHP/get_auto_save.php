<?php
    session_start();
    include_once("connexion.php");
    header("Content-Type: text/plain; charset=utf-8");
    //$DEBUG = true;
    try 
    {
        if(isset($_SESSION["user_id"]))
        {
            $response["exist"] = true;
            $user_id = $_SESSION["user_id"];
            $query = "SELECT auto_save FROM users WHERE users.id_user = :user_id";
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
            $stmt->execute();

            $info = $stmt->fetch(PDO::FETCH_ASSOC);

            if($info)
            {
                $response["found"] = true;
                $_SESSION["to_save"] = unserialize($info["auto_save"]);
            }
            else $response["found"] = false;
        }
        else $response["exist"] = false;
        
        echo json_encode($response);
    } 
    catch (Exception $e) 
    {
        error_log("get_auto_save.php -> Exception: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["type" => "error", "message" => $e->getMessage()]);
        exit;
    }
?>