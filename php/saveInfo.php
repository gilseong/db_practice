<?php
    //MYSQL 서버에 Param들을 저장하고, 해당 값으로 만들어낸 Hash값을 Return하는 php

    //1. 값을 가져온다
    $VAL1 = $_GET('VAL1');
    $VAL2 = $_GET('VAL2');
    $VAL3 = $_GET('VAL3');

    $COUNT = $_GET('COUNT'); //QR코드 생성해야 할 갯수

    //2. MYSQL 서버와 연동을한다 
    $conn = mysqli_connect(localhost, "TESTER", "123456", "study");
    if($conn->error)
        die();
    
    //3. 1번의 값으로 MD5 Hash를 만들어낸다. 단, 이미 값이 2번의 서버에 존재할시 다시 만든다
    $HASHVAL=array();
    for ($i = 0; $i < $COUNT; ++$i){
        $TEMPHASH = md5(uniqid(rand(), TRUE));
        if(mysqli_query($conn,"SELECT ".$TEMPHASH."FROM `PRODUCTS`"))
            $i--;
        else
            array_push($HASHVAL,$TEMPHASH);
    }
    
    //4. 내용을 저장한다
    if(!mysqli_query($conn,"INSERT INTO `PRODUCTS` VALUES(".$HASHVAL.",".$VAL1.",".$VAL2.",".$VAL3.")")) die();
    mysqli_close($conn);

    //5. 2번의 Hash값을 json으로 묶어서 Return한다
    print json_encode($HASHVAL);
?>