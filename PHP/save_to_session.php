<?php 
    session_start();
    include_once('connexion.php');
    header('Content-Type: text/plain; charset=utf-8');

    explode(" ",$str)

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
                "background" => "",
                "menu_active" => false, // may not be necessary
                "choice_active" => false,
                "get_line_loaded" => false,
                "actual_music" => ""
            );
        }