<template>
  <div id="services" class="overflow-y-scroll section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white">
    <div class="container xl:max-w-6xl mx-auto px-4">
    <p class="login
          flex
          items-center
          justify-center
          text-6xl
          font-sans font-bold
          text-gray-900
          drop-shadow-xl
          dark:text-cyan-500">Select Register Type</p>
    <div class="flex flex-wrap flex-row mx-4 text-center">
      <RoleCard v-for="item in role" :key="item.display" :role="item"/>
    </div>
    </div>
  </div>
</template>

<script>
// import AppLayout from "@/layout/AppLayout.vue";
import RoleCard from "@/components/RoleCard";
export default {
    inject: ['GStore'],
  name: "HomePage",
  components: {RoleCard, },
  data() {
    return {
      role: [
        {
          display:"Student",
          role:"student"
        },
        {
          display:"Tutor",
          role:"tutor"
        }
      ]
    }
  },
};
</script>