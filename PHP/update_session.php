<?php
session_start();

// Vérifier si le paramètre seqid est bien envoyé
if (isset($_POST['seqid'])) {
    // Mettre à jour la session pour `story.seqid`
    $_SESSION['story']['seqid'] = (int)$_POST['seqid'];
    $_SESSION['seqtext']['seqserial'] = 1;

    // Optionnel : vérifier si le changement a été effectué
    echo "story.seqid updated to " . $_SESSION['story']['seqid'];
} else {
    echo "Error: seqid not provided.";
}
?>
