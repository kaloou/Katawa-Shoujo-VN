<?php
// je teste des trucs TQT
    session_start();
    include_once('connexion.php');
    header('Content-Type: text/plain; charset=utf-8');
    $DEBUG = false;

    try {
        $regex_password = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-._!\"'@#$%^&*(){}[\]\/\\\\?~:;+=|]).{8,25}$/u";
        $regex_username = "/^[a-zA-Z0-9]{3,15}$/";
        
        if($DEBUG) var_dump($_POST);

        if(isset($_POST["inp_submit"]) && $_POST["inp_submit"] === "Envoyer")
        {
            $response['submit'] = true;

            $usrname = htmlspecialchars(trim($_POST["inp_pseudo"]));
            $pswd = htmlspecialchars(trim($_POST["inp_pswd"]));

            if(preg_match($regex_username, $usrname) && preg_match($regex_password, $pswd)) 
            {
                $response['valid'] = true;

                $query = "SELECT * FROM users WHERE users.username = :usrname";
                $stmt = $pdo->prepare($query);
                $stmt->bindValue(':usrname', $usrname, PDO::PARAM_INT);
                $stmt->execute();

                $exist = $stmt->fetch(PDO::FETCH_ASSOC);

                if($exist["username"])
                {
                    if(password_verify($pswd, $exist["password"]))
                    {
                        $_SESSION["username"] = $usrname;
                        $response['connexion'] = 1;
                        //$response['username'] = $usrname;
                    }
                    else $response['connexion'] = 0;
                }
                else
                { 
                    $hash_pswd = password_hash($pswd, PASSWORD_DEFAULT);

                    $query = "INSERT INTO users VALUES (:usrname, :pswd)";
                    $stmt = $pdo->prepare($query);
                    $stmt->bindValue(':usrname', $usrname, PDO::PARAM_INT);
                    $stmt->bindValue(':pswd', $hash_pswd, PDO::PARAM_INT);
                    $stmt->execute();

                    $info = $stmt->fetch(PDO::FETCH_ASSOC);

                    $_SESSION["username"] = $usrname;
                    $response['connexion'] = 1;
                    //$response['username'] = $usrname;
                }
            }
            else $response['valid'] = false;
        }
        else $response['submit'] = false;

        $_SESSION["connexion_answer"] = $response;
        
        echo json_encode($response);

        //header("Location: ../test_connection.html");

    } catch (PDOException $e) {
        error_log('login.php -> PDOException: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
        exit;
}
?>