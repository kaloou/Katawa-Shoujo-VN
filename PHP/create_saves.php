<?php
$DEBUG = false;
//session_start();
//include_once('connexion.php');
//header('Content-Type: text/plain; charset=utf-8');

    try 
    {
        //if($DEBUG) var_dump($_SESSION);
        if(isset($_SESSION["username"]))
        {
            //if($DEBUG) echo "avant_sql\n";
            $usrname = $_SESSION["username"];
            //if($DEBUG) echo "user=session\n";
            $query = "SELECT * FROM saves WHERE saves.user_id = :usrname";
            $stmt = $pdo->prepare($query);
            //if($DEBUG) echo "prepare\n";
            $stmt->bindValue(':usrname', $usrname, PDO::PARAM_STR);
            //if($DEBUG) echo "bindValue\n";
            $stmt->execute();
            //if($DEBUG) echo "exe\n";

            $info = $stmt->fetch(PDO::FETCH_ASSOC);
            //if($DEBUG) echo "apres_sql\n";


            if(!$info)
            {
                $default_title = "Vide";
                $default_content = "On vera après ce qu'on met dedans";
                
                $query = "INSERT INTO saves (user_id, title, init_date, content) VALUES (:user_id, :title, :init_date, :content)";
                $stmt = $pdo->prepare($query);
                $stmt->bindValue(':user_id', $usrname, PDO::PARAM_STR);
                $stmt->bindValue(':title', $default_title, PDO::PARAM_STR);
                $stmt->bindValue(':content', $default_content, PDO::PARAM_STR);

                for($i=0 ; $i < 5 ; $i++)
                {
                    //if($DEBUG) echo "creer $i\n";
                    $stmt->bindValue(':init_date', time(), PDO::PARAM_INT);
                    $stmt->execute();
                }
            }
        }
    } 
    catch (PDOException $e) 
    {
        error_log('create_saves.php -> PDOException: ' . $e->getMessage());
        http_response_code(500);
        exit;
    }
?>