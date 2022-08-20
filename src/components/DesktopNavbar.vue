<template>
  <div class="gap-4 bg-sky-300 h-[60px] px-4 md:flex items-center">
    <div class="container flex flex-wrap items-center mx-auto">
    <div class="flex gap-x-4">
      <div v-for="item in navItems" :key="item.title">
        <router-link :to="item.path" class="text-white text-lg">
         {{ item.title }}
        </router-link
        >
      </div>
      <span v-if="isAdmin" class="flex gap-x-4">
        <router-link v-for="items in adminItems" :key="items.title" :to="items.path" class="text-white text-lg">
         {{ items.title }}
        </router-link>
        </span>
        </div>
      </div>
    <div class="flex col-end-2 h-[55px]">
      <div v-if="!GStore.currentUser" class="flex gap-x-4">
        <button @click="login" class="bg-white w-auto h-auto hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Login</button>
        <button @click="register" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Register</button>
      </div>
      <div v-if="GStore.currentUser" class="flex flex-col-3 gap-x-4 w-auto">
        <button @click="logout" class="bg-white h-[50px] mt-[5px] hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Logout</button>
        <div v-if="GStore.currentUser.student == null && GStore.currentUser.tutor" class="flex gap-2 w-[80px] items-center">
          <BellIcon :tutor="GStore.currentUser.tutor"/>  
          <router-link :to="{ name: 'ProfilePage', params: { id: GStore.currentUser.tutor.id } }" v-if="GStore.currentUser.tutor.profileImg == null" class="flex gap-x-4 w-[100px]">
          <img :src="icon" alt="profile" class="w-10 h-10">
          </router-link>
          <router-link :to="{ name: 'ProfilePage', params: { id: GStore.currentUser.tutor.id } }" v-else >
          <img :src="GStore.currentUser.tutor.profileImg" alt="profile" class="w-10 h-10 rounded-full">
          </router-link>
        </div>
        <div v-if="GStore.currentUser.tutor == null && GStore.currentUser.student">
        <div v-if="GStore.currentUser.student.profileImg == null" class="flex gap-x-4 w-[80px]">
          <router-link :to="{ name: 'StProfilePage', params: { id: GStore.currentUser.student.id } }">
          <img :src="icon" alt="profile" class="w-14 h-14">
          </router-link>
        </div>
        <div v-else>
          <router-link :to="{ name: 'StProfilePage', params: { id: GStore.currentUser.student.id } }">
          <img :src="GStore.currentUser.student.profileImg" alt="profile" class="w-10 h-10 rounded-full">
          </router-link>
        </div>
        </div>
        <div v-if="GStore.currentUser.tutor == null && GStore.currentUser.student == null">
        <div class="flex gap-x-4">
          <router-link :to="{ name: 'NoProfile' }">
          <img :src="icon" alt="profile" class="w-10 h-10">
          </router-link>
        </div>
        
        </div>
        <span v-if="GStore.currentUser" class="text-white flex w-[100px] gap-x-4 items-center">{{GStore.currentUser.displayname}}</span>    
      </div> 
    </div>
    </div>
</template>
<script>
import { navItems } from "@/constants/navItems";
import { adminItems } from "@/constants/adminItems";
import BellIcon from "@/components/BellIcon";
import AuthService from "@/services/AuthService";
export default {
  inject: ['GStore'],
  name: "DesktopNavbar",
  data() {
    return {
      isNavOpen: false,
      navItems, adminItems,
      icon: require("@/assets/icon.png"),
      pending: 0
    };
  },
  computed: {
    currentUser() {
      return AuthService.getUser();
    },
    isAdmin(){
      return AuthService.hasRoles('ROLE_ADMIN');
    }
  },
  components: { BellIcon },
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
      this.$router.push({
        name: 'HomePage'
      })
    }
  }
};
</script>

