<template>
  <div
    id="services"
    class="
      overflow-y-scroll
      section
      relative
      pt-20
      pb-8
      md:pt-16 md:pb-0
      bg-white
    "
  >
    <div
      :class="[
        (!showModal && 'container xl:max-w-6xl mx-auto px-4') ||
          (showModal &&
            'container xl:max-w-6xl mx-auto px-4 opacity-30 transition'),
      ]"
    >
      <header class="text-center mx-auto mb-2 lg:px-20">
        <h2 class="text-2xl leading-normal font-bold text-black">
          Where is My Tutor
        </h2>
      </header>
      <!--      searchbar-->
      <div
        class="searchbar container flex gap-5 items-center justify-items-center"
      >
        <form @submit="handleNameSearch">
          <!-- <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label> -->
          <div class="flex-auto w-half relative">
            <div
              class="
                flex
                absolute
                inset-y-0
                left-0
                items-center
                pl-3
                pointer-events-none
              "
            >
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="
                flex-auto
                w-[700px]
                p-4
                pl-10
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
              placeholder="Search Tutors"
              name="name"
              v-model="nameSearch"
            />
            <button
              type="submit"
              class="
                text-white
                absolute
                right-2.5
                bottom-2.5
                bg-blue-700
                hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                px-4
                py-2
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              "
            >
              Search by name
            </button>
          </div>
        </form>
        <button
          @click="showModal = true"
          class="
            text-white
            flex-auto
            bg-blue-700
            hover:bg-blue-800
            focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-4
            py-2
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
        >
          Search by preference
        </button>
      </div>

      <div class="flex flex-wrap flex-row mx-4 text-center items-center">
        
        <ProfileCard v-for="item in tutors" :key="item.id" :tutor="item" />

      </div>
      <div class="flex flex-col-2 items-center grid grid-cols-6">
        <router-link
          class="inline-flex
              relative
              items-center
              py-2
              px-4
              text-sm
              font-medium
              text-gray-500
              bg-white
              rounded-lg
              border border-gray-300
              hover:bg-gray-100 hover:text-gray-700
              dark:bg-gray-800
              dark:border-gray-700
              dark:text-gray-400
              dark:hover:bg-gray-700
              dark:hover:text-white
              left-0"
          id="page-prev"
          :to="{ name: 'TutorList', query: { page: page - 1, name: name } }"
          rel="prev"
          v-if="page != 1"
        >
        <svg
              aria-hidden="true"
              class="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          Prev Page</router-link
        >
        
        <router-link
          class="inline-flex
              col-end-7
              items-right
              py-2
              px-4
              text-sm
              font-medium
              text-gray-500
              bg-white
              rounded-lg
              border border-gray-300
              hover:bg-gray-100 hover:text-gray-700
              dark:bg-gray-800
              dark:border-gray-700
              dark:text-gray-400
              dark:hover:bg-gray-700
              dark:hover:text-white
              right-0
              relative"
          id="page-next"
          :to="{ name: 'TutorList', query: { page: page + 1, name: name } }"
          rel="next"
          v-if="hasNextPage"
        >
          Next Page
          <svg
              aria-hidden="true"
              class="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </router-link
        >
      </div>
    </div>
  </div>
  <!-- Main modal -->
  <div
    v-if="showModal"
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
            Search By Preference
          </h3>
          <button
            @click="showModal = false"
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
        <form @submit="handlePreferenceSearch">
          <div class="flex-auto w-half relative">
            <select
              @change="InputCategory()"
              class="
                flex-auto
                w-[550px]
                ml-[30px]
                mr-[30px]
                p-4
                pl-5
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
              id="category"
              name="category"
            >
              <option class="text-gray" value="" disabled selected>
                Select Categories
              </option>
              <option
                class="text-gray"
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            <select
              v-if="subjects"
              class="
                flex-auto
                w-[550px]
                ml-[30px]
                mr-[30px]
                p-4
                pl-5
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
              id="subject"
              name="subject"
            >
              <option class="text-gray" value="" disabled selected>
                Select Subjects
              </option>
              <option
                class="text-gray"
                v-for="subject in subjects"
                :key="subject.id"
                :value="subject.id"
              >
                {{ subject.name }}
              </option>
            </select>
            <select
              class="
                flex-auto
                w-[550px]
                ml-[30px]
                mr-[30px]
                p-4
                pl-5
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
              id="preference"
              name="preference"
            >
              <option class="text-gray" value="" disabled selected>
                Select Preference
              </option>
              <option
                class="text-gray"
                v-for="pref in preferences"
                :key="pref.id"
                :value="pref.id"
              >
                {{ pref.name }}
              </option>
            </select>
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
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "@/components/ProfileCard";
import TutorService from "@/services/TutorService.js";
import CategoryService from "@/services/CategoryService";
import SubjectService from "@/services/SubjectService";
import PreferenceService from "@/services/PreferenceService";

export default {
  name: "TutorList",
  props: {
    page: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleNameSearch(name) {
      this.$router.push({ name: "TutorList", query: { page: 1, name: name } });
      // TutorService.searchByName(name ,parseInt(routeTo.query.page) || 1,3)
    },
    handlePreferenceSearch(input) {
      this.showModal = false
      console.log("Subject ID"+input.target.subject.value)
      console.log("Preference ID"+input.target.preference.value)
      this.$router.push({ name: "TutorListPrefered", query: { page: 1, subj: input.target.subject.value, pref: input.target.preference.value } });
    },
    InputCategory() {
      var id = document.getElementById("category");
      var option = id.options[id.selectedIndex];
      SubjectService.getSubjects(option.value).then((response) => {
        this.subjects = response.data.data.getSubjects;
        console.log(this.subjects);
      });
    },
  },
  components: { ProfileCard },
  data() {
    return {
      tutors: null,
      preferences: null,
      totalElements: 0,
      nameSearch: "",
      showModal: false,
      subjects: null,
      selectedCategory: null,
      categories: null,
    };
  },
  created() {
    CategoryService.getCategories().then((response) => {
      this.categories = response.data.data.getCategories;
    });
    PreferenceService.getPreferences()
      .then((response) => {
        this.preferences = response.data.data.getPreferences;
      })
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    TutorService.searchByName(
      routeTo.query.name || "",
      parseInt(routeTo.query.page) || 1,
      3
    ).then((response) => {
      next((comp) => {
        comp.tutors = response.data.data.getMatchTutorPaginationByName.content;
        comp.totalElements =
          response.data.data.getMatchTutorPaginationByName.totalElements;
        comp.nameSearch = routeTo.query.name;
      });
    });
  },
  beforeRouteUpdate(routeTo) {
    TutorService.searchByName(
      routeTo.query.name || "",
      parseInt(routeTo.query.page) || 1,
      3
    ).then((response) => {
      this.tutors = response.data.data.getMatchTutorPaginationByName.content; // <-----
      this.totalElements =
        response.data.data.getMatchTutorPaginationByName.totalElements; // <-----
      this.nameSearch = routeTo.query.name;
    });
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalElements / 3);
      return this.page < totalPages;
    },
  },
};
</script>

