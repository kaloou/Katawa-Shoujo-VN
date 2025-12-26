<?php
session_start();

if(!isset($_SESSION['to_save']))
{
    $_SESSION['to_save']['rep']['seqid'] = 0;
    $_SESSION['to_save']['rep']['seqserial'] = 9999;
    $_SESSION['to_save']['rep']['type'] = 1;
    $_SESSION['to_save']['rep']['elid'] = 1;

    $_SESSION['to_save']['bg'] = 'bg_op_snowywoods.png';

    $_SESSION['to_save']['sprite']['image_name'] = '';
    $_SESSION['to_save']['sprite']['width'] = 0;
    $_SESSION['to_save']['sprite']['height'] = 0;
    $_SESSION['to_save']['sprite']['image_tag'] = '';
    $_SESSION['to_save']['sprite']['pos'] = 0;

    $_SESSION['to_save']['music'] = 'Lullaby_of_Open_Eyes.mp3';

    $_SESSION['to_save']['interpreter']['ip'] = 1;
    $_SESSION['to_save']['interpreter']['last_qcm_choice'] = 0;
    $_SESSION['to_save']['interpreter']['scenes_viewed'] = array();
    $_SESSION['to_save']['interpreter']['variables'] = array();
}

if (!isset($_SESSION["story"])) {
    $_SESSION["story"] = array(
        "seqid" => 0
    );
}

if (!isset($_SESSION["seqtext"])) {
    $_SESSION["seqtext"] = array(
        "seqid" => 0,
        "seqserial" => 9999
    );
}

if (!isset($_SESSION["game_state"])) {
    $_SESSION["game_state"] = array(
        "menu_active" => false, // may not be necessary
        "choice_active" => false,
        "get_line_loaded" => false
    );
}

if (!isset($_SESSION["interpreter"])) {
    $_SESSION["interpreter"] = array(
        "ip" => 1,
        "last_qcm_choice" => 0,
        "scenes_viewed" => array(),
        "variables" => array()
    );
}
?>