<template>
    <div class="flex p-4 w-auto max-w-2xl h-full md:h-auto items-center mx-auto">
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
            h-[50px]
          "
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Requests
          </h3>
        </div>
        <!-- Modal body -->
        <div class="flex-auto w-half relative pd-4">
          <div class="ml-[10px] mr-[10px] pd-4">
            <RequestCard
              v-for="request in requests"
              :key="request.id"
              :request="request"
            />
          </div>
        </div>
        <!-- Modal footer -->
        <div v-if="count > 3"
          class="
            flex
            items-center
            p-6
            space-x-2
            rounded-b
            border-t border-gray-200
            dark:border-gray-600
            flex-wrap
            justify-items-center
            w-full
            flex col-end-2
          "
        >
          <a
            href="#" v-if="reqpage != 1" @click="prevPage"
            class="
              inline-flex
              items-center
              py-2
              px-4
              mr-3
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
            "
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
            Previous
          </a>
          <a
            href="#" v-if="hasNextPage" @click="nextPage"
            class="
              inline-flex
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
            "
          >
            Next
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
          </a>
        </div>
      </div>
    </div>

</template>

<script>
import RequestService from "@/services/RequestService";
import RequestCard from "@/components/RequestCard";
import GStore from "@/store";

export default {
  name: "RequestSent",
  components: { RequestCard },
  data() {
    return {
      count: 0,
      isClicked: false,
      requests: null,
      reqpage: 1,
    };
  },
  methods: {
    nextPage() {
      this.reqpage += 1;
      RequestService.getRequestStudent(
        this.reqpage,
        3,
        GStore.currentUser.student.id
      ).then((response) => {
        this.requests = response.data.data.getRequestsStudentSide.content;
      });
    },
    prevPage() {
      this.reqpage -= 1;
      RequestService.getRequestStudent(
        this.reqpage,
        3,
        GStore.currentUser.student.id
      ).then((response) => {
        this.requests = response.data.data.getRequestsStudentSide.content;
      });
    },
  },
  created() {
    RequestService.getRequestStudent(this.reqpage, 3, GStore.currentUser.student.id).then(
      (response) => {
        this.count = response.data.data.getRequestsStudentSide.totalElements;
        this.requests = response.data.data.getRequestsStudentSide.content;
      }
    );
    
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(routeTo, routeFrom, next) {
    RequestService.getRequestStudent(this.reqpage, 3, GStore.currentUser.student.id)
    .then((response) => {
      next((comp) => {
        comp.count = response.data.data.getRequestsStudentSide.totalElements;
        comp.requests = response.data.data.getRequestsStudentSide.content;
      });
    });
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.count / 3);
      return this.reqpage < totalPages;
    },
  },
};
</script>

<style scoped>

</style>