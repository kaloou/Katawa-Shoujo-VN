<?php
    $str = "rep|seqid:=:1|seqserial:=:1|type:=:1|elid:=:1@text|char_name:=:'test.png'|";
    $tab1 = explode("@", $str); /*$_SESSION('auto_save')*/
    var_dump($tab1);
    echo "<br><br>";
    echo "foreeach";
    echo "<br><br>";
    $tab2 = [];

    foreach ($tab1 as $i => $val) 
    {
        echo "$i) <br>";
        $tab2[$i] = explode("|", $val);
        var_dump($tab2[$i]);
        echo "<br><br>";
    }
    var_dump($tab2);

    // $_SESSION['to_save']['rep']['seqid'] = 1;
    // $_SESSION['to_save']['rep']['seqserial'] = 1;
    // $_SESSION['to_save']['rep']['type'] = 1;
    // $_SESSION['to_save']['rep']['elid'] = 1;

    // $_SESSION['to_save']['text']['char_name'] = '';
    // $_SESSION['to_save']['text']['char_color'] = '';
    // $_SESSION['to_save']['text']['content'] = '';
    // $_SESSION['to_save']['text']['char_code'] = '';


    // $_SESSION['to_save']['bg'] = '';

    // $_SESSION['to_save']['sprite']['image_name'] = '';
    // $_SESSION['to_save']['sprite']['width'] = 0;
    // $_SESSION['to_save']['sprite']['height'] = 0;
    // $_SESSION['to_save']['sprite']['image_tag'] = '';
    // $_SESSION['to_save']['sprite']['pos'] = 0;


    // $_SESSION['to_save']['sprite'] = [];


    // $_SESSION['to_save']['centered_text'] = $response['text'];


    // $_SESSION['to_save']['music'] = $response['music_name'];
?>