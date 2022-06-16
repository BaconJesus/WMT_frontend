<template>
  <div class="gap-4 bg-sky-300 h-[60px] px-4 hidden md:flex items-center">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
    <div class="flex gap-x-4">
      <div v-for="item in navItems" :key="item.title">
        <router-link :to="item.path" class="text-white text-lg">
         {{ item.title }}
        </router-link
        >
      </div>
    </div>
    <div class="flex col-end-2">
      <div v-if="!GStore.currentUser" class="flex gap-x-4">
        <button @click="login" class="bg-white w-auto h-auto hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Login</button>
        <button @click="register" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Register</button>
      </div>
      <div v-if="GStore.currentUser" class="flex gap-x-4">
        <button @click="logout" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Logout</button>
        <div v-if="GStore.currentUser.student == null && GStore.currentUser.tutor">
        <div v-if="GStore.currentUser.tutor.profileImg == null" class="flex gap-x-4">
          <router-link :to="{ name: 'ProfilePage', params: { id: GStore.currentUser.tutor.id } }">
          <img :src="icon" alt="profile" class="w-10 h-10">
          <div class="text-white flex gap-x-4 items-center">{{GStore.currentUser.firstname}} {{GStore.currentUser.lastname}}</div>
          </router-link>
        </div>
        <div v-else>
          <router-link :to="{ name: 'ProfilePage', params: { id: GStore.currentUser.tutor.id } }">
          <img :src="GStore.currentProfileImg" alt="profile" class="w-10 h-10 rounded-full">
          <div class="text-white flex gap-x-4 items-center">{{GStore.currentUser.firstname}} {{GStore.currentUser.lastname}}</div>
          </router-link>
        </div>
        </div>
        <div v-if="GStore.currentUser.tutor == null && GStore.currentUser.student">
        <div v-if="GStore.currentUser.student.profileImg == null" class="flex gap-x-4">
          <router-link :to="{ name: 'StProfilePage', params: { id: GStore.currentUser.student.id } }">
          <img :src="icon" alt="profile" class="w-10 h-10">
          <div class="text-white flex gap-x-4 items-center">{{GStore.currentUser.firstname}} {{GStore.currentUser.lastname}}</div>
          </router-link>
        </div>
        <div v-else>
          <router-link :to="{ name: 'StProfilePage', params: { id: GStore.currentUser.student.id } }">
          <img :src="GStore.currentProfileImg" alt="profile" class="w-10 h-10 rounded-full">
          <div class="text-white flex gap-x-4 items-center">{{GStore.currentUser.firstname}} {{GStore.currentUser.lastname}}</div>
          </router-link>
        </div>
        </div>
        <div v-if="GStore.currentUser.tutor == null && GStore.currentUser.student == null">
        <div class="flex gap-x-4">
          <router-link :to="{ name: 'NoProfile' }">
          <img :src="icon" alt="profile" class="w-10 h-10">
          <div class="text-white flex gap-x-4 items-center">{{GStore.currentUser.firstname}} {{GStore.currentUser.lastname}}</div>
          </router-link>
        </div>
        </div>    
      </div> 
    </div>
    </div>
  </div>
</template>
<script>
import { navItems } from "@/constants/navItems";
import AuthService from "@/services/AuthService";
export default {
  inject: ['GStore'],
  name: "DesktopNavbar",
  data() {
    return {
      isNavOpen: false,
      navItems,
      icon: require("@/assets/icon.png"),
    };
  },
  computed: {
    currentUser() {
      return AuthService.getUser();
    },
  },
  methods: {
    login() {
      this.$router.push({
        name: 'LoginPage'
      })
    },
    register(){
      this.$router.push({
        name: 'RegisterCheck'
      })
    },
    logout(){
      AuthService.logout()
    }
  }
};
</script>

