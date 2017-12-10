<?php
    // 유통자-판매자가 QR코드 기입시 돌아가는 파트
    // 결과물은 Success / Fail로만
    //1. 커넥션 ERROR시 FAIL
    $CONN = mysqli_connect("localhost", "TESTER", "123456", "STUDY");
    if($CONN->error){
        print('FAIL');
        die();
    }


    //2. 값을 가져온다
    $PRODUCT_ID = mysqli_real_escape_string($CONN, $_POST['val1']); //물건 ID(HASHVAL)
    $DISTRIB_ID = mysqli_real_escape_string($CONN, $_POST['val2']); //유저 ID
    
    
    
    //3. INSERT FAIL시 FAIL, 성공시 SUCCESS
    $query = mysqli_query(
            $CONN,"INSERT INTO `DISTRIB_LIST`(PRODUCT_ID, DISTRIB_ID) VALUES('".$PRODUCT_ID."','".$DISTRIB_ID.")"
    );
    mysqli_close($CONN);
    if($query)
        print('SUCCESS');
    else 
        print('FAIL');
?>