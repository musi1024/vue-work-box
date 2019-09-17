<template>
  <section id="app">
    <Form :model="model" :rules="rules" ref="loginForm">
      <FormItem label="用户名" prop="username">
        <Input v-model="model.username" autocomplete="off" placeholder="输入用户名" />
      </FormItem>
      <button type="submit" @click="submitForm('loginForm')">submit</button>
    </Form>
  </section>
</template>

<script>
import Form from './components/Form/Form';
import FormItem from './components/Form/FormItem';
import Input from './components/Form/Input';
export default {
  name: 'App',
  components: {
    Form,
    FormItem,
    Input
  },
  data() {
    return {
      model: {
        username: ''
      },
      rules: {
        username: { required: true, message: '请输入用户名' }
      }
    };
  },
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
