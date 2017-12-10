//index.php에서 2개의 param을 받아와서 어느 js를 부를것인지 처리
function initial(PRODUCT_ID, USER_ID, STATUS){
    //에러처리
    if(STATUS === 'CONN_ERROR') //연결에러
        alert('서버 상태에 이상이 있거나 연결상태에 문제가 있습니다.');
    else if(STATUS === 'BUYER') //구매자(최종)
        init_buyer(PRODUCT_ID);
    else if(STATUS === 'NO_COOKIE') // 쿠키못찾음 -> 로그인창
        window.location.href = '../html/login.html';
    else if(STATUS == 'SUCCESS') // 유통이거나 판매담당(성공) //GUI는 없다고 봐야함
        init_distrib_seller(PRODUCT_ID, USER_ID);
    else if(STATUS == 'NO_ID') // 쿠키있으나 ID없음(정상적인 방법으로는 해당사항 없음)
        window.location.href = '../html/signup.html';
    else //정상적이라면 여기까지 올 리가 없다
        alert('ERROR');
}