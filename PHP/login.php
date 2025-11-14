<?php
// je teste des trucs TQT
    session_start();
    include_once('connexion.php');
    header('Content-Type: application/json; charset=utf-8');

    try {
        $regex_password = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-._!\"'@#$%^&*(){}[\]\/\\\\?~:;+=|]).{8,}$/";
        $regex_username = "/^[a-zA-Z0-9]{3,}$/";
    
        if(isset($_POST["submit"]))
        {
            if(preg_match($regex_username, $_POST["inp_pseudo"]) && preg_match($regex_password, $_POST["inp_pswd"])) 
            {
                $usrname = $_POST["inp_pseudo"];
                $pswd = $_POST["inp_pswd"];

                $query = "SELECT * FROM users WHERE users.username == :usrname AND users.password == :pswd";
                $stmt = $pdo->prepare($query);
                $stmt->bindValue(':usrname', $usrname, PDO::PARAM_INT);
                $stmt->bindValue(':pswd', $pswd, PDO::PARAM_INT);
                $stmt->execute();

                $_SESSION["inp_pseudo"] = $_POST["inp_pseudo"];
/*
                if($user)
                {
                    $user[0]["username"];
                    $user[0]["password"];
                }
                else
                {
                    // ajouter dans la table
                }
                    */
            }
        }
    } catch (PDOException $e) {
        error_log('login.php -> PDOException: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
        exit;
}
    



    
?>