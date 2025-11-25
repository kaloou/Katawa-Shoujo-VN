<?php
    session_start();
    include_once('connexion.php');
    header('Content-Type: text/plain; charset=utf-8');

    try 
    {
        $regex_password = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-._!\"'@#$%^&*(){}[\]\/\\\\?~:;+=|]).{8,25}$/u";
        $regex_username = "/^[-_a-zA-Z0-9]{3,15}$/";
        $default_save = "On vera";
        
        //if($DEBUG) var_dump($_POST);

        if(isset($_POST["inp_submit"]) && $_POST["inp_submit"] === "Envoyer")
        {
            $response['submit'] = true;
            //if($DEBUG) echo "submit\n";
            $usrname = htmlspecialchars(trim($_POST["inp_pseudo"]));
            $pswd = htmlspecialchars(trim($_POST["inp_pswd"]));

            if(preg_match($regex_username, $usrname) && preg_match($regex_password, $pswd)) 
            {
                $response['valid'] = true;
                //if($DEBUG) echo "valid\n";
                $query = "SELECT * FROM users WHERE users.username = :usrname";
                $stmt = $pdo->prepare($query);
                $stmt->bindValue(':usrname', $usrname, PDO::PARAM_STR);
                $stmt->execute();

                $exist = $stmt->fetch(PDO::FETCH_ASSOC);

                if($exist["id_user"])
                {
                    //if($DEBUG) echo "existe\n";
                    if(password_verify($pswd, $exist["password"]))
                    {
                        //if($DEBUG) echo "bon mdp\n";
                        $_SESSION["user_id"] = $exist["id_user"];
                        $response['connexion'] = 1;
                    }
                    else $response['connexion'] = 0;
                    //if($DEBUG) echo "mauvais mdp\n";
                }
                else
                { 
                    $hash_pswd = password_hash($pswd, PASSWORD_DEFAULT);
                    //if($DEBUG) echo "hash\n";
                    $query ="INSERT INTO users (username, password, auto_save) VALUES (:usrname, :pswd, :default_save) RETURNING id_user";
                    //if($DEBUG) echo "insert\n";
                    $stmt = $pdo->prepare($query);
                    $stmt->bindValue(':usrname', $usrname, PDO::PARAM_STR);
                    $stmt->bindValue(':pswd', $hash_pswd, PDO::PARAM_STR);
                    $stmt->bindValue(':default_save', $default_save, PDO::PARAM_STR);
                    $stmt->execute();

                    $user_id = $stmt->fetchColumn();
                    
                    $_SESSION["user_id"] = $user_id;
                    //if($DEBUG) echo "$user_id\n";
                    //if($DEBUG) echo "Session_user_id <-\n";
                    include_once('create_saves.php');
                    //if($DEBUG) echo "créer\n";
                    $response['connexion'] = 1;
                }
            }
            else $response['valid'] = false;
        }
        else $response['submit'] = false;

        $_SESSION["connexion_answer"] = $response;
        
        echo json_encode($response);

    } 
    catch (PDOException $e) 
    {
        error_log('login.php -> PDOException: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
        exit;
    }
?>