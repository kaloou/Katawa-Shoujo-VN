<?php
session_start();
include_once("../PHP/connexion.php");
header('Content-Type: text/plain; charset=utf-8');

echo "=== RÉINITIALISATION DE LA SAUVEGARDE ===\n\n";

if(!isset($_SESSION["user_id"])) {
    echo "❌ Erreur: Vous n'êtes pas connecté.\n";
    echo "Connectez-vous d'abord, puis rechargez cette page.\n";
    exit;
}

$user_id = $_SESSION["user_id"];

try {
    // Réinitialiser l'auto_save dans la base de données
    $query = "UPDATE users SET auto_save = :default_save WHERE id_user = :user_id";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(":default_save", $default_save, PDO::PARAM_STR);
    $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
    $stmt->execute();

    echo "✓ Auto-save réinitialisée dans la base de données\n\n";

    // Afficher les valeurs par défaut
    $default_data = unserialize($default_save);
    echo "Nouvelles valeurs par défaut:\n";
    echo "  seqid: " . $default_data['rep']['seqid'] . "\n";
    echo "  seqserial: " . $default_data['rep']['seqserial'] . "\n";
    echo "  IP: " . $default_data['interpreter']['ip'] . "\n\n";

    echo "✓ Terminé ! Rechargez votre jeu pour appliquer les changements.\n";
    echo "\nNote: Cela réinitialise complètement votre progression.\n";
    echo "Si vous voulez garder une sauvegarde, utilisez les slots de sauvegarde manuels.\n";

} catch (Exception $e) {
    echo "❌ Erreur: " . $e->getMessage() . "\n";
}
?>
