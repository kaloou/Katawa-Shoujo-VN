<?php
function run_interpreter($pdo) {
    while (true) {
        $ip = $_SESSION["interpreter"]["ip"];

        // Récupérer l'instruction courante
        $query = "SELECT * FROM story WHERE id = :ip";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':ip', $ip, PDO::PARAM_INT);
        $stmt->execute();
        $instruction = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$instruction) {
            error_log("interpreter.php -> Instruction introuvable: IP=$ip");
            return ['type' => 'error', 'message' => 'Instruction introuvable'];
        }

        $type = (int)$instruction['type'];
        $name = $instruction['name'];
        $param = (int)$instruction['param'];
        $next = (int)$instruction['next'];

        $new_ip = $ip + 1;

        switch ($type) {
            case 0:
                break;

            case 1:
                $new_ip = $next;
                break;

            case 2:
                $query = "SELECT seqid FROM seqtag WHERE tag = :tag AND type = 1";
                $stmt = $pdo->prepare($query);
                $stmt->bindValue(':tag', $name, PDO::PARAM_STR);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($result) {
                    $seqid = (int)$result['seqid'];
                    $_SESSION["interpreter"]["scenes_viewed"][$name] = true;
                    $_SESSION["interpreter"]["ip"] = $new_ip;
                    return ['type' => 'scene', 'seqid' => $seqid, 'tag' => $name];
                } else {
                    error_log("interpreter.php -> Scène '$name' non trouvée, ignorée");
                    $_SESSION["interpreter"]["scenes_viewed"][$name] = true;
                    break;
                }
                break;

            case 3:
                $query = "SELECT seqid FROM seqtag WHERE tag = :tag AND type = 0";
                $stmt = $pdo->prepare($query);
                $stmt->bindValue(':tag', $name, PDO::PARAM_STR);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($result) {
                    $seqid = (int)$result['seqid'];
                    $_SESSION["interpreter"]["ip"] = $new_ip;
                    return ['type' => 'menu', 'seqid' => $seqid, 'tag' => $name];
                } else {
                    error_log("interpreter.php -> Menu '$name' non trouvé, ignoré");
                    break;
                }
                break;

            case 4:
                $last_choice = $_SESSION["interpreter"]["last_qcm_choice"];
                if ($last_choice == $param) {
                    $new_ip = $next;
                }
                break;

            case 5:
                if (isset($_SESSION["interpreter"]["scenes_viewed"][$name]) &&
                    $_SESSION["interpreter"]["scenes_viewed"][$name]) {
                    $new_ip = $next;
                }
                break;

            case 6:
                $var_value = 0;
                if (isset($_SESSION["interpreter"]["variables"][$name])) {
                    $var_value = (int)$_SESSION["interpreter"]["variables"][$name];
                } else {
                    $_SESSION["interpreter"]["variables"][$name] = 0;
                }

                if ($var_value > $param) {
                    $new_ip = $next;
                }
                break;

            case 7:
                if (!isset($_SESSION["interpreter"]["variables"][$name])) {
                    $_SESSION["interpreter"]["variables"][$name] = 0;
                }
                $_SESSION["interpreter"]["variables"][$name] += $param;
                break;

            case 8:
                break;

            case 9:
                $_SESSION["interpreter"]["ip"] = $new_ip;
                return ['type' => 'end', 'ending_name' => $name];
                break;

            default:
                error_log("interpreter.php -> Type inconnu: $type");
                return ['type' => 'error', 'message' => "Type inconnu: $type"];
        }

        $_SESSION["interpreter"]["ip"] = $new_ip;
    }
}
?>
