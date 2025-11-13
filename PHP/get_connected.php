<?php
// je teste des trucs TQT
    session_start();
    include_once('connexion.php');
    header('Content-Type: text/plain; charset=utf-8');

    try {
        if(isset($_SESSION("connexion_response"))) echo json_encode($_SESSION("connexion_response"));
        else {

        }
    } catch (PDOException $e) {
        error_log('login.php -> PDOException: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
        exit;
}
?>