<?php
    //쿠키 정보를 가져오는 PHP
    $COOKIE_NAME = $_GET('COOKIE_NAME');

    //쿠키 이름을 기반으로 DATA를 가져온다

    //1. 해당 쿠키가 존재하지 않으면 NULL를 Return한다
    if(!isset($_COOKIE[$COOKIE_NAME]))
    {
        echo NULL;
        die();
    }
    //2. 쿠키가 존재하므로 해당 값을 Return한다
    else
    {
        echo $_COOKIE[$COOKIE_NAME];
    }
?>