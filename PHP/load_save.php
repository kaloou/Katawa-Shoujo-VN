<?php
    session_start();
    header("Content-Type: text/plain; charset=utf-8");

    $DEBUG = false;
    try 
    {
        $input = (int)file_get_contents("php://input");
        if(isset($input) && $input > -1 && $input < 5)
        {
            $response["valid"] = true;
            $to_load = $input;
            if(isset($_SESSION["user_id"]))
            {
                $response["connected"] = true;
                if(isset($_SESSION["saves"]))
                {
                    $response["found"] = true;
                    $tab = explode("|", $_SESSION["saves"][$to_load]["content"]);
                    
                    $_SESSION["to_save"]["rep"]["seqid"] = (int)$tab[0];
                    $_SESSION["to_save"]["rep"]["seqserial"] = (int)$tab[1];
                    $_SESSION["to_save"]["rep"]["type"] = (int)$tab[2];
                    $_SESSION["to_save"]["rep"]["elid"] = (int)$tab[3];

                    $_SESSION["to_save"]["bg"] = $tab[4];

                    $_SESSION["to_save"]["sprite"]["image_name"] = $tab[5];
                    $_SESSION["to_save"]["sprite"]["width"] = (int)$tab[6];
                    $_SESSION["to_save"]["sprite"]["height"] = (int)$tab[7];
                    $_SESSION["to_save"]["sprite"]["image_tag"] = $tab[8];
                    $_SESSION["to_save"]["sprite"]["pos"] = (int)$tab[9];

                    $_SESSION["to_save"]["music"] = $tab[10];
                }
            }
        }
        else $response["valid"] = false;
        echo json_encode($response);
    }
    catch (Exception $e) 
    {
        error_log("load_save.php -> PDOException: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["type" => "error", "message" => $e->getMessage()]);
        exit;
    }
?>