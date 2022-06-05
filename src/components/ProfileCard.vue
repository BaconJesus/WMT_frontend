<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
<template>
  <div class="main bg-blue-200 grid place-items-center h-screen">
    <!--card-->
    <div class="card bg-white flex flex-col items-center justify-center p-4 shadow-lg rounded-2xl w-64">
      <!--profile-image-->
      <div class="profile mx-auto rounded-full py-2 w-16 ">
        <img src="/#" alt="profile">
      </div>
      <!--name-->
      <div class="name text-gray-800 text-2xl font-medium mt-4 ">
        <p>Name Surname</p>
      </div>
      <!--Subject-->
      <div class="subject text-gray-700 mt-4">
        <p>Math, Science </p>
      </div>
      <!-- button -->
      <div class="w-full mt-8">
        <button class="bg-blue-500 py-2 px-4 hover:bg-blue-600 text-white w-full font-semibold rounded-lg shadow-lg">
          View Profile
        </button>
      </div>
    </div>
  </div>


</template>

<script>

export default {
  name: "ProfileCard",
  components: { },
  data() {
  },
};
</script>