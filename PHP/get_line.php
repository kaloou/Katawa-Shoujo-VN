<?php
session_start();
include_once('connexion.php');
include_once('interpreter.php');
header('Content-Type: text/plain; charset=utf-8');

/*
if ($_SESSION["game_state"]["get_line_loaded"] == false){
    echo json_encode(['type' => 'not_loaded']);
    exit;
}
$_SESSION["game_state"]["get_line_loaded"] = false;*/
try {
    $seqid = $_SESSION["story"]["seqid"];
    $seqserial = $_SESSION["seqtext"]["seqserial"];

    $query = "
        SELECT seqtext.*,
               image.name AS image_name,
               image.w AS image_width,
               image.h AS image_height,
               character.name AS character_name,
               character.color AS character_color,
               character.code as character_code,
               music.name AS music_name
        FROM seqtext
        LEFT JOIN image ON seqtext.elid = image.iid
        LEFT JOIN character ON seqtext.elid = character.cid
        LEFT JOIN music ON (seqtext.type = 1 AND seqtext.pos = 7 AND seqtext.z = music.id)
        WHERE seqtext.seqid = :seqid
        AND seqtext.seqserial = :seqserial
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':seqid', $seqid, PDO::PARAM_INT);
    $stmt->bindValue(':seqserial', $seqserial, PDO::PARAM_INT);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row === false) {
        $_SESSION["seqtext"]["seqserial"] = 1;

        $interpreter_result = run_interpreter($pdo);

        switch ($interpreter_result['type']) {
            case 'scene':
                $_SESSION["story"]["seqid"] = $interpreter_result['seqid'];
                $_SESSION["seqtext"]["seqid"] = $interpreter_result['seqid'];
                $_SESSION["seqtext"]["seqserial"] = 1;
                echo json_encode(['type' => 'end']);
                exit;

            case 'menu':
                $menu_query = "SELECT * FROM menu WHERE seqid = :seqid";
                $menu_stmt = $pdo->prepare($menu_query);
                $menu_stmt->bindValue(':seqid', $interpreter_result['seqid'], PDO::PARAM_INT);
                $menu_stmt->execute();
                $menu_data = $menu_stmt->fetch(PDO::FETCH_ASSOC);

                if ($menu_data) {
                    $_SESSION["seqtext"]["seqserial"] = 9999;

                    $character_name = '';
                    $character_color = '';
                    if ($menu_data['qid'] !== null) {
                        $char_query = "SELECT name, color FROM character WHERE cid = :qid";
                        $char_stmt = $pdo->prepare($char_query);
                        $char_stmt->bindValue(':qid', $menu_data['qid'], PDO::PARAM_INT);
                        $char_stmt->execute();
                        $char_data = $char_stmt->fetch(PDO::FETCH_ASSOC);
                        if ($char_data) {
                            $character_name = $char_data['name'];
                            $character_color = $char_data['color'];
                        }
                    }

                    $qcm_response = [
                        'type' => 7,
                        'qtext' => $menu_data['qtext'],
                        'character_name' => $character_name,
                        'character_color' => $character_color,
                        'options' => []
                    ];
                    for ($i = 1; $i <= 4; $i++) {
                        $opt_key = 'opt' . $i;
                        if (!empty($menu_data[$opt_key]) && $menu_data[$opt_key] !== null) {
                            $qcm_response['options'][] = [
                                'number' => $i,
                                'text' => $menu_data[$opt_key]
                            ];
                        }
                    }

                    echo json_encode($qcm_response);
                    exit;
                } else {
                    error_log('get_line.php -> Menu introuvable: seqid=' . $interpreter_result['seqid']);
                    echo json_encode(['type' => 'error', 'message' => 'Menu introuvable']);
                    exit;
                }

            case 'end':
                echo json_encode([
                    'type' => 'game_end',
                    'ending_name' => $interpreter_result['ending_name']
                ]);
                exit;

            case 'error':
            default:
                echo json_encode([
                    'type' => 'error',
                    'message' => $interpreter_result['message'] ?? 'Erreur'
                ]);
                exit;
        }
    }

    $_SESSION["seqtext"]["seqserial"]++;

    //BASE RESPONSE
    $response = [
        'seqid' => $seqid,
        'seqserial' => $seqserial,
        'type' => (int)$row['type'],
        'elid' => (int)$row['elid'],
    ];

    $_SESSION['to_save']['rep'] = $response;

    // ajouter les propriétés spécifiques selon le type
    switch ($row['type']) {
        case 1: // texte
            $response['character_name'] = $row['character_name'] ?? '';
            $response['character_color'] = $row['character_color'] ?? '';
            $response['text'] = $row['data'];
            $response['character_code'] = $row['character_code'] ?? '';
            $response['pos'] = (int)($row['pos'] ?? 0);
            $response['z'] = (int)($row['z'] ?? 0);
            $response['music_name'] = $row['music_name'] ?? '';

            if($row['music_name'])
            {
                $_SESSION['to_save']['music'] = $row['music_name'];
            }
            break;

        case 2: // BG
            $response['image_name'] = $row['image_name'] ?? '';
            $response['image_tag'] = $row['data'];
            $_SESSION['to_save']['bg'] = $response['image_name'];
            break;
            
        case 3: // Sprites
            $response['image_name'] = $row['image_name'] ?? '';
            $response['width'] = (int)($row['image_width'] ?? 0);
            $response['height'] = (int)($row['image_height'] ?? 0);
            $response['image_tag'] = $row['data'];
            $response['pos'] = (int)($row['pos'] ?? 0);

            $_SESSION['to_save']['sprite']['image_name'] = $response['image_name'];
            $_SESSION['to_save']['sprite']['width'] = $response['width'];
            $_SESSION['to_save']['sprite']['height'] = $response['height'];
            $_SESSION['to_save']['sprite']['image_tag'] = $response['image_tag'];
            $_SESSION['to_save']['sprite']['pos'] = $response['pos'];
            break;
        case 4: // Supprime Sprites
            $response['image_tag'] = $row['data'];

            $_SESSION['to_save']['sprite']['image_name'] = '';
            $_SESSION['to_save']['sprite']['width'] = 0;
            $_SESSION['to_save']['sprite']['height'] = 0;
            $_SESSION['to_save']['sprite']['image_tag'] = '';
            $_SESSION['to_save']['sprite']['pos'] = 0;
            break;

        case 5: // DIV au milieu de l'écran
            $response['text'] = $row['data'];
            break;
            
        case 6: // HTML à interpréter
            $response['html'] = $row['data'];
            break;
    }

    echo json_encode($response);
    //$_SESSION["game_state"]["get_line_loaded"] = true;
    exit;

} catch (PDOException $e) {
    error_log('getLine.php -> PDOException: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
    exit;
}
