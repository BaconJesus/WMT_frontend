<template>

  <div flex items-center justify-center>
    <h3 class=" flex items-center justify-center text-5xl font-sans font-bold  text-sky-500">
      User List
    </h3>
  </div>

  <div class="container flex flex-wrap justify-between items-center mx-auto">
  <div class="grid grid-cols-1
   w-full">
    <div flex items-center justify-center>
      <h3 class=" flex items-center justify-center text-2xl font-sans font-bold text-gray-900">
        Tutor List
      </h3>
        <div class="flex items-center justify-center text-md font-medium text-gray-900" >
              <ol class="list-decimal text-md font-medium text-gray-900">
                <TutorName v-for="item in tutors" :key="item.id" :tutor="item"/>
              </ol>
      </div>
    </div>

  </div>
  </div>

</template>

<script>
import TutorName from "@/components/TutorName";
import TutorService from "@/services/TutorService.js";

export default {
  name: "TutorNameList",
  components: {TutorName},
  data() {
    return {
      tutors: null,
      totalElements:0,
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    TutorService.getTutors(parseInt(routeTo.query.page) || 1,9)
        .then((response) => {
          next((comp) => {
            comp.tutors = response.data.data.getTutors.content;
            comp.totalElements = response.data.data.getTutors.totalElements;
          })
        });
  },


}
</script>

<style scoped>

</style>