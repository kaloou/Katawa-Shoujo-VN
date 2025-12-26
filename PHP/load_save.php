<?php
    session_start();
    header("Content-Type: text/plain; charset=utf-8");

    $DEBUG = false;
    try 
    {
        $input = (int)file_get_contents("php://input");
        if($input > -1 && $input < 5)
        {
            $response["valid"] = true;
            $to_load = $input;
            if(isset($_SESSION["user_id"]))
            {
                $response["connected"] = true;
                if(isset($_SESSION["saves"]))
                {
                    $response["found"] = true;
                    $_SESSION["to_save"] = unserialize($_SESSION["saves"][$to_load]["content"]);

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
            }
        }
        else $response["valid"] = false;
        echo json_encode($response);
    }
    catch (Exception $e) 
    {
        error_log("load_save.php -> Exception: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["type" => "error", "message" => $e->getMessage()]);
        exit;
    }
?>