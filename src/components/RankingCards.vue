<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
<template>
<!--  <div class="flex flex-wrap flex-row -mx-4 text-center">-->
    <div class="relative max-w-full w-full">
      <!-- card -->
      <div class="transform ease-in-out hover:-translate-y-0.25 my-2">
        <div class="flex-shrink px-[2.5px] py-[10px] max-w-full w-full">
          <!--card-->
        <router-link v-if="isTutor" :to="{ name: 'ProfilePage', params: { id: person.id } }">
          <div class="container bg-white flex flex-col-2 p-2 border border-blue-500 border-2 rounded-2xl w-full gap-4">
            <!--profile-image-->
            <span class="rounded-full w-[50px] ">
              <img v-if="!person.profileImg" :src="icon" alt="profile">
              <img v-else :src="person.profileImg" alt="profile">
            </span>
            <div class="mx-2 w-full text-bold">
            <li><b>{{person.user.displayname}}</b></li>
            <div>
            Points accumulated : {{person.rewardPoints}}
            </div>
          </div>
        </div>
        </router-link>
                <router-link v-if="isStudent" :to="{ name: 'StProfilePage', params: { id: person.id } }">
          <div class="container bg-white flex flex-col-2 p-2 border border-blue-500 border-2 rounded-2xl w-full gap-4">
            <!--profile-image-->
            <span class="rounded-full w-[50px] ">
              <img v-if="!person.profileImg" :src="icon" alt="profile">
              <img v-else :src="person.profileImg" alt="profile">
            </span>
            <div class="mx-2 w-full text-bold">
            <li><b>{{person.user.displayname}}</b></li>
            <div>
            Points accumulated : {{person.rewardPoints}}
            </div>
          </div>
        </div>
        </router-link>
      </div>
      </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js"
export default {
  name: "RankingCards",
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      icon: require("@/assets/icon.png"),
    };
  },
  computed:{
    isStudent(){
      return AuthService.checkhasRoles(this.person, 'ROLE_STUDENT');
    },
    isTutor(){
      return AuthService.checkhasRoles(this.person, 'ROLE_TUTOR');
    }
  }
};
</script>