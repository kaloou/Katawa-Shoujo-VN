<?php
// je teste des trucs TQT
    session_start();

    if(isset($_POST["submit"]))
    {
        $_POST[""]
        
        $stm = $PDO->prepare("SELECT * FROM users WHERE users.username == $_POST['']");
        $stm->execute();
        $PDO = null;
        $user = $stm->fetchAll(PDO::FETCH_ASSOC);

        $_SESSION["email"] = $_POST["email"];

        if($user)
        {
            $user[0]["username"];
            $user[0]["password"];
        }
        else
        {
            // ajouter dans la table
        }
    }

    



    
?>