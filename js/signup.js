function signup(){
    var data = {
                "name":  $('#name').val(),
                "jop":  $('input[name="jop[]"]:checked').val()
    };
    console.log(data);
    $.ajax({
        type: "POST",
        dataType: "text",
        data: data,
        url: "../php/signup.php",
        success: function(res){
            if(res === 'exist')
                alert('이미 존재하는 아이디인데요! 이름에 숫자를 붙이시거나 or 연락주세요');//귀찮아요
            else if(res === 'error')
                alert('system err');
            else{
                alert('당신의 아이디(PIN)번호는: '+ res + ' 입니다. 메모해두세요'); //아이디 찾기는 지금 만들기는 귀찮아요. 과제인걸
                alert('등록 완료! 바코드를 다시 찍어주세요!');
            }
        }
    });
}