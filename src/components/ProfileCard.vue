<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
<template>
<!--  <div class="flex flex-wrap flex-row -mx-4 text-center">-->
    <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s" style="visibility: visible; animation-duration: 1s; animation-name: fadeInUp;">
      <!-- card -->
      <div class="py-8 px-12 mb-12 transform transition duration-300 ease-in-out hover:-translate-y-2">
        <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s" style="visibility: visible; animation-duration: 1s; animation-name: fadeInUp;">
          <!--card-->
          <div class="card bg-white flex flex-col items-center justify-center p-4 shadow-lg rounded-2xl w-64 ">
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
      </div>
    </div>
<!--  </div>-->
</template>

<script>

export default {
  name: "ProfileCard",
  components: { },
  data() {
  },
};
</script>