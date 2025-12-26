<?php
    session_start();
    include_once("connexion.php");
    header("Content-Type: text/plain; charset=utf-8");

    $DEBUG = false;
    $regex_save_title = "/^[-_ a-zA-Z0-9]{1,16}$/";
    try 
    {
        $input = file_get_contents("php://input");
        $parts = explode('|', $input, 2); // 2 = max 2 parts
        if (count($parts) !== 2) {
            http_response_code(400);
            echo json_encode(["valid" => false]);
            exit();
        }
        $n = (int)$parts[0];
        $save_title = trim($parts[1]);
        if($n > -1 && $n < 5 && preg_match($regex_save_title, $save_title))
        {
            $response["valid"] = true;
            $int_for_id = $n;
            if(isset($_SESSION["user_id"]))
            {
                $response["connected"] = true;
                if(isset($_SESSION["saves"]))
                {
                    $response["found"] = true;
                    $save_id = $_SESSION["saves"][$int_for_id]["id"];
                    $user_id = $_SESSION["user_id"];

                    if(isset($_SESSION["interpreter"])) {
                        $_SESSION["to_save"]["interpreter"]["ip"] = $_SESSION["interpreter"]["ip"];
                        $_SESSION["to_save"]["interpreter"]["last_qcm_choice"] = $_SESSION["interpreter"]["last_qcm_choice"];
                        $_SESSION["to_save"]["interpreter"]["scenes_viewed"] = $_SESSION["interpreter"]["scenes_viewed"];
                        $_SESSION["to_save"]["interpreter"]["variables"] = $_SESSION["interpreter"]["variables"];
                    }

                    $to_save = serialize($_SESSION["to_save"]);
                    $query = "UPDATE saves SET content = :to_save, title = :title, init_date = :init_date WHERE id = :save_id AND user_id = :user_id";
                    $stmt = $pdo->prepare($query);
                    $stmt->bindValue(":to_save", $to_save, PDO::PARAM_STR);
                    $stmt->bindValue(":title", $save_title, PDO::PARAM_STR);
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
        error_log("save_game.php -> Exception: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["type" => "error", "message" => $e->getMessage()]);
        exit;
    }
?>