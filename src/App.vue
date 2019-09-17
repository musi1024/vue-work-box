<template>
  <section id="app">
    <k-form :model="model" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
        <k-input v-model="model.username" autocomplete="off" placeholder="输入用户名"></k-input>
      </k-form-item>
      <k-form-item label="确认密码" prop="password">
        <k-input type="password" v-model="model.password" autocomplete="off"></k-input>
      </k-form-item>
      <k-form-item>
        <button @click="submitForm('loginForm')">提交</button>
      </k-form-item>
    </k-form>
    {{model}}
  </section>
</template>

<script>
import KForm from './components/Form/Form';
import KFormItem from './components/Form/FormItem';
import KInput from './components/Form/Input';
export default {
  name: 'App',
  components: {
    KForm,
    KFormItem,
    KInput
  },
  data() {
    return {
      model: { username: '', password: '' },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名'
          },
          {
            validator(rule, value) {
              return value === 'musi';
            },
            message: 'Value is not equal to "musi".'
          }
        ],
        password: [{ required: true, message: '请输入密码' }]
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        console.log('**debug**', valid);
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
