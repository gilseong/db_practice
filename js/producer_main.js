//initial function
function initialize() {
    //load_From_Cookie();
    make_Forms();
}
//Load data from cookie
function load_From_Cookie() {
    $.ajax({
        type: 'GET',
        url: '../index.html',
        success: function (output, status, xhr) {
            console.log(xhr.getResponseHeader("get-cookie"));
            make_Forms();
        },
        cache: false
    });
}
//Make Wizard form
function make_Forms() {
    cookieVal = true
    if (cookieVal)
        index = 1;
    else
        index = 0;
    Vue.use(VueFormWizard)
    new Vue({
        el: '#app',
        data: {
            cookieRes: index
        },
        methods: {
            onComplete: function () {
                alert('done');
                QRCode();
            },
        }
    })
}
//Make QR Code Form
function QRCode() {
    link = "https://61.80.79.85?val=";
    hashVal = '123456'
    console.log(link+hashVal);
    Vue.use(VueQr)
    new Vue({
        el: '#QR',
        components: {
          qrcode: VueQr
        },
        data () {
          return {
            val: link+hashVal,
            bgColor: "#FFFFFF",
            fgColor: "#000000",
            size: 200
          }
        },
        filters: {
          toNumber: {
            read (val) {
              return Number(val)
            },
            write (val) {
              return Number(val)
            }  
          }
        }
      })
}