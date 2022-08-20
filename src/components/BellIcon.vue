<template>
  <button class="inline-block relative" @click="isClicked = !isClicked">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
    <span
      v-if="count != 0"
      class="
        absolute
        top-0
        right-0.5
        block
        h-3
        w-3
        rounded-full
        ring-2
        bg-red-600
        text-[10px] text-white
      "
      >{{ count }}</span
    >
  </button>
  <div
    v-if="isClicked"
    id="defaultModal"
    tabindex="-1"
    class="fixed top-[50px] right-0.5 z-50"
    aria-modal="true"
    role="dialog"
  >
    <div class="relative p-4 w-[400px] max-w-2xl h-full md:h-auto">
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
          <div class="ml-[10px] mr-[10px] pd-4" @click="isClicked = false">
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
  </div>
</template>
<script>
import RequestService from "@/services/RequestService";
import RequestCard from "@/components/RequestCard";

export default {
  name: "BellIcon",
  props: {
    tutor: {
      type: Object,
      required: true,
    },
  },
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
      RequestService.getPendingRequestTutor(
        this.reqpage,
        3,
        this.tutor.id
      ).then((response) => {
        this.requests = response.data.data.getRequestsTutorSide.content;
      });
    },
    prevPage() {
      this.reqpage -= 1;
      RequestService.getPendingRequestTutor(
        this.reqpage,
        3,
        this.tutor.id
      ).then((response) => {
        this.requests = response.data.data.getRequestsTutorSide.content;
      });
    },
  },
  created() {
    RequestService.getPendingRequestTutor(this.reqpage, 3, this.tutor.id).then(
      (response) => {
        this.count = response.data.data.getRequestsTutorSide.totalElements;
        this.requests = response.data.data.getRequestsTutorSide.content;
      }
    );
    
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(routeTo, routeFrom, next) {
    this.$forceUpdate()
    RequestService.getPendingRequestTutor(this.reqpage, 3, this.tutor.id)
    .then((response) => {
      next((comp) => {
        comp.count = response.data.data.getRequestsTutorSide.totalElements;
        comp.requests = response.data.data.getRequestsTutorSide.content;
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