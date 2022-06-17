<template>
    
  <!-- <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"> -->

  <div class="overflow-y-scroll bg-white">
    <div class="container mx-auto my-5 p-5 w-[1200px]">
      <div class="md:flex no-wrap md:-mx-2 ">
        <!-- Left -->
        <!-- {{student}} -->
        <div class="w-full md:w-3/12 md:mx-2">
          <!-- Profile Card -->
          <div class="bg-white p-3 border-t-4 border-sky-400">
            <div class="image overflow-hidden">
              <div class="h-auto w-full mx-auto rounded-lg" v-if="!student.profileImg" >
              <img :src="icon" />
            </div>
            <div class="h-auto w-full mx-auto rounded-lg" v-else>
              <img :src="student.profileImg" class="h-[300px] w-[300px]"/>
            </div>
            </div>
            <h1 class="name text-gray-900 font-bold text-xl leading-8 my-1" v-if="student">{{student.user.firstname}} {{student.user.lastname}}</h1>
          </div>
          <!-- Student list  -->
          <div class="bg-white p-3 hover:shadow">
          </div>
        </div>
        <!-- Right Side -->
        <div class="w-full md:w-9/12 mx-2 h-64">
          <!-- Profile tab -->
          <!-- About Section -->
          <div class="bg-white p-3 shadow-sm rounded-sm">
            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
              <span class="tracking-wide">About</span>
            </div>
            <div class="text-gray-700 h-[300px]">
              <div class="grid md:grid-cols-2 text-sm">
<!--                <div class="grid grid-cols-2">-->
                  <div class="description px-4 py-2 ">{{student.description}}</div>
<!--                </div>-->
              </div>
            </div>
          </div>
          <!-- End about -->
      </div>
    </div>
  </div>
  </div>
</template>
<script>

export default {
  name: "StudentDetail",
  props: {
    student: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      icon: require("@/assets/icon.png"),
    };
  },
};
</script>