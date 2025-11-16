<?php
    session_start();
    include_once('connexion.php');
    header('Content-Type: text/plain; charset=utf-8');
    $DEBUG = true;

    try 
    {
        if(isset($_SESSION("username")))
        {
            $usrname = $_SESSION("username");
            $query = "SELECT auto_save FROM users WHERE users.username = :usrname";
            $stmt = $pdo->prepare($query);
            $stmt->bindValue(':usrname', $usrname, PDO::PARAM_STR);
            $stmt->execute();

            $info = $stmt->fetch(PDO::FETCH_ASSOC);

            if($info)
            {
                //send l'autosafe
            }
            else
            {
                //problème
            }
        }
    } 
    catch (PDOException $e) 
    {
        error_log('get_auto_save.php -> PDOException: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
        exit;
    }
?>