//initial function
function initialize() {
    //load_From_Cookie();
    makeForms(true);
}
//Load data from cookie
function loadFromCookie() {
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
function makeForms(cookieVal) {
    index = cookieval? 1 : 0;
    Vue.use(VueFormWizard)
    new Vue({
        el: '#app',
        data: {
            cookieRes: index
        },
        methods: {
            onComplete: function () {
                alert('done');
                getHashValue();
            },
        }
    })
}
function getHashValue(){
    value = '123456'
    QRCode(value);
}
//Make QR Code Form
function QRCode(hashKey) {
    link = "https://61.80.79.85?val=";
    hashKey = 'hashKey'
    console.log(link+hashVal);
    Vue.use(VueQr)
    new Vue({
        el: '#QR',
        components: {
          qrcode: VueQr
        },
        data () {
          return {
            val: link+hashKey,
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