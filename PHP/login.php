<?php
// je teste des trucs TQT
    session_start();
    include_once('connexion.php');
    header('Content-Type: text/plain; charset=utf-8');

    try {
        $regex_password = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-._!\"'@#$%^&*(){}[\]\/\\\\?~:;+=|]).{8,}$/";
        $regex_username = "/^[a-zA-Z0-9]{3,}$/";
        echo "avant le isset\n";
        var_dump($_POST);
        if(isset($_POST["inp_submit"]) && $_POST["inp_submit"] == "Envoyer")
        {
            echo "ça test\n";

            if(preg_match($regex_username, $_POST["inp_pseudo"]) && preg_match($regex_password, $_POST["inp_pswd"])) 
            {
                echo "ça respecte les conditions\n";

                $usrname = $_POST["inp_pseudo"];

                $query = "SELECT * FROM users WHERE users.username = :usrname";
                echo "query\n";
                $stmt = $pdo->prepare($query);
                echo "prepare\n";
                $stmt->bindValue(':usrname', $usrname, PDO::PARAM_INT);
                echo "bindVal\n";
                $stmt->execute();
                echo "exe\n";

                $exist = $stmt->fetch(PDO::FETCH_ASSOC);
                echo "fetch\n";

                if($exist["username"])
                {
                    echo "ça existe\n";
                    var_dump($exist);
                    if(password_verify($_POST["inp_pswd"], $exist["password"]))
                    {
                        $_SESSION["username"] = $usrname;
                        echo "Connexion réussie \n";
                    }
                    else echo "mdp pas bon";
                }
                else
                { 
                    $hash_pswd = password_hash($_POST["inp_pswd"], PASSWORD_DEFAULT, ['cost' => 12]);

                    echo "ça a hash\n";
                    echo "mdp = $hash_pswd \n";
                    echo "inserer\n";
                    $query = "INSERT INTO users VALUES (:usrname, :pswd)";
                    $stmt = $pdo->prepare($query);
                    $stmt->bindValue(':usrname', $usrname, PDO::PARAM_INT);
                    $stmt->bindValue(':pswd', $hash_pswd, PDO::PARAM_INT);
                    $stmt->execute();

                    $info = $stmt->fetch(PDO::FETCH_ASSOC);
                    $_SESSION["username"] = $usrname;
                }
            }
        }
    } catch (PDOException $e) {
        error_log('login.php -> PDOException: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
        exit;
}
    



    
?>