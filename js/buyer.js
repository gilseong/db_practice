var KEY;
function init_buyer(HashVal){
    KEY = HashVal;
    $('body').empty();
    $.ajax({
        url:"../html/buyer.html",
        context: document.body, 
        success: function(response){
            $("body").html(response);
        }
    });
}

function load(dbtype){
    $('.main').empty();
    if(dbtype === 'PRODUCER')
        loadProducerBase();
    else if(dbtype === 'DISTRIBUTOR')
        loadDistributorBase();
}
//Producer Info
function loadProducerBase(){
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {"val1": KEY},
        url: "../php/producer_info.php",
        success: function(data){
            if(data != 'empty')
                loadProducerTable(data);
        }
    });
}
function loadProducerTable(data){
    $.ajax({
        url:"../html/producer.html",
        context: document.body, 
        success: function(response){
            $(".main").html(response);
            loadProducerTableInfo(data);
        }
    });
}
function loadProducerTableInfo(data){
    $('.panel-heading').html('생산품 정보');
    $.each(data, function() {
        $("#tableinit").append(
        '<tr class= "'+this.PRODUCT_ID+'" role="row">'+
        '<td>'+ this.PRODUCT_ID+ '</td>'+
        '<td>'+ this.PRODUCT_NAME+ '</td>'+
        '<td>'+this.MILK_TYPE+'</td>'+
        '<td>'+this.FAT_RATE+'</td>'+
        '<td>'+this.PRODUCT_SINCE+'</td>'+
        '</tr>');
    });
    $('#dataTables').DataTable();
}
//Distributor Info
function loadDistributorBase(){
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {"val1": KEY},
        url: "../php/producer_info.php",
        success: function(data){
            if(data != 'empty')
            loadDistributorTable(data);
        }
    });
}
function loadDistributorTable(data){
    $.ajax({
        url:"../html/producer.html",
        context: document.body, 
        success: function(response){
            $(".main").html(response);
            loadDistributorTableInfo(data);
        }
    });
}
function loadDistributorTableInfo(data){
    $('.panel-heading').html('유통 정보');
    $.each(data, function() {
        $("#tableinit").append(
        '<tr class= "'+this.DISTRIB_ID+'" role="row">'+
        '<td>'+ this.DISTRIB_ID+ '</td>'+
        '<td>'+ this.NAME+ '</td>'+
        '<td>'+this.JOB+'</td>'+
        '</tr>');
    });
    $('#dataTables').DataTable();
}