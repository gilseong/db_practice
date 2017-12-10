<?php
    //MYSQL 서버에 Param들을 저장하고, 해당 값으로 만들어낸 Hash값을 Return하는 php

    //1. 값을 가져온다
    $PRODUCT_NAME = mysql_real_escape_string($_POST['val1']);
    $MILK_TYPE = mysql_real_escape_string($_POST['val2']);
    $FAT_RATE = mysql_real_escape_string($_POST['val3']);

    $COUNT = $_POST['count']; //QR코드 생성해야 할 갯수
    //2. MYSQL 서버와 연동을한다 
    $CONN = mysqli_connect("localhost", "TESTER", "123456", "STUDY");
    if($CONN->error)
        die();
    
    //3. 1번의 값으로 MD5 Hash를 만들어낸다. 단, 이미 값이 2번의 서버에 존재할시 다시 만든다
    $PRODUCT_ID=array();
    for ($i = 0; $i < $COUNT; ++$i){
        $TEMPHASH = md5(uniqid(rand(), TRUE));
        if(mysqli_query($CONN,"SELECT ".$TEMPHASH."FROM `PRODUCTS`"))
            $i--;
        else
            array_push($PRODUCT_ID,$TEMPHASH);
    }
    //4. 내용을 저장한다
    foreach ($PRODUCT_ID as $ID)
        mysqli_query(
            $CONN,"INSERT INTO `PRODUCTS`(PRODUCT_ID, PRODUCT_NAME, MILK_TYPE, FAT_RATE, PRODUCT_SINCE)
            VALUES('".$ID."','".$PRODUCT_NAME."','".$MILK_TYPE."','".$FAT_RATE."','".date('Y-m-d H:i:s').")");
    mysqli_close($CONN);

    //5. 2번의 Hash값을 json으로 묶어서 Return한다
    print json_encode($PRODUCT_ID);
?>