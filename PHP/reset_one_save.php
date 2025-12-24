<?php
    session_start();
    include_once("connexion.php");
    header("Content-Type: text/plain; charset=utf-8");

    $DEBUG = false;
    $regex_save_title = "/^[-_ a-zA-Z0-9]{1,16}$/";
    try 
    {
        $input = (int)file_get_contents("php://input");
        if($input > -1 && $input < 5)
        {
            $response["valid"] = true;
            $int_for_id = $input;
            if(isset($_SESSION["user_id"]))
            {
                $response["connected"] = true;
                if(isset($_SESSION["saves"]))
                {
                    $response["found"] = true;
                    $save_id = $_SESSION["saves"][$int_for_id]["id"];
                    $user_id = $_SESSION["user_id"];
                    $query = "UPDATE saves SET content = :default_save, title = :title, init_date = :init_date WHERE saves.id = :save_id AND user_id = :user_id";
                    $stmt = $pdo->prepare($query);
                    $stmt->bindValue(":default_save", $default_save, PDO::PARAM_STR);
                    $stmt->bindValue(":title", "Nouvelle partie", PDO::PARAM_STR);
                    $stmt->bindValue(":init_date", time(), PDO::PARAM_INT);
                    // WHERE
                    $stmt->bindValue(":save_id", $save_id, PDO::PARAM_INT);
                    $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
                    $stmt->execute();
                }
                else $response["found"] = false;
            }
            else $response["connected"] = false;
        }
        else $response["valid"] = false;
        echo json_encode($response);
    }
    catch (Exception $e)
    {
        error_log("reset_one_save.php -> Exception: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["type" => "error", "message" => $e->getMessage()]);
        exit;
    }
?>