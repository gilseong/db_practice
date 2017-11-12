<?php
    //QR 코드 검색시 이 파일로 Hash값과 함께 Redirect되어진다
    $HASH_VAL = $_GET['data'];
    //MySQL이랑 대조해서 Data유무 확인

    //그 후 필요한 정보들을 String으로 뭉쳐서 Echo
    echo $HASH_VAL;
?>