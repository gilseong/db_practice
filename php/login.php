<?php
    $ID = mysqli_real_escape_string($_POST['id']);

    $conn = mysqli_connect("localhost", "TESTER", "123456", "STUDY");
    $query = mysqli_query(
        $conn, 
        "SELECT `DISTRIB_ID`
         FROM `DISTRIBUTORS` 
         WHERE `DISTRIB_ID` = '".$ID
    );
    if(mysqli_num_rows($query) === 0)
        print 'empty';
    else{
        setcookie('USER_ID', $query, time() + (86400 * 30), "/"); //30 DAYS
        print 'exist';
    }
?>
