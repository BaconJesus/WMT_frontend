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
      <header class="text-center mb-2 lg:px-20">
        <h2 class="text-2xl leading-normal font-bold text-black">
          Where is My Tutor
        </h2>
      </header>
      <!--      searchbar-->
      <div
        class="searchbar container flex gap-10 items-center justify-items-center"
      >
      <button
          @click="reset"
          class="
            text-white
            flex-auto
            bg-red-700
            hover:bg-red-800
            focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-4
            py-2
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
        >
          Reset
        </button>
       
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
        <router-link
          class="flex fixed left-0 text-center pd-[20px] mx-4 items-center"
          id="page-prev"
          :to="{ name: 'TutorList', query: { page: page - 1, name: name } }"
          rel="prev"
          v-if="page != 1"
        >
          Prev Page</router-link
        >
        <ProfileCard v-for="item in tutors" :key="item.id" :tutor="item" />
        
        <router-link
          class="flex fixed right-0 text-center pd-[20px] mx-4 items-center"
          id="page-next"
          :to="{ name: 'TutorList', query: { page: page + 1, name: name } }"
          rel="next"
          v-if="hasNextPage"
        >
          Next Page</router-link
        >
      </div>
      <div v-if="this.totalElements == 0" class="container object-none my-[300px] object-center h-full align-middle text-center items-center">No Tutors Found</div>
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
  name: "TutorListPrefered",
  props: {
    page: {
      type: Number,
      required: true,
    },
    pref: {
      type: String,
      required: false,
    },
    subj: {
      type: String,
      required: false,
    },
  },
  methods: {
    reset() {
      this.$router.push({ name: "TutorList"});
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
      nameSearch: '',
      totalElements: 0,
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
    TutorService.searchByPref(
      routeTo.query.subj || null,
      routeTo.query.pref || null,
      parseInt(routeTo.query.page) || 1,
      3
    ).then((response) => {
      next((comp) => {
        comp.tutors = response.data.data.getMatchTutorPaginationByStudentInput.content;
        comp.totalElements =
          response.data.data.getMatchTutorPaginationByStudentInput.totalElements;
      });
    });
  },
  beforeRouteUpdate(routeTo) {
    TutorService.searchByPref(
      routeTo.query.subj || null,
      routeTo.query.pref || null,
      parseInt(routeTo.query.page) || 1,
      3
    ).then((response) => {
      this.tutors = response.data.data.getMatchTutorPaginationByStudentInput.content; // <-----
      this.totalElements =
        response.data.data.getMatchTutorPaginationByStudentInput.totalElements; // <-----
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

