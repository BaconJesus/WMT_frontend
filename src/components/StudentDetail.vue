<template>
    
  <!-- <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"> -->
    <div v-if="!student.active" class="gap-4 pd-auto bg-red-300 h-[40px] px-4 md:flex items-center justify-items-center">
        <p class="text-center w-full text-2xl">This user is restricted</p>
    </div>
  <div class="overflow-y-scroll bg-white">
    <div class="container mx-auto my-5 p-5 w-[1200px]">
      <div class="md:flex no-wrap md:-mx-2 ">
        <!-- Left -->
        <!-- {{student}} -->
        <div class="w-full md:w-3/12 md:mx-2">
          <!-- Profile Card -->
          <div class="bg-white p-3 border-t-4 border-sky-400">
            <div class="image overflow-hidden">
              <div class="h-auto w-full mx-auto rounded-lg" v-if="!student.profileImg" >
              <img :src="icon" />
            </div>
            <div class="h-auto w-full mx-auto rounded-lg" v-else>
              <img :src="student.profileImg" class="h-[300px] w-[300px]"/>
            </div>
            </div>
            <h1 class="flex justify-center mx-auto name text-gray-900 font-bold text-xl leading-8 my-1" v-if="student">{{student.user.firstname}} {{student.user.lastname}}</h1>
            <div class="container text-center">Reward Points: {{student.rewardPoints}}</div>
         
          </div>
          <div v-if="GStore.currentUser.student">
           <router-link v-if="GStore.currentUser.student.id && GStore.currentUser.student.id === student.id" :to="{ name: 'EditStudent', params: { id: student.id } }"
           class="mx-auto px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded w-[200px] flex text-center justify-center">Edit</router-link>
          </div>
          <div v-if="isAdmin && student.active">
           <div class="mx-auto px-3 py-2 text-sm text-white bg-red-600 rounded w-[200px] flex text-center justify-center cursor-pointer"
           @click="restrict(student.id)">Restrict</div>
          </div>
          <div v-if="isAdmin && !student.active">
           <div class="mx-auto px-3 py-2 text-sm text-white bg-green-600 rounded w-[200px] flex text-center justify-center cursor-pointer"
           @click="unrestrict(student.id)">Unrestrict</div>
          </div>
          <!-- Student list  -->
          <div class="bg-white p-3 hover:shadow">
          </div>
        </div>
        <!-- Right Side -->
        <div class="w-full md:w-9/12 mx-2 h-64">
          <!-- Profile tab -->
          <!-- About Section -->
          <div :class="[
        ((student.rewardPoints < 30) && 'bg-white p-3 shadow-sm rounded-sm') ||
          (!(student.rewardPoints < 30) &&
            'bg-white p-3 shadow-sm rounded-sm border border-blue-500 border-2 rounded'),
          ]">
            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
              <span class="tracking-wide">About</span>
                          </div>
            <div class="container overflow-y-scroll h-[350px] text-gray-700">
              <div class="grid md:grid-cols-2 text-sm">
<!--                <div class="grid grid-cols-2">-->
                  <div class="description px-4 py-2 " v-if="student.rewardPoints < 30">{{student.description}}</div>
                  <BBCodeDescription :description="student.description" v-else/>
<!--                </div>-->
              </div>
            </div>
          </div>
          <!-- End about -->
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import AuthService from "@/services/AuthService";
import StudentService from '@/services/StudentService'
import BBCodeDescription from '@/components/BBCodeDescription';
export default {
  name: "StudentDetail",
  components: {BBCodeDescription},
  inject: ['GStore'],
  props: {
    student: {
      type: Object,
      required: true
    }
  },
  computed:{
    isAdmin(){
      return AuthService.hasRoles('ROLE_ADMIN');
    }
  },
  data() {
    return {
      icon: require("@/assets/icon.png"),
    };
  },
  methods:{
    restrict(id){
        if(confirm("Are you sure you want to restrict this user?")){
        StudentService.deleteStudent(id).then(() =>{
            alert("This student is now restricted")
            this.$router.push({ name: "StudentNameList" });
        }
        )
        }
    },
    unrestrict(id){
        if(confirm("Are you sure you want to return this user?")){
        StudentService.undeleteStudent(id).then(() =>{
            alert("This student is now unrestricted")
            this.$router.push({ name: "StudentNameList" });
        }
        )
        }
    }
  }
};
</script>