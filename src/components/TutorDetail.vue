<template>
    
  <!-- <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"> -->
    <div v-if="!tutor.active" class="gap-4 pd-auto bg-red-300 h-[40px] px-4 md:flex items-center justify-items-center">
        <p class="text-center w-full text-2xl">This user is restricted</p>
    </div>
  <div class="overflow-y-scroll bg-white">
    <div class="container mx-auto my-5 p-5 w-[1200px]">
      <div class="md:flex no-wrap md:-mx-2 ">
        <!-- Left -->
        <div class="w-full md:w-3/12 md:mx-2">
          <!-- Profile Card -->
          <div class="bg-white p-3 border-t-4 border-sky-400">
            <div class="image overflow-hidden">
              <div class="h-auto w-full mx-auto rounded-lg" v-if="!tutor.profileImg">
              <img :src="icon" />
            </div>
            <div class="h-auto w-full mx-auto rounded-lg" v-else>
              <img :src="tutor.profileImg" class="h-[300px] w-[300px]"/>
            </div>
            </div>
            <h1 class="flex justify-center mx-auto name text-gray-900 font-bold text-xl leading-8 my-1" v-if="tutor">{{tutor.user.firstname}} {{tutor.user.lastname}}</h1>
            
          </div>
          <div v-if="GStore.currentUser.tutor">
           <router-link v-if="GStore.currentUser.tutor.id === tutor.id" :to="{ name: 'EditTutor', params: { id: tutor.id } }"
           class="mx-auto px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded w-[200px] flex text-center justify-center">Edit</router-link>
          </div>
                    <div v-if="isAdmin && tutor.active">
           <div class="mx-auto px-3 py-2 text-sm text-white bg-red-600 rounded w-[200px] flex text-center justify-center cursor-pointer"
           @click="restrict(tutor.id)">Restrict</div>
          </div>
          <div v-if="isAdmin && !tutor.active">
           <div class="mx-auto px-3 py-2 text-sm text-white bg-green-600 rounded w-[200px] flex text-center justify-center cursor-pointer"
           @click="unrestrict(tutor.id)">Unrestrict</div>
          </div>
          <!-- Student list  -->
          <div class="bg-white p-3 hover:shadow">
            <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                        <span class="text-green-500">
                            <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </span>
              <span>Student list</span>
            </div>
            <div class="grid grid-cols-3">
              <div class="text-center my-2" v-for="items in tutor.students" :key="items.id">
                <img class="h-16 w-16 rounded-full mx-auto"
                     :src="items.profileImg"
                     alt=""
                     v-if="items.profileImg" />
                <img class="h-16 w-16 rounded-full mx-auto"
                     :src="icon"
                     alt=""
                     v-else />
                <a href="#" class="text-main-color">{{items.user.displayname}}</a>
              </div>
            </div>
          </div>
        </div>
        <!-- Right Side -->
        <div class="w-full md:w-9/12 mx-2 h-64">
          <!-- Profile tab -->
          <!-- About Section -->
          <div class="bg-white p-3 shadow-sm rounded-sm">
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
            <div class="text-gray-700 h-[100px]">
              <div class="grid md:grid-cols-2 text-sm">
<!--                <div class="grid grid-cols-2">-->
                  <div class="description px-4 py-2 ">{{tutor.description}}</div>
<!--                </div>-->
              </div>
            </div>
          </div>
          <!-- End about -->

          <div class="my-4"></div>

          <!-- Experience and education -->
          <div class="bg-white p-3 shadow-sm rounded-sm">

            <div class="grid grid-cols-2">
              <div>
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </span>
                  <span class="tracking-wide">Preference</span>
                </div>
                <ul class="list-inside space-y-2">
                  <li v-for="items in tutor.preferences" :key="items.name">
                    <div class="preference text-teal-600">{{items.name}}</div>
                  </li>
                </ul>
              </div>
              <div>
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path fill="#fff"
                                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                    </svg>
                                </span>
                  <span class="tracking-wide">Subject</span>
                </div>
                <ul class="list-inside space-y-2">
                  <li v-for="items in tutor.subjects" :key="items.name">
                    <div class="subject text-teal-600">{{items.name}}</div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- End of Subject, preferrence -->
          </div>
          <!--        comment box-->
          <!-- <div class="max-w-lg shadow-md ">
            <form action="" class="w-full p-4 ">
              <div class="mb-2">
                <label for="comment" class="text-lg text-gray-600">Add Review</label>
                <textarea class="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                          name="comment" placeholder=""></textarea>
              </div>
              <button class="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded">Submit</button>
            </form>
          </div> -->
        </div>

      </div>
    </div>
  </div>

</template>
<script>
import AuthService from "@/services/AuthService";
import TutorService from '@/services/TutorService'
export default {
  name: "TutorDetail",
  inject: ['GStore'],
  props: {
    tutor: {
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
        TutorService.deleteTutor(id).then(() =>{
            alert("This tutor is now restricted")
            this.$router.push({ name: "TutorNameList" });
        }
        )
        }
    },
    unrestrict(id){
        if(confirm("Are you sure you want to return this user?")){
        TutorService.undeleteTutor(id).then(() =>{
            alert("This tutor is now unrestricted")
            this.$router.push({ name: "TutorNameList" });
        }
        )
        }
    }
  }
};
</script>