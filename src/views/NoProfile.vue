<template>
  <div
    class="
      main
      flex
      w-18
      overflow-y-scroll
      section
      relative
      pt-20
      pb-8
      md:pt-16 md:pb-0
      bg-white
      items-center
      justify-center
      h-screen
      flex-wrap 
      flex-col
    "
  >
  <div
    class="
      main
      flex
      w-18
      h-[350px]
      section
      relative
      pt-20
      pb-10
      p-10
      md:pt-16 md:pb-16
      bg-sky-200
      items-center
      justify-center
      place-content-center
      flex-wrap 
      flex-col
      border border-black
      border-2
      rounded-lg
    "
  >
    <p class="text-black text-xl">
      Please create profile page before exploring further
    </p>
    <div v-if="isStudent">
    <router-link :to="{ name: 'CreateStudent', params: { id: GStore.currentUser.id } }">
      <button
        class="
          bg-blue-500
          py-2
          px-4
          hover:bg-blue-600
          text-white
          w-full
          font-semibold
          rounded-lg
          shadow-lg
        "
      >
        Create Profile
      </button>
    </router-link>
    </div>
    <div v-if="isTutor" class="flex mt-10">
    <router-link :to="{ name: 'CreateTutor', params: { id: GStore.currentUser.id } }">
      <button
        class="
          bg-blue-500
          py-2
          px-4
          hover:bg-blue-600
          text-white
          w-full
          font-semibold
          rounded-lg
          shadow-lg
        "
      >
        Create Profile
      </button>
    </router-link>
    </div>
  </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  inject: ["GStore"],
  name: "HomePage",
  computed: {
    isStudent(){
      return AuthService.hasRoles('ROLE_STUDENT')
    },
    isTutor(){
      return AuthService.hasRoles('ROLE_TUTOR')
    }
  }
};
</script>