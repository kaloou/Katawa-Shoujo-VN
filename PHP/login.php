<?php
// je teste des trucs TQT
    session_start();
    include_once('connexion.php');
    header('Content-Type: text/plain; charset=utf-8');

    try {
        $regex_password = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-._!\"'@#$%^&*(){}[\]\/\\\\?~:;+=|]).{8,}$/";
        $regex_username = "/^[a-zA-Z0-9]{3,}$/";
        
        var_dump($_POST);
        if(isset($_POST["inp_submit"]) && $_POST["inp_submit"] === "Envoyer")
        {
            $response['submit'] = true;

            if(preg_match($regex_username, $_POST["inp_pseudo"]) && preg_match($regex_password, $_POST["inp_pswd"])) 
            {
                $response['valid'] = true;

                $usrname = $_POST["inp_pseudo"];

                $query = "SELECT * FROM users WHERE users.username = :usrname";
                $stmt = $pdo->prepare($query);
                $stmt->bindValue(':usrname', $usrname, PDO::PARAM_INT);
                $stmt->execute();

                $exist = $stmt->fetch(PDO::FETCH_ASSOC);

                if($exist["username"])
                {
                    if(password_verify($_POST["inp_pswd"], $exist["password"]))
                    {
                        $_SESSION["username"] = $usrname;
                        $response['connexion'] = "Connexion réussie";
                    }
                    else $response['connexion'] = "Mauvaises infos";
                }
                else
                { 
                    $hash_pswd = password_hash($_POST["inp_pswd"], PASSWORD_DEFAULT);

                    $query = "INSERT INTO users VALUES (:usrname, :pswd)";
                    $stmt = $pdo->prepare($query);
                    $stmt->bindValue(':usrname', $usrname, PDO::PARAM_INT);
                    $stmt->bindValue(':pswd', $hash_pswd, PDO::PARAM_INT);
                    $stmt->execute();

                    $info = $stmt->fetch(PDO::FETCH_ASSOC);

                    $_SESSION["username"] = $usrname;
                    $response['connexion'] = "Connexion réussie";
                }
                $response['username'] = $usrname;
            }
            else $response['valid'] = false;
        }
        else $response['submit'] = false;

        $_SESSION["connexion_answer"] = $response;
        var_dump($response);
        //header("Location: ../test_connection.html");

    } catch (PDOException $e) {
        error_log('login.php -> PDOException: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
        exit;
}
?>