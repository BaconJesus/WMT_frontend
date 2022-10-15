<template>
<!--    <p class="text-sky-500 text-3xl">Where is My Tutor</p>-->
<div class="overflow-y-scroll h-screen">
<div :class="[
        (!(showPushModal || showCloseModal) && 'container mx-auto my-5  w-full ') ||
          ((showPushModal || showCloseModal) &&
            'container mx-auto my-5 w-full  opacity-30 transition') 
      ]">
  <div class="flex justify-center w-full ">
    <div class="w-96">
    <img :src="logo"  alt="profile">
    </div>
  </div>
  <div v-if="GStore.currentUser">
  <div v-if="GStore.currentUser.tutor" class="flex justify-center w-full ">
    <button @click="showPushModal = true" class="rounded mx-2 bg-blue-500 description px-4 py-2 ">Push post</button>
    <button v-if="checkHavePost" @click="showCloseModal = true" class="rounded mx-2 bg-blue-500 description px-4 py-2 ">Close post</button>
    <button v-else class="rounded mx-2 bg-grey-500 description px-4 py-2 " disabled>Close post</button>
  </div>
  </div>
  <div class="justify-center w-full mt-2">
  <PostsCard v-for="post in posts" :key="post.id" :post="post" />
  </div>

</div>
    <!-- Push modal -->
  <div
    v-if="showPushModal"
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
            Post Recruit/Finding Students
          </h3>
          <button
            @click="showPushModal = false"
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
        <form @submit="handlePushPost(GStore.currentUser.tutor.id)">
          <div class="flex-auto w-half relative">
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
              v-model="pushmessage"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
    <!-- Close modal -->
  <div
    v-if="showCloseModal"
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
            Close Post Recruit/Finding Students
          </h3>
          <button
            @click="showCloseModal = false"
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
        <form @submit="handleClosePost(this.tutorpost.id)">
          <div class="flex-auto w-half relative">
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
              v-model="closemessage"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import AppLayout from "@/layout/AppLayout.vue";
import PostsCard from "@/components/PostsCard.vue"
import PostService from "@/services/PostService.js"
import TutorService from '@/services/TutorService';
import GStore from '@/store'

export default {
  inject: ['GStore'],
  components: {PostsCard},
  name: "HomePage",
  props: {
    page: {
      type: Number,
      required: true,
    }
  },
  methods: {
    handlePushPost(tutorid) {
      PostService.updatePost(tutorid, this.pushmessage).then(() =>{
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        },1500)
      })
    },
    handleClosePost(postid) {
      PostService.closePost(postid, this.closemessage).then(() =>{
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        },1500)
      })
    }
  },
  data() {
    return {
      logo: require("@/assets/WMTLogo.png"),
      posts: null,
      totalElements: 0,
      pushmessage: "",
      closemessage: "",
      showPushModal: false,
      showCloseModal: false,
      tutorpost: null
    };
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    PostService.getPosts(
      parseInt(routeTo.query.page) || 1
    ).then((response) => {
      next((comp) => {
        comp.posts = response.data.data.getPosts.content;
        comp.totalElements =
        response.data.data.getPosts.totalElements;
        if(GStore.currentUser){
        if(GStore.currentUser.tutor){
          TutorService.getTutor(GStore.currentUser.tutor.id).then((res) => {
            console.log(res)
            comp.tutorpost = res.data.data.getTutor.posts;
          })
        }
        }
      });
    });
  },
  beforeRouteUpdate(routeTo) {
    PostService.getPosts(
      parseInt(routeTo.query.page) || 1,
    ).then((response) => {
      this.posts = response.data.data.getPosts.content; // <-----
      this.totalElements =
        response.data.data.getPosts.totalElements; // <-----
    });
    if(GStore.currentUser.tutor){
    TutorService.getTutor(GStore.currentUser.tutor.id).then((response) => {
        this.tutorpost = response.data.data.getTutor.posts;
      });
    }
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalElements / 3);
      return this.page < totalPages;
    },
    checkHavePost(){
      if(this.tutorpost != null){
          return true
      }
      else return false
    },
  },
    
};
</script>