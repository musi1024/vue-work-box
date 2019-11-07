<template>
  <section id="Form">
    <!-- <PhoneForm></PhoneForm> -->
    <AddressForm></AddressForm>
  </section>
</template>

<script>
// import PhoneForm from '../components/Form/PhoneForm';
import AddressForm from '../components/Form/AddressForm';
export default {
  name: 'FormPage',
  components: { AddressForm },
  methods: {}
};
</script>
<style lang='scss' scoped>
</style>