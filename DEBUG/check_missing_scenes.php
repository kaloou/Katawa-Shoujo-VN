<?php
include_once("../PHP/connexion.php");

echo "=== Vérification des scènes et menus manquants ===\n\n";

try {
    $query = "SELECT id, type, name FROM story WHERE type IN (2, 3) ORDER BY id";
    $stmt = $pdo->query($query);
    $instructions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $missing_scenes = [];
    $missing_menus = [];

    foreach ($instructions as $instr) {
        $id = $instr['id'];
        $type = (int)$instr['type'];
        $name = $instr['name'];

        if (empty($name)) continue;

        if ($type === 2) {
            $check_query = "SELECT seqid FROM seqtag WHERE tag = :tag AND type = 1";
            $check_stmt = $pdo->prepare($check_query);
            $check_stmt->bindValue(':tag', $name, PDO::PARAM_STR);
            $check_stmt->execute();

            if (!$check_stmt->fetch()) {
                $missing_scenes[] = ['id' => $id, 'name' => $name];
            }
        } elseif ($type === 3) {
            $check_query = "SELECT seqid FROM seqtag WHERE tag = :tag AND type = 0";
            $check_stmt = $pdo->prepare($check_query);
            $check_stmt->bindValue(':tag', $name, PDO::PARAM_STR);
            $check_stmt->execute();

            if (!$check_stmt->fetch()) {
                $missing_menus[] = ['id' => $id, 'name' => $name];
            }
        }
    }

    if (empty($missing_scenes) && empty($missing_menus)) {
        echo "✓ Aucune scène ou menu manquant détecté !\n";
    } else {
        if (!empty($missing_scenes)) {
            echo "⚠ SCÈNES MANQUANTES dans seqtag:\n";
            foreach ($missing_scenes as $scene) {
                echo "  - Story ID {$scene['id']}: '{$scene['name']}'\n";
            }
            echo "\n";
        }

        if (!empty($missing_menus)) {
            echo "⚠ MENUS MANQUANTS dans seqtag:\n";
            foreach ($missing_menus as $menu) {
                echo "  - Story ID {$menu['id']}: '{$menu['name']}'\n";
            }
            echo "\n";
        }

        echo "NOTE: Ces scènes/menus seront ignorés par l'interpréteur.\n";
    }

} catch (PDOException $e) {
    echo "Erreur: " . $e->getMessage() . "\n";
}
?>
