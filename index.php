<?php
    //QR 코드 검색시 이 파일로 Hash값과 함께 Redirect되어진다
    $PRODUCT_ID = mysql_real_escape_string($_GET['data']);

    //User ID를 COOKIE에서 가져온다.
    $USER_ID = mysql_real_escape_string($_COOKIE['USER_ID']);

    //DB와 연결이 안되면 CONN_ERROR로 Set
    $CONN = mysqli_connect("localhost", "TESTER", "123456", "study");
    if($CONN->error){
        $STATUS = 'CONN_ERROR';
        exit();
    }

    // 1.소비자인지 판단 ( 판매자 다음은 언제나 소비자, 즉 판매자가 로그에 있는지 찾기)
    $query = mysqli_query($conn, 
    "SELECT 
        `PRODUCT_ID`, `DISTRIB_ID`
    FROM DISTRIB_LIST 
    LEFT JOIN DISTRIBUTORS 
    ON DISTRIB_LIST.DISTRIB_ID = DISTRIBUTORS.DISTRIB_ID 
    WHERE DISTRIB_LIST.TYPE LIKE 'SELLER'
    ");
    if(mysqli_num_rows($query) === 0){ //if not false
        $STATUS = 'BUYER';
        exit();
    }
    // 2. 소비자가 아니면 쿠키를 찾는다
    //쿠키가 없을시 STATUS를 NO_COOKIE로 Set
    if(!isset($USER_ID)){
        $STATUS = 'NO_COOKIE';
        exit();
    }
    //쿠키가 있는데 ID가 DB에 없을시 NO_ID로 Set.(웬만해서는 해당사항 없음) 있을시 SUCCESS로 Set
    $USER_STATUS = mysqli_query($conn,"SELECT ".$USER_ID." FROM `DISTRIBUTORS`");
    if(!$USER_STATUS) //없을경우
        $STATUS = 'NO_ID';
    else
        $STATUS = 'SUCCESS';
    mysqli_close($CONN);
?>
<script src="js/distrib_seller.js"></script>
<script src="js/buyer.js"></script>
<script src="index.js"></script>
<script type="text/javascript">
    var PRODUCT_ID = "<?php echo $PRODUCT_ID ?>";
    var STATUS = "<?php echo $STATUS ?>";
    initial(PRODUCT_ID, STATUS);
</script>