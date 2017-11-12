//initial function
function initialize() {
    loadFromCookie();
}
//Load data from cookie
function loadFromCookie() {
    makeForms(getCookie('name'),getCookie('company'));
}
function saveToCookie(name, company) {
    setCookie('name',name,30)
    setCookie('company',company,30);
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function getHashValue(data, output, error){
    getRequest(
        '../php/saveInfo.php', // URL for the PHP file
            output,  // handle successful request
            error,    // handle error
         data //data
    );
}
function getRequest(url, success, error, data) {
    var req = false;
    req = new XMLHttpRequest();
    if (!req) return false;
    if (typeof success != 'function') success = function () {};
    if (typeof error!= 'function') error = function () {};
    req.onreadystatechange = function(){
        if(req.readyState == 4) {
            return req.status === 200 ? 
                success(req.responseText) : error(req.status);
        }
    }
    req.open("POST", url, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(encodeURI('val1=' + data[0] +'&val2='+ data[1] + '&val3=' + data[2] + '&count=' + data[3]));
    return req;
}
//Make Wizard form
function makeForms(name, company) {
    cookieVal = name != '' && company != '';
    if (cookieVal)
        index = 1;
    else
        index = 0;

    Vue.use(window.vuelidate.default)
    const {
        required,
        minLength,
    } = window.validators
    Vue.use(VueFormWizard)

    Vue.component('step1', {
        template: `<div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.본인이름.$error }">
            <label>본인 이름</label>
            <input class="form-control" v-model.trim="본인이름" @input="$v.본인이름.$touch()">
             <span class="help-block" v-if="$v.본인이름.$error && !$v.본인이름.required">본인 이름을 입력해주세요</span>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.회사이름.$error }">
            <label>회사</label>
            <input class="form-control" v-model.trim="회사이름" @input="$v.회사이름.$touch()">
             <span class="help-block" v-if="$v.회사이름.$error && !$v.회사이름.required">회사 이름을 입력해주세요/span>
          </div>
        </div>`,
        data() {
            return {
                본인이름: name,
                회사이름: company
            }
        },
        validations: {
            본인이름: {
                required
            },
            회사이름: {
                required
            },
            form: ['본인이름', '회사이름']
        },
        methods: {
            validate() {
                this.$v.form.$touch();
                var isValid = !this.$v.form.$invalid
                this.$emit('on-validate', this.$data, isValid)
                return isValid
            }
        }
    })
    Vue.component('step2', {
        template: `<div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.제품명.$error }">
            <label >제품명</label>
            <select class="form-control" v-model.trim="제품명" @input="$v.제품명.$touch()">
                <option>우유1호</option>
  			    <option>우유2호</option>
  				<option>저지방1호</option>
            </select>
            <span class="help-block" v-if="$v.제품명.$error && !$v.제품명.required">제품명을 골라주세요</span>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.등급.$error }">
            <label>등급</label>
           <select class="form-control" v-model.trim="등급" @input="$v.등급.$touch()">
                <option>1A</option>
  			    <option>1B</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
            </select>
            <span class="help-block" v-if="$v.등급.$error && !$v.등급.required">등급을 골라주세요</span>
            </div>
           <div class="form-group" v-bind:class="{ 'has-error': $v.지방률.$error }">
           <label>지방률</label>
            <select class="form-control" v-model.trim="지방률" @input="$v.지방률.$touch()">
                <option>0%</option>
                <option>1%</option>
                  <option>2%</option>
                  <option>3%</option>
  				<option>4%</option>
            </select>
            <span class="help-block" v-if="$v.지방률.$error && !$v.지방률.required">지방률을 골라주세요</span>
          </div>
        </div>`,
        data() {
            return {
                제품명: '우유1호',
                등급: '1A',
                지방률: '4%'
            }
        },
        validations: {
            제품명: {
                required
            },
            등급: {
                required
            },
            지방률: {
                required
            },
            form: ['제품명', '등급', '지방률']
        },
        methods: {
            validate() {
                this.$v.form.$touch();
                var isValid = !this.$v.form.$invalid
                this.$emit('on-validate', this.$data, isValid)
                return isValid
            }
        }
    })
    Vue.component('step3', {
        template: `<div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.갯수.$error }">
            <label >출력할 갯수</label>
            <select class="form-control" v-model.trim="갯수" @input="$v.갯수.$touch()">
                <option>1</option>
  			    <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
            </select>
            <span class="help-block" v-if="$v.갯수.$error && !$v.갯수.required">몇개어치를 하실건가요?</span>
          </div>
        </div>`,
        data() {
            return {
                갯수: '1',
            }
        },
        validations: {
            갯수: {
                required
            },
            form: ['갯수']
        },
        methods: {
            validate() {
                this.$v.form.$touch();
                var isValid = !this.$v.form.$invalid
                this.$emit('on-validate', this.$data, isValid)
                return isValid
            }
        }
    })
    new Vue({
        el: '#app',
        data: {
            finalModel: {
                본인이름: name,
                회사이름: company
            },
            cookieRes: index
        },
        methods: {
            validateStep(name) {
                var refToValidate = this.$refs[name];
                return refToValidate.validate();
            },
            mergePartialModels(model, isValid) {
                if (isValid) {
                    // merging each step model into the final model
                    this.finalModel = Object.assign({}, this.finalModel, model)
                }
            },
            onComplete: function () {
                saveToCookie(this.finalModel.본인이름, this.finalModel.회사이름);
                getHashValue([this.finalModel.제품명,this.finalModel.등급, this.finalModel.지방률, this.finalModel.갯수],CreateQRCode,null);
            }
        }
    })
}
//QR loop
function CreateQRCode(data){
    jsondata = JSON.parse(data);
    for(dat in jsondata)
        QRCode(dat);
}
//Make QR Code Form
function QRCode(hashVal) {
    if(!hashVal){ alert('ERROR'); return;}
    link = "https://61.80.79.85/index.php?val=";

    //append HTML
    var parent = document.getElementsByClassName('QRBASE');
    var node = document.createElement("div");
    node.innerHTML = 
    '<div id="QR_'+hashval+'">' +
    '<div id="wrapper">' +
    '<qrcode :val="val" :size="size" :bg-color="bgColor" :fg-color="fgColor" level="L">'+
    '</qrcode>' +
    '</div>'+
    '</div>';
    parent.appendChild(node);
    parent.insertAfter(node, parent.firstChild);
    //append VUE
    Vue.use(VueQr)
    new Vue({
        el: '#QR_'+hashVal,
        components: {
            qrcode: VueQr
        },
        data() {
            return {
                val: link + hashVal,
                bgColor: "#FFFFFF",
                fgColor: "#000000",
                size: 200
            }
        },
        filters: {
            toNumber: {
                read(val) {
                    return Number(val)
                },
                write(val) {
                    return Number(val)
                }
            }
        }
    })
}