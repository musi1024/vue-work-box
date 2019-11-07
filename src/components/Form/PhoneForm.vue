<template>
  <Form
    class="form-wrap-phone"
    ref="form"
    :model="form"
    :rules="rules"
    :valudateOnInput="false"
    :useErrorMessage="false"
  >
    <FormItem class="form-item-phone" prop="phone">
      <Input
        class="form-phone form-input"
        v-model="form.phone"
        placeholder="输入手机号"
        maxlength="11"
        type="tel"
      />
    </FormItem>
    <FormItem class="form-item-phone" prop="picCode">
      <Input
        class="form-pic form-input"
        v-model="form.picCode"
        placeholder="请输入图形验证码"
        maxlength="4"
        type="tel"
      />
      <div class="form-pic-code" />
    </FormItem>
    <FormItem class="form-item-phone" prop="smsCode">
      <Input
        class="form-sms form-input"
        v-model="form.smsCode"
        placeholder="输入短信验证码"
        maxlength="6"
        type="tel"
      />
      <BaseButton class="form-get-sms" type="submit" @click="validate('sms')">{{ getSmsText }}</BaseButton>
    </FormItem>
    <BaseButton class="form-submit" type="submit" @click="validate()">submit</BaseButton>
  </Form>
</template>

<script>
import Form from './BaseForm';
import FormItem from './BaseFormItem';
import Input from './BaseFormInput';
import BaseButton from '../BaseButton';
export default {
  name: 'PhoneForm',
  components: { Form, FormItem, Input, BaseButton },
  data() {
    return {
      lock: false,
      gettingSms: false,
      time: 60,
      timeout: null,
      form: {
        phone: '',
        picCode: '',
        smsCode: ''
      },
      rules: {
        phone: [
          {
            message: '手机号不正确',
            required: true,
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            trigger: 'blur'
          }
        ],
        picCode: [
          {
            required: true,
            len: 4,
            message: '图形验证码不正确',
            trigger: 'blur'
          }
        ],
        smsCode: [
          {
            required: true,
            len: 6,
            message: '短信验证码不正确',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    getSmsText() {
      return this.gettingSms ? `${this.time}s` : '获取验证码';
    }
  },
  beforeDestroy() {
    clearInterval(this.timeout);
  },
  methods: {
    validate(type) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$alert(valid);
        } else if (type !== 'sms') {
          this.$emit('aaa');
        } else {
          this.getSmsCode();
        }
      }, type === 'sms' && ['phone', 'picCode']);
    },
    async getSmsCode() {
      if (!this.gettingSms) {
        this.handlerGetSms();
      }
    },
    handlerGetSms() {
      this.gettingSms = true;
      this.time = 60;
      this.timeout = setInterval(() => {
        if (this.time > 1) {
          this.time -= 1;
        } else {
          this.gettingSms = false;
          clearInterval(this.timeout);
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.form-wrap-phone {
  @include wh(467, 380);
  @include flex(flex-start, flex-start);
  flex-direction: column;
}
.form-item-phone {
  @include flex(space-between);
  width: 100%;
  margin-bottom: vw(21);
}
.form-input {
  padding: 0 vw(18);
  border-radius: vw(10);
  background-color: rgb(255, 242, 210);
  box-shadow: 1px 2px 0px 0px rgb(255, 86, 40);
  font-size: vw(26);
  color: rgb(137, 137, 137);
  &::-ms-input-placeholder {
    padding: vw(4) 0;
  }
  &::-webkit-input-placeholder {
    padding: vw(4) 0;
  }
}
.form-phone {
  @include wh(464, 56);
}
.form-sms,
.form-pic {
  @include wh(315, 56);
}
.form-pic-code {
  @include wh(134, 56);
  border-radius: vw(10);
  background-color: rgb(255, 242, 210);
  box-shadow: 1px 2px 0px 0px rgb(255, 86, 40);
}
.form-get-sms {
  @include wh(135, 56);
  border-radius: vw(10);
  background-image: -webkit-linear-gradient(
    360deg,
    rgb(255, 68, 0) 0%,
    rgb(255, 87, 7) 25%,
    rgb(255, 126, 22) 100%
  );
  background-image: linear-gradient(
    360deg,
    rgb(255, 68, 0) 0%,
    rgb(255, 87, 7) 25%,
    rgb(255, 126, 22) 100%
  );
  box-shadow: 0px 2px 0px 0px rgb(255, 87, 7);
  font-size: vw(21.88);
  color: rgb(255, 255, 255);
  line-height: 3;
  text-shadow: 0px 3px 1px rgba(187, 74, 20, 0.35);
}
.form-submit {
  @include wh(468, 60);
  background-color: rgb(255, 126, 22);
  font-size: vw(30);
  color: rgb(255, 255, 255);
  text-shadow: 0px 1px 1px rgba(187, 74, 20, 0.35);
}
.form-tips {
  margin: vw(20) auto 0;
  font-size: vw(18);
  color: rgb(255, 228, 137);
  line-height: 1.441;
  text-align: center;
}
</style>
