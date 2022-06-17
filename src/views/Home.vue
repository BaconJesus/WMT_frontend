<template>
<!--    <p class="text-sky-500 text-3xl">Where is My Tutor</p>-->
  <div class="flex justify-center w-full ">
    <div class="w-96">
    <img :src="logo"  alt="profile">
    </div>
  </div>
</template>

<script>
// import AppLayout from "@/layout/AppLayout.vue";

export default {
    inject: ['GStore'],
  name: "HomePage",
  data() {
    return {
      logo: require("@/assets/WMTLogo.png"),
    };
  },
};
</script>