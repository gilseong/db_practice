<?php
    $NAME = mysqli_real_escape_string($_POST['name']);
    $JOP = mysqli_real_escape_string($_POST['jop']);
    
    //Raw JOP String을 분류
    if($JOP = 'u') $DB_JOP = 'DISTRIBUTOR'; //유통자
    else if($JOP = 'p') $DB_JOP = 'SELLER'; //판매자
    else $DB_JOP = 'UNKNOWN'; //해당사항이 없어야함
    
    $conn = mysqli_connect("localhost", "TESTER", "123456", "STUDY");
    $query = mysqli_query(
        $conn, 
        "SELECT `DISTRIB_ID` 
        FROM `DISTRIBUTORS` 
        WHERE `DISTRIB_ID` = '".substr(md5($NAME.$DB_JOP), 0, 6)
    );
    // 아이디가 이미 존재할경우
    if(mysqli_num_rows($query) !== 0){
        print 'exist';
        die();
    }
    //없을경우 Insert
    mysqli_query(
            $conn,
            "INSERT INTO `DISTRIBUTORS`(`DISTRIB_ID`, `TYPE`)
                VALUES('".substr(md5($NAME.$DB_JOP), 0, 6)."','".$DB_JOP.")"
    );
    setcookie('USER_ID', substr(md5($NAME.$DB_JOP), 0, 6), time() + (86400 * 30), "/"); //30 DAYS
    print substr(md5($NAME.$DB_JOP), 0, 6);
    
?>
