<template>
  <div class="flex flex-col h-screen overflow-hidden">
  <AppLayout />
  <router-view />
  </div>
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