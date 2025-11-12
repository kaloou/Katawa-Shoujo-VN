<?php
session_start();

if (isset($_POST['seqid'])) {

    $_SESSION['story']['seqid'] = (int)$_POST['seqid'];
    $_SESSION['seqtext']['seqserial'] = 1;

    echo "story.seqid updated to " . $_SESSION['story']['seqid'];
} else {
    echo "Error: seqid not provided.";
}
