<?php
    // FETCH ONLY
    // 생산자측 정보 겟!

    $CONN = mysqli_connect("localhost", "TESTER", "123456", "STUDY");
    //1. 값을 가져온다
    $PRODUCT_ID = mysqli_real_escape_string($CONN,$_POST['val1']);

    if($CONN->error)
        die();
    
    //2. 해당 Product ID에 해당하는 값들을 Fetch한다. DISTRIB_LIST에서!
    $query = mysqli_query($conn, "SELECT * FROM PRODUCTS WHERE PRODUCTS.PRODUCT_ID = '".$PRODUCT_ID."';");
    $ROWS = array();
    while($r = mysqli_fetch_assoc($query)) {
        $ROWS[] = $r;
    }
    //3. JSON으로 ENCODE한채로 RETURN
    print json_encode($ROWS);
?>