<?php
session_start();

if(!isset($_SESSION['to_save']))
{
    $_SESSION['to_save']['rep']['seqid'] = 1;
    $_SESSION['to_save']['rep']['seqserial'] = 1;
    $_SESSION['to_save']['rep']['type'] = 1;
    $_SESSION['to_save']['rep']['elid'] = 1;

    $_SESSION['to_save']['bg'] = 'bg_op_snowywoods.png';

    $_SESSION['to_save']['sprite']['image_name'] = '';
    $_SESSION['to_save']['sprite']['width'] = 0;
    $_SESSION['to_save']['sprite']['height'] = 0;
    $_SESSION['to_save']['sprite']['image_tag'] = '';
    $_SESSION['to_save']['sprite']['pos'] = 0;

    $_SESSION['to_save']['music'] = 'Lullaby_of_Open_Eyes.mp3';
}

if (!isset($_SESSION["story"])) {
    $_SESSION["story"] = array(
        "seqid" => 1,
        "type" => 1,
        "name" => "",
        "param" => 0,
        "next" => 2
    );
}

if (!isset($_SESSION["seqtext"])) {
    $_SESSION["seqtext"] = array(
        "seqid" => $_SESSION["story"]["seqid"],
        "seqserial" => 1,
        "type" => 1,
        "data" => "text",
        "elid" => 1,
        "pos" => 1,
        "z" => 1
    );
}

if (!isset($_SESSION["game_state"])) {
    $_SESSION["game_state"] = array(
        "menu_active" => false, // may not be necessary
        "choice_active" => false,
        "get_line_loaded" => false
    );
}
?>