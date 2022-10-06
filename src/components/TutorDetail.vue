<template>
    
  <!-- <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"> -->
    <div v-if="!tutor.active" class="gap-4 pd-auto bg-red-300 h-[40px] px-4 md:flex items-center justify-items-center">
        <p class="text-center w-full text-2xl">This user is restricted</p>
    </div>
  <div class="overflow-y-scroll bg-white h-screen">
    <div :class="[
        (!requestModal && 'container mx-auto my-5 p-5 w-[1200px]') ||
          (requestModal &&
            'container mx-auto my-5 p-5 w-[1200px] opacity-30 transition'),
      ]">
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
            <div class="container text-center">Reward Points: {{tutor.rewardPoints}}</div>
            
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
          <div v-if="!BeingStudent">
           <div class="mx-auto px-3 py-2 text-sm text-white bg-green-600 rounded w-[200px] flex text-center justify-center cursor-pointer"
           @click="requestModal = true">Tutoring Request</div>
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
                <router-link
                :to="{ name: 'StProfilePage', params: { id: items.id } }"
              >
                <img class="h-16 w-16 rounded-full mx-auto"
                     :src="items.profileImg"
                     alt=""
                     v-if="items.profileImg" />
                <img class="h-16 w-16 rounded-full mx-auto"
                     :src="icon"
                     alt=""
                     v-else />
                </router-link>
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
            <div class="container overflow-y-scroll h-[350px] text-gray-700">
              <div class="grid md:grid-cols-2 text-sm">
<!--                <div class="grid grid-cols-2">-->
                  <div class="description px-4 py-2 " v-if="tutor.rewardPoints < 30">{{tutor.description}}</div>
                  <BBCodeDescription :description="tutor.description" v-else/>
<!--                </div>-->
              </div>
            </div>
          </div>
          <!-- End about -->

          <div class="my-4"></div>

          <!-- Experience and education -->
          <div class="bg-white p-3 shadow-sm rounded-sm h-[150px]">

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
          <div class="grid-cols-2 p-3 w-auto">
            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <!-- <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span> -->
              <span class="tracking-wide">Reviews</span>
            </div>
                <div class="flex">Overall Rating <svg @click="setRating(1)" aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>{{tutor.overallRating}}
                 out of total {{tutor.reviewReceived}} reviews</div>
                <ReviewCard v-for="review in tutor.reviews" :key="review.id" :review="review" />
              </div>
                 <!-- comment box-->
          <div class="max-w-lg shadow-md " v-if="isLegit">
            <form action="" class="w-full p-4 ">
              <div class="mb-2">
                <label for="comment" class="text-lg text-gray-600">Add Review</label>
                <textarea class="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                          placeholder="" v-model="writing"></textarea>
                <div class="flex items-center">
                    <svg @click="setRating(1)" aria-hidden="true" :class="[(toRate>=1 && 'w-5 h-5 text-yellow-400 cursor-pointer') || (toRate<1 && 'w-5 h-5 text-gray-300 dark:text-gray-500 cursor-pointer')]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg @click="setRating(2)" aria-hidden="true" :class="[(toRate>=2 && 'w-5 h-5 text-yellow-400 cursor-pointer') || (toRate<2 && 'w-5 h-5 text-gray-300 dark:text-gray-500 cursor-pointer')]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg @click="setRating(3)" aria-hidden="true" :class="[(toRate>=3 && 'w-5 h-5 text-yellow-400 cursor-pointer') || (toRate<3 && 'w-5 h-5 text-gray-300 dark:text-gray-500 cursor-pointer')]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg @click="setRating(4)" aria-hidden="true" :class="[(toRate>=4 && 'w-5 h-5 text-yellow-400 cursor-pointer') || (toRate<4 && 'w-5 h-5 text-gray-300 dark:text-gray-500 cursor-pointer')]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg @click="setRating(5)" aria-hidden="true" :class="[(toRate>=5 && 'w-5 h-5 text-yellow-400 cursor-pointer') || (toRate<5 && 'w-5 h-5 text-gray-300 dark:text-gray-500 cursor-pointer')]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{{toRate}} out of 5</p>
                </div>

              </div>
              <button @click="sendReview" class="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded">Submit</button>
            </form>
          </div>
        </div>
          </div>
        </div>

      </div>
<div
    v-if="requestModal"
    id="defaultModal"
    tabindex="-1"
    class="
      overflow-y-auto overflow-x-hidden
      fixed
      top-0
      right-0
      left-0
      z-50
      w-full
      md:inset-0
      h-modal
      md:h-full
      justify-center
      items-center
      flex
    "
    aria-modal="true"
    role="dialog"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="
            flex
            justify-between
            items-start
            p-4
            rounded-t
            border-b
            dark:border-gray-600
          "
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Attach a message along
          </h3>
          <button
            @click="requestModal = false"
            type="button"
            class="
              text-gray-400
              bg-transparent
              hover:bg-gray-200 hover:text-gray-900
              rounded-lg
              text-sm
              p-1.5
              ml-auto
              inline-flex
              items-center
              dark:hover:bg-gray-600 dark:hover:text-white
            "
            data-modal-toggle="defaultModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div>
          <textarea
              type="search"
              id="default-search"
              class="
                flex-auto
                w-full
                p-4
                text-sm text-gray-900
                bg-blue-50
                rounded-lg
                border border-gray-300
                focus:ring-blue-500 focus:border-blue-500
                dark:bg-sky-200
                dark:border-gray-300
                dark:placeholder-gray-400
                dark:text-black
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              placeholder="Message"
              name="message"
              v-model="message"
            />
          </div>
          <!-- Modal footer -->
          <div
            class="
              flex
              items-center
              p-6
              space-x-2
              rounded-b
              border-t border-gray-200
              dark:border-gray-600
            "
          >
            <button
              @click="handleRequest(GStore.currentUser.student.id)"
              data-modal-toggle="defaultModal"
              type="submit"
              class="
                text-white
                bg-blue-700
                hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              "
            >
              Send tutoring request
            </button>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from "@/services/AuthService";
import TutorService from '@/services/TutorService';
import ReviewCard from '@/components/ReviewCard';
import RequestService from '@/services/RequestService';
import BBCodeDescription from '@/components/BBCodeDescription';
import ReviewService from '@/services/ReviewService';
import GStore from '@/store'
export default {
  name: "TutorDetail",
  components: {BBCodeDescription, ReviewCard},
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
    },
    
    BeingStudent(){
      if(GStore.currentUser.student){ return AuthService.hasTutor(this.tutor.id) }
      else return true
    },
    isLegit(){
      let rules1 = AuthService.hasRoles('ROLE_STUDENT');
      let rules2 = !AuthService.hasReviewed(this.tutor.reviews);
      let rules3 = AuthService.hasTutor(this.tutor.id);
      return rules1 && rules2 && rules3;
    }
  },
  data() {
    return {
      icon: require("@/assets/icon.png"),
      message: '',
      requestModal: false,
      writing: '',
      toRate: 5
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
    setRating(number){
        this.toRate = number;
    },
    sendReview(){
        ReviewService.sendReview(this.writing, this.toRate, GStore.currentUser.student.id, this.tutor.id)
        .then(()=>{
          setTimeout(() => {
                        // After 3 seconds remove it
                        location.reload()
                    }, 1500)
        })
    },
    unrestrict(id){
        if(confirm("Are you sure you want to return this user?")){
        TutorService.undeleteTutor(id).then(() =>{
            alert("This tutor is now unrestricted")
            this.$router.push({ name: "TutorNameList" });
        }
        )
        }
    },
    handleRequest(studentid){
      RequestService.sendRequest(this.tutor.id, studentid, this.message).then(() =>{
          this.$router.push({ name: "TutorList" });
      })
    }
  }
};
</script>