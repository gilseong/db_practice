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
                본인이름: '',
                회사이름: ''
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
  			    <option>2%</option>
  				<option>4%</option>
            </select>
            <span class="help-block" v-if="$v.지방률.$error && !$v.지방률.required">지방률을 골라주세요</span>
          </div>
        </div>`,
        data() {
            return {
                제품명: '',
                등급: '',
                지방률: ''
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
    new Vue({
        el: '#app',
        data: {
            finalModel: {},
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
                console.log(this.finalModel);
                QRCode();
            }
        }
    })
}
//Make QR Code Form
function QRCode() {
    link = "https://61.80.79.85?val=";
    hashVal = '123456'
    console.log(link + hashVal);
    Vue.use(VueQr)
    new Vue({
        el: '#QR',
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