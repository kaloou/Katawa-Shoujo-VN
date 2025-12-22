<?php
    try 
    {
        //if($DEBUG) echo "\ndebut";
        if(isset($_SESSION["user_id"]))
        {
            $response['connected'] = true;
            if(isset($_SESSION["to_save"]))
            {
                $response['found'] = true;
                $response['to_load'] = $_SESSION["to_save"];
                $_SESSION["story"]["seqid"] = $_SESSION["to_save"]['rep']['seqid'];
                $_SESSION["seqtext"]["seqserial"] = --$_SESSION["to_save"]['rep']['seqserial'];
            }
            else $response['found'] = false;
        }
        else $response['connected'] = false;
    } 
    catch (PDOException $e) 
    {
        error_log('session_in_game.php -> PDOException: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
        exit;
    }


?>