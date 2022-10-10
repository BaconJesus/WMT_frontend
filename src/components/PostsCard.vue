<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
<template>
<!--  <div class="flex flex-wrap flex-row -mx-4 text-center">-->
    <div class="relative max-w-full w-full">
      <!-- card -->
      <div class="transform ease-in-out hover:-translate-y-0.25 my-2">
        <div class="flex-shrink px-[2.5px] py-[10px] max-w-full w-full">
          <!--card-->
          <div :class="[((post.status == 'Open') && 'container bg-white flex flex-col-2 p-2 border border-blue-500 border-2 rounded-2xl w-full gap-4') ||
            ((post.status == 'Closed') && 'container bg-white flex flex-col-2 p-2 border border-red-500 border-2 rounded-2xl w-full gap-4')]">
            <!--profile-image-->
            <span class="rounded-full w-[50px] ">
              <img v-if="!post.tutor.profileImg" :src="icon" alt="profile">
              <img v-else :src="post.tutor.profileImg" alt="profile">
            </span>
            <div class="w-full text-bold">
            <b>{{post.tutor.user.displayname}}</b>
            <div v-if="post.status == 'Open'" class="flex items-center text-green-500 font-bold">
            {{post.status}}
            </div>
            <div v-else class="flex items-center text-red-500 font-bold">
            {{post.status}}
            </div>
            <div>
            {{post.description}}
            </div>
            <div class="text-right italic">
            Last Opened at : {{post.lastOpened}}
            </div>
          </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>

export default {
  name: "PostCard",
  props: {
    post: {
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