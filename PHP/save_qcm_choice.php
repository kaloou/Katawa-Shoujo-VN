<?php
session_start();
header('Content-Type: text/plain; charset=utf-8');

try {
    $choice = file_get_contents('php://input');
    $choice = (int)$choice;

    if ($choice < 1 || $choice > 4) {
        echo json_encode(['success' => false, 'message' => 'Choix invalide']);
        exit;
    }

    $_SESSION["interpreter"]["last_qcm_choice"] = $choice;

    echo json_encode(['success' => true, 'choice' => $choice]);
    exit;

} catch (Exception $e) {
    error_log("save_qcm_choice.php -> Exception: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
}
?>
