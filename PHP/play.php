<?php
    session_start();
    try 
    {
        if(isset($_SESSION["user_id"]))
        {
            $response["connected"] = true;
            // ici include_once('save_to_session'); quand ce sera finit
            include_once('session_in_game.php');
        }
        else $response["connected"] = false;
        
        echo json_encode($response);
    } 
    catch (PDOException $e) 
    {
        error_log('play.php -> PDOException: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
        exit;
    }
?>