<template>
  <div id="services" class="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white">
    <div class="container xl:max-w-6xl mx-auto px-4">
      <header class="text-center mx-auto mb-16 lg:px-20">
        <h2 class="text-2xl leading-normal mb-2 font-bold text-black">Where is My Tutor</h2>

      </header>


      <div class="flex flex-wrap flex-row -mx-4 text-center">
        <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s" style="visibility: visible; animation-duration: 1s; animation-name: fadeInUp;">
          <!-- card -->
          <div class="py-8 px-12 mb-12 transform transition duration-300 ease-in-out hover:-translate-y-2">
            <ProfileCard />
          </div>
        </div>
        <!-- card -->
        <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.1s; animation-name: fadeInUp;">
          <div class="py-8 px-12 mb-12  transform transition duration-300 ease-in-out hover:-translate-y-2">
            <ProfileCard />
          </div>
        </div>
        <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: fadeInUp;">
          <!-- card -->
          <div class="py-8 px-12 mb-12 transform transition duration-300 ease-in-out hover:-translate-y-2">
            <ProfileCard />
          </div>
        </div>
        <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s" style="visibility: visible; animation-duration: 1s; animation-name: fadeInUp;">
          <!-- card -->
          <div class="py-8 px-12 mb-12 transform transition duration-300 ease-in-out hover:-translate-y-2">
            <ProfileCard />
          </div>
        </div>
        <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.1s; animation-name: fadeInUp;">
          <!-- card -->
          <div class="py-8 px-12 mb-12 transform transition duration-300 ease-in-out hover:-translate-y-2">
            <ProfileCard />
          </div>
        </div>
        <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: fadeInUp;">
          <!-- card -->
          <div class="py-8 px-12 mb-12 transform transition duration-300 ease-in-out hover:-translate-y-2">
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "@/components/ProfileCard";


export default {
  name: "TutorList",
  components: {ProfileCard, }
};
</script>

