<?php
//if($DEBUG) session_start();
//if($DEBUG) include_once("connexion.php");
//if($DEBUG) header("Content-Type: text/plain; charset=utf-8");

    try 
    {
        //if($DEBUG) var_dump($_SESSION);
        if(isset($_SESSION["user_id"]))
        {
            //if($DEBUG) echo "avant_sql\n";
            $user_id = $_SESSION["user_id"];
            //if($DEBUG) echo "user=session\n";
            $query = "SELECT * FROM saves WHERE saves.user_id = :user_id";
            $stmt = $pdo->prepare($query);
            //if($DEBUG) echo "prepare\n";
            $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
            //if($DEBUG) echo "bindValue\n";
            $stmt->execute();
            //if($DEBUG) echo "exe\n";

            $info = $stmt->fetch(PDO::FETCH_ASSOC);
            //if($DEBUG) echo "apres_sql\n";


            if(!$info)
            {
                $default_title = "Nouvelle partie";
                
                $query = "INSERT INTO saves (user_id, title, init_date, content) VALUES (:user_id, :title, :init_date, :content)";
                $stmt = $pdo->prepare($query);
                $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
                $stmt->bindValue(":title", $default_title, PDO::PARAM_STR);
                $stmt->bindValue(":content", $default_save, PDO::PARAM_STR);
                $stmt->bindValue(":init_date", time(), PDO::PARAM_INT);
                // ça ne sert à rien de bindValue la date
                for($i=0 ; $i < 5 ; $i++)   
                {
                    //if($DEBUG) echo "creer $i\n";
                    $stmt->execute();
                }
            }
        }
    } 
    catch (PDOException $e) 
    {
        error_log("create_saves.php -> PDOException: " . $e->getMessage());
        http_response_code(500);
        exit;
    }
?>