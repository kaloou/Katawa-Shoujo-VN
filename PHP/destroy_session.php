<?php
session_start();
session_unset();
session_destroy();
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Retourner un JSON de confirmation
header('Content-Type: application/json; charset=utf-8');
echo json_encode(array(
    "status" => "success",
    "message" => "Session réinitialisée avec succès",
    "session_data" => $_SESSION
), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);