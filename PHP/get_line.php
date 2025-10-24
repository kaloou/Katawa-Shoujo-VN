<?php
session_start();

include_once('connexion.php');

// ENDPOINT TEXT
header('Content-Type: text/plain; charset=utf-8');

$seqid = $_SESSION["story"]["seqid"];
$seqserial = $_SESSION["seqtext"]["seqserial"];

$query = "SELECT * FROM seqtext WHERE seqid = :seqid AND seqserial = :seqserial";
