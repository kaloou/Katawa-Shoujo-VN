<?php
    session_start();
    header("Content-Type: text/plain; charset=utf-8");

    try 
    {
        if(isset($_SESSION["user_id"]))
        {
            $response["connected"] = true;
            if(isset($_SESSION["to_save"]))
            {
                $response["found"] = true;
                $response["to_load"] = $_SESSION["to_save"];
                $_SESSION["story"]["seqid"] = $_SESSION["to_save"]["rep"]["seqid"];
                $_SESSION["seqtext"]["seqserial"] = $_SESSION["to_save"]["rep"]["seqserial"];

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
        else $response["connected"] = false;
        
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