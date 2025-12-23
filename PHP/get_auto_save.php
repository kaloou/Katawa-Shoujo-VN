<?php
    session_start();
    include_once("connexion.php");
    header("Content-Type: text/plain; charset=utf-8");
    //$DEBUG = true;
    try 
    {
        if(isset($_SESSION["user_id"]))
        {
            $response["exist"] = true;
            $user_id = $_SESSION["user_id"];
            $query = "SELECT auto_save FROM users WHERE users.id_user = :user_id";
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
            $stmt->execute();

            $info = $stmt->fetch(PDO::FETCH_ASSOC);

            if($info)
            {
                $_SESSION["save_to_load"] = $info["auto_save"];
                //if($DEBUG) echo"<pre>";
                //if($DEBUG) var_dump($info["auto_save"]);
                //if($DEBUG) $str = "1|1|1|1|bg_op_snowywoods.png||0|0||0|Lullaby_of_Open_Eyes.mp3";
                $tab = explode("|", $info["auto_save"]); /*$str*/
                    
                //if($DEBUG) echo "<pre>";
                //if($DEBUG) var_dump($tab);

                //if($DEBUG) echo "<hr><br>";
                
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
                $response["found"] = true;
                //if($DEBUG) var_dump($_SESSION);
            }
            else $response["found"] = false;
        }
        else $response["exist"] = false;
        
        echo json_encode($response);
    } 
    catch (PDOException $e) 
    {
        error_log("get_auto_save.php -> PDOException: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["type" => "error", "message" => $e->getMessage()]);
        exit;
    }
?>