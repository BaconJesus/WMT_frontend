<template>
  <div id="services" class="overflow-y-scroll section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white">
    <div class="container xl:max-w-6xl mx-auto px-4">
      <header class="text-center mx-auto mb-16 lg:px-20">
        <h2 class="text-2xl leading-normal font-bold text-black">Where is My Tutor</h2>
      </header>
<!--      searchbar-->
    <div class="searchbar">
      <form @submit="handleNameSearch">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
        <div class="relative">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-sky-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Tutors" name="name"
          v-model="nameSearch">
          <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>
    </div>
      <div class="flex flex-wrap flex-row mx-4 text-center">
        <ProfileCard v-for="item in tutors" :key="item.id" :tutor="item"/>
        <div class="flex h-screen fixed left-0 text-center pd-[20px] mx-4 items-center">
        <router-link
        id="page-prev"
        :to="{ name: 'TutorList', query: { page: page - 1, name: name } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page</router-link
      >
        </div>
      <div class="flex h-screen fixed right-0 text-center pd-[20px] mx-4 items-center">
      <router-link
      
        id="page-next"
        :to="{ name: 'TutorList', query: { page: page + 1, name: name } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page</router-link
      >
      </div>
      </div>
      
    </div>
  </div>

</template>

<script>
import ProfileCard from "@/components/ProfileCard";
import TutorService from "@/services/TutorService.js";

export default {
  name: "TutorList",
  props: {
    page: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    handleNameSearch(name) {
      this.$router.push({ name: "TutorList", query: { page: 1 , name: name } });
      // TutorService.searchByName(name ,parseInt(routeTo.query.page) || 1,3)
      }
  },
  components: {ProfileCard, },
  data() {
    return {
      tutors: null,
      totalElements: 0,
      nameSearch: ''
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    TutorService.searchByName(routeTo.query.name || '' ,parseInt(routeTo.query.page) || 1,3)
      .then((response) => {
        next((comp) => {
          comp.tutors = response.data.data.getMatchTutorPaginationByName.content;
          comp.totalElements = response.data.data.getMatchTutorPaginationByName.totalElements;
          comp.nameSearch = routeTo.query.name
        })
      })
  },
   beforeRouteUpdate(routeTo) {
   TutorService.searchByName(routeTo.query.name || '', parseInt(routeTo.query.page) || 1,3).then((response) => {
        this.tutors = response.data.data.getMatchTutorPaginationByName.content // <-----
        this.totalElements = response.data.data.getMatchTutorPaginationByName.totalElements; // <-----
        this.nameSearch = routeTo.query.name
      })
    },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalElements / 3)
      return this.page < totalPages
    }
  }

};
</script>

