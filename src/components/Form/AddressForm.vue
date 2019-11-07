<template>
  <Form class="form-wrap" :model="form" ref="form" :rules="rules">
    <FormItem class="form-item-address" prop="name" label="收货人">
      <Input class="form-name form-input" v-model="form.name" placeholder="请使用真实姓名" />
    </FormItem>
    <FormItem class="form-item-address" prop="send_phone" label="联系电话">
      <Input
        class="form-phone form-input"
        v-model="form.send_phone"
        placeholder="请填写手机号"
        maxlength="11"
      />
    </FormItem>
    <FormItem prop="address" label="收货市/区">
      <Input class="form-input form-province" v-model="form.address.province" placeholder="省份" />
      <Input class="form-input form-city" v-model="form.address.city" placeholder="城市" />
      <Input class="form-input form-area" v-model="form.address.area" placeholder="地区" />
    </FormItem>
    <FormItem class="form-item-address" prop="addr" label="详细地址">
      <Input class="form-addr form-input" v-model="form.addr" placeholder="详细地址" />
    </FormItem>
    <div class="form-btn-group">
      <BaseButton class="form-btn form-submit" type="submit" @click="submit">确定</BaseButton>
    </div>
  </Form>
</template>

<script>
import Form from './Form';
import FormItem from './FormItem';
import Input from './Input';
import BaseButton from '../BaseButton';
export default {
  name: 'AddressForm',
  components: { Form, FormItem, Input, BaseButton },
  data() {
    return {
      form: {
        name: '',
        send_phone: '',
        address: {
          province: '',
          city: '',
          area: ''
        },
        addr: ''
      },
      rules: {
        name: [{ required: true, message: '请输入收货人', trigger: 'blur' }],
        send_phone: [
          {
            validator: (rule, value, callback) => {
              if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
                callback();
              } else {
                callback('请输入正确的手机号');
              }
            },
            trigger: 'blur'
          }
        ],
        address: {
          type: 'object',
          required: true,
          fields: {
            province: [
              { required: true, message: '请输入省份', trigger: 'blur' }
            ],
            city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
            area: [{ required: true, message: '请输入地区', trigger: 'blur' }]
          }
        },
        addr: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
      }
    };
  },
  mounted() {},
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('fail', valid);
          this.$alert(valid);
        } else {
          console.log('success', valid);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.form-wrap {
  @include wh(670, 610);
  @include center();
  padding: vw(45) vw(40) 0 vw(27);
  background-color: silver;
  .form-item-address {
    width: 100%;
    margin-bottom: vw(35);
  }
  .form-item-merge {
    @include flex(flex-start);
  }
  .form-input {
    padding-left: vw(15);
    font-size: vw(28);
    color: rgb(255, 255, 255);
    flex-grow: 1;
    border-bottom: 1px solid white;
    &::placeholder {
      color: rgba(251, 234, 218, 0.8);
    }
  }
  .form-province {
    width: vw(107);
    margin-right: vw(22);
  }
  .form-city {
    width: vw(112);
    margin-right: vw(18);
  }
  .form-area {
    width: vw(176);
  }
  .form-btn-group {
    margin-top: vw(33);
    @include flex();
  }
  .form-btn {
    @include wh(164, 53);
    border: 1px solid rgb(237, 213, 152);
    border-radius: vw(10);
    font-size: vw(31.2);
    line-height: 1.2;
    text-align: center;
    margin: 0 vw(55);
  }
  .form-cancel {
    color: rgb(237, 212, 150);
  }
  .form-submit {
    color: rgb(135, 30, 23);
    background-color: rgb(237, 212, 150);
  }
}
</style>
