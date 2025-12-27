<?php
    session_start();
    include_once("connexion.php");
    header("Content-Type: text/plain; charset=utf-8");
    try 
    {
        if(isset($_SESSION["user_id"]))
        {
            $response["exist"] = true;
            $user_id = $_SESSION["user_id"];
            $query = "SELECT auto_save FROM users WHERE id_user = :user_id";
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
            $stmt->execute();

            $info = $stmt->fetch(PDO::FETCH_ASSOC);

            if($info)
            {
                $response["found"] = true;
                $_SESSION["to_save"] = unserialize($info["auto_save"]);

                if(isset($_SESSION["to_save"]["interpreter"])) {
                    $_SESSION["interpreter"]["ip"] = $_SESSION["to_save"]["interpreter"]["ip"];
                    $_SESSION["interpreter"]["last_qcm_choice"] = $_SESSION["to_save"]["interpreter"]["last_qcm_choice"];
                    $_SESSION["interpreter"]["scenes_viewed"] = $_SESSION["to_save"]["interpreter"]["scenes_viewed"];
                    $_SESSION["interpreter"]["variables"] = $_SESSION["to_save"]["interpreter"]["variables"];
                } else {
                    $_SESSION["interpreter"]["ip"] = 1;
                    $_SESSION["interpreter"]["last_qcm_choice"] = 0;
                    $_SESSION["interpreter"]["scenes_viewed"] = array();
                    $_SESSION["interpreter"]["variables"] = array();

                    $_SESSION["to_save"]["interpreter"]["ip"] = 1;
                    $_SESSION["to_save"]["interpreter"]["last_qcm_choice"] = 0;
                    $_SESSION["to_save"]["interpreter"]["scenes_viewed"] = array();
                    $_SESSION["to_save"]["interpreter"]["variables"] = array();
                }
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