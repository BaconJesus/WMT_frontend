<template>
  <AppLayout />
  <router-view />

</template>

<script>
import AppLayout from "@/layout/AppLayout";
export default {
  name: "App",
  components: {AppLayout},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>