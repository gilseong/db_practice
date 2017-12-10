//유통자-판매자 단계에서는 Visualization을 하지 않는다!
function init_distrib_seller(PRODUCT_ID, USER_ID){
    $.ajax({
        type: 'POST',
        dataType: 'text',
        data: {"PRODUCT_ID":  PRODUCT_ID, "USER_ID":  USER_ID,},
        url: "../php/distrib_seller_insert.php",
        success: function(result){
            if(result === 'SUCCESS')
                alert('저장되었습니다!.');
            else if(result === 'FAIL') //
                alert('제대로 저장이 되지 않은거같네요.');
            else
                alert('ERROR');
        }
    });
}