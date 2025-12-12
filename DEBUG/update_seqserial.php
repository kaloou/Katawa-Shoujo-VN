<?php
session_start();

if (isset($_POST['seqserial'])) {

    $_SESSION['seqtext']['seqserial'] = (int)$_POST['seqserial'];

    echo "seqtext.seqserial updated to " . $_SESSION['seqtext']['seqserial'];
} else {
    echo "Error: seqserial not provided.";
}
