<?php
session_start();

header('Content-Type: text/plain; charset=utf-8');

echo "=== ÉTAT DE LA SESSION ===\n\n";

if (isset($_SESSION["user_id"])) {
    echo "User ID: " . $_SESSION["user_id"] . "\n\n";
} else {
    echo "Pas connecté\n\n";
}

echo "--- INTERPRÉTEUR (live) ---\n";
if (isset($_SESSION["interpreter"])) {
    echo "IP: " . $_SESSION["interpreter"]["ip"] . "\n";
    echo "Dernier choix QCM: " . $_SESSION["interpreter"]["last_qcm_choice"] . "\n";
    echo "Scènes vues: " . count($_SESSION["interpreter"]["scenes_viewed"]) . "\n";
    foreach ($_SESSION["interpreter"]["scenes_viewed"] as $scene => $viewed) {
        if ($viewed) echo "  - $scene\n";
    }
    echo "Variables: " . count($_SESSION["interpreter"]["variables"]) . "\n";
    foreach ($_SESSION["interpreter"]["variables"] as $var => $value) {
        echo "  - $var = $value\n";
    }
} else {
    echo "Non initialisé\n";
}

echo "\n--- POSITION DANS L'HISTOIRE ---\n";
if (isset($_SESSION["story"]["seqid"])) {
    echo "Séquence actuelle: " . $_SESSION["story"]["seqid"] . "\n";
}
if (isset($_SESSION["seqtext"]["seqserial"])) {
    echo "Message actuel: " . $_SESSION["seqtext"]["seqserial"] . "\n";
}

echo "\n--- TO_SAVE (sauvegarde) ---\n";
if (isset($_SESSION["to_save"])) {
    echo "BG: " . ($_SESSION["to_save"]["bg"] ?? "non défini") . "\n";
    echo "Music: " . ($_SESSION["to_save"]["music"] ?? "non défini") . "\n";

    if (isset($_SESSION["to_save"]["interpreter"])) {
        echo "\nInterpréteur dans to_save:\n";
        echo "  IP: " . $_SESSION["to_save"]["interpreter"]["ip"] . "\n";
        echo "  Dernier choix: " . $_SESSION["to_save"]["interpreter"]["last_qcm_choice"] . "\n";
        echo "  Scènes vues: " . count($_SESSION["to_save"]["interpreter"]["scenes_viewed"]) . "\n";
        echo "  Variables: " . count($_SESSION["to_save"]["interpreter"]["variables"]) . "\n";
    } else {
        echo "\n⚠ ATTENTION: Pas d'interpréteur dans to_save !\n";
        echo "Cela causera un bug au prochain chargement.\n";
    }
} else {
    echo "Non initialisé\n";
}

echo "\n--- COMPARAISON ---\n";
if (isset($_SESSION["interpreter"]) && isset($_SESSION["to_save"]["interpreter"])) {
    $live_ip = $_SESSION["interpreter"]["ip"];
    $saved_ip = $_SESSION["to_save"]["interpreter"]["ip"];

    if ($live_ip == $saved_ip) {
        echo "✓ IP synchronisé (live=$live_ip, saved=$saved_ip)\n";
    } else {
        echo "⚠ IP DÉSYNCHRONISÉ !\n";
        echo "  Live: $live_ip\n";
        echo "  Saved: $saved_ip\n";
        echo "  → Appeler save_session_to_db.php pour synchroniser\n";
    }
}

echo "\n=== FIN ===\n";
?>
