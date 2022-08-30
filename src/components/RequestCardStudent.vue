<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
<template>
    <router-link
                :to="{ name: 'RequestDetails', params: { id: request.id } }"
              >
<!--  <div class="flex flex-wrap flex-row -mx-4 text-center">-->
    <div class="cursor-pointer relative max-w-full w-full">
      <!-- card -->
      <div class="transform ease-in-out hover:-translate-y-0.25 my-2">
        <div class="flex-shrink px-[2.5px] py-[10px] max-w-full w-full">
          <!--card-->
          <div class="container bg-white flex flex-col-2 p-2 border border-blue-500 border-2 rounded-2xl w-full gap-4">
            <!--profile-image-->
            <span class="rounded-full w-[50px] ">
              <img v-if="!request.tutor.profileImg" :src="icon" alt="profile">
              <img v-else :src="request.tutor.profileImg" alt="profile">
            </span>
            <span class="w-[300px]">
            <b>To : {{request.tutor.user.displayname}}</b>
            <div v-if="request.status == 'Pending'" class="text-yellow-500">{{request.status}}</div>
            <div v-if="request.status == 'Rejected'" class="text-red-600">{{request.status}}</div>
            <div v-if="request.status == 'Accepted'" class="text-green-500">{{request.status}}</div>
            </span>
          </div>
        </div>
      </div>
  </div>
  </router-link>
</template>

<script>
// import RequestService from "@/services/RequestService";

export default {
  name: "RequestCardStudent",
  props: {
    request: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      icon: require("@/assets/icon.png"),
      showReq: false,
      item: null
    };
  }
};
</script>