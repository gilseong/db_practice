<?php
    // FETCH ONLY
    // 유통자-판매자 리스트 겟!

    //1. 값을 가져온다
    $PRODUCT_ID = mysqli_real_escape_string($_POST['val1']);

    $CONN = mysqli_connect("localhost", "TESTER", "123456", "STUDY");
    if($CONN->error)
        die();
    
    //2. 해당 Product ID에 해당하는 값들을 Fetch한다. DISTRIB_LIST에서!
    $query = mysqli_query($conn, "SELECT * FROM DISTRIB_LIST LEFT JOIN DISTRIBUTORS ON DISTRIB_LIST.DISTRIB_ID = DISTRIBUTORS.DISTRIB_ID AND DISTRIB_LIST.PRODUCT_ID = '".$PRODUCT_ID."';");
    $ROWS = array();
    while($r = mysqli_fetch_assoc($query)) {
        $ROWS[] = $r;
    }
    //3. JSON으로 ENCODE한채로 RETURN
    print json_encode($ROWS);
?>