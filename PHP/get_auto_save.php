<?php
    session_start();
    include_once('connexion.php');
    header('Content-Type: text/plain; charset=utf-8');
    $DEBUG = false;

    try 
    {
        if(isset($_SESSION["user_id"]))
        {
            $response["exist"] = true;
            $user_id = $_SESSION["user_id"];
            $query = "SELECT auto_save FROM users WHERE users.id_user = :user_id";
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':user_id', $user_id, PDO::PARAM_STR);
            $stmt->execute();

            $info = $stmt->fetch(PDO::FETCH_ASSOC);

            if($info)
            {
                $_SESSION["save_to_load"] = $info["auto_save"];
                // plus tard, au lieu de faire ça ↑ ,
                // juste traduire les infos de $info["auto_save"] et mettre les données correspondantes dans $_SESSION["..."]
                $response["found"] = true;
            }
            else $response["found"] = false;
        }
        else $response["exist"] = false;
        
        echo json_encode($response);
    } 
    catch (PDOException $e) 
    {
        error_log('get_auto_save.php -> PDOException: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
        exit;
    }
?>