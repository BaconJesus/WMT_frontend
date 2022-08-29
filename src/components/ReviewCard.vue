<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
<template>
<!--  <div class="flex flex-wrap flex-row -mx-4 text-center">-->
    <div class="cursor-pointer relative max-w-full w-full">
      <!-- card -->
      <div class="transform ease-in-out hover:-translate-y-0.25 my-2">
        <div class="flex-shrink px-[2.5px] py-[10px] max-w-full w-full">
          <!--card-->
          <div class="container bg-white flex flex-col-2 p-2 border border-blue-500 border-2 rounded-2xl w-full gap-4">
            <!--profile-image-->
            <span class="rounded-full w-[50px] ">
              <img v-if="!review.student.profileImg" :src="icon" alt="profile">
              <img v-else :src="review.student.profileImg" alt="profile">
            </span>
            <span class="w-[300px] text-bold">
            <b>{{review.student.user.displayname}}</b>
            <br>{{review.rating}}
              <br>{{review.description}}
            </span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: "ReviewCard",
  props: {
    review: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      icon: require("@/assets/icon.png"),
    };
  }
};
</script>