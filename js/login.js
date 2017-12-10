function login(){
    var data = {"id":  $('#lgin_id').val()
    };
    $.ajax({
        type: "POST",
        dataType: "text",
        data: data,
        url: "../php/login.php",
        success: function(res){
            if(res === 'exist')
                window.location.href = '../main.html';
            else if(res == 'empty')
                alert('해당하는 아이디(PIN)번호가 존재하지 않습니다');
            else
                alert('system err')
        }
    });
}