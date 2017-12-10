<?php
    $CONN = mysqli_connect("localhost", "TESTER", "123456", "STUDY");

    $ID = mysqli_real_escape_string($CONN, $_POST['id']);
    $query = mysqli_query(
        $CONN, 
        "SELECT `DISTRIB_ID`
         FROM `DISTRIBUTORS` 
         WHERE `DISTRIB_ID` = '".$ID."'"
    );
    if(!mysqli_num_rows($query))
        print 'empty';
    else{
        setcookie('USER_ID', $query, time() + (86400 * 30), "/"); //30 DAYS
        print 'exist';
    }
?>
