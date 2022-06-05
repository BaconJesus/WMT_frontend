<template>
  <div class="bg-sky-300 h-[50px] px-4 hidden md:flex items-center">
    <div class="flex gap-x-4">
      <div v-for="item in navItems" :key="item.title">
        <router-link :to="item.path" class="text-white text-lg">
         {{ item.title }}
        </router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import { navItems } from "@/constants/navItems";
export default {
  name: "DesktopNavbar",
  data() {
    return {
      isNavOpen: false,
      navItems,
    };
  },
}
</script>

