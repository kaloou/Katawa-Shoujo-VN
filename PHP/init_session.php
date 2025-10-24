<?php
session_start();

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
        "menu_active" => false,
        "actual_music" => ""
    );
}

if (!isset($_SESSION["game_progress"])) {
    $_SESSION["game_progress"] = array(
        "time_played" => time(),
        "actual_scene" => 0
    );
}