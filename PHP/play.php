<!-- 
            $_SESSION['to_save']['text']['char_name'] = $response['character_name'];
            $_SESSION['to_save']['text']['char_color'] = $response['character_color'];
            $_SESSION['to_save']['text']['content'] = $response['text'];
            $_SESSION['to_save']['text']['char_code'] = $response['character_code'];


            $_SESSION['to_save']['bg'] = $response['image_name'];


            $_SESSION['to_save']['sprite']['image_name'] = $response['image_name'];
            $_SESSION['to_save']['sprite']['width'] = $response['width'];
            $_SESSION['to_save']['sprite']['height'] = $response['height'];
            $_SESSION['to_save']['sprite']['image_tag'] = $response['image_tag'];
            $_SESSION['to_save']['sprite']['pos'] = $response['pos'];


            $_SESSION['to_save']['sprite'] = [];


            $_SESSION['to_save']['centered_text'] = $response['text'];


            $_SESSION['to_save']['music'] = $response['music_name'];
-->

<?php
    try 
    {
        if(isset($_SESSION["auto_save"]))
        {
            $response["exist"] = true;
            
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