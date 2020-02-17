<template>
  <section id="Form">
    <PhoneForm></PhoneForm>
    <AddressForm></AddressForm>
  </section>
</template>

<script>
import PhoneForm from './PhoneForm';
import AddressForm from './AddressForm';
export default {
  name: 'FormPage',
  components: { PhoneForm, AddressForm }
};
</script>
<style lang="scss" scoped>
#Form {
  width: 100vw;
  height: 100vh;
  @include flex();
  flex-direction: column;
}
</style>
