<?php
    session_start();
    header("Content-Type: text/plain; charset=utf-8");
    //$DEBUG = false;

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
            }
            else $response["found"] = false;
        }
        else $response["connected"] = false;
        
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