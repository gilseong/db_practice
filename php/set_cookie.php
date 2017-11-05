<?php
    //쿠키 이름과 Data를 기반으로 쿠키를 생성/저장하는 php

    //쿠키 이름과 Data를 가져온다
    $COOKIE_NAME = $_GET('COOKIE_NAME');
    $DATA = $_GET('DATA');

    //쿠키 이름과 DATA를 기반으로 Cookie를 저장한다. 지속 기간은 30일
    setcookie($COOKIE_NAME, $DATA, time() + (86400 * 30), "/");
?>