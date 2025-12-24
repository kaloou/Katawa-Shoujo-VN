<?php
session_start();
echo "<pre>";
var_dump($_SESSION);
$to_save = serialize($_SESSION['to_save']);
echo "<br><br><br>$to_save";



$response["found"] = true;