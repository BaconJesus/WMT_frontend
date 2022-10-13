<template>

  <div class="container flex flex-wrap justify-between items-center mx-auto">
  <div class="grid grid-cols-1
   w-full">
    <div flex items-center justify-center>
      <h3 class=" flex items-center justify-center text-2xl font-sans font-bold text-gray-900">
        Most Enthusiastic Student
      </h3>
        <div class="flex items-center justify-center text-md font-medium text-gray-900" >
              <ol class="list-decimal text-md font-medium text-gray-900">
                <RankingCards v-for="item in rankStudents" :key="item.id" :person="item" />
              </ol>
      </div>
    </div>

  </div>
  </div>

</template>

<script>
import RankingCards from "@/components/RankingCards.vue";

export default {
  name: "StudentRanking",
  components: {RankingCards},
  props: ['rankStudents'],
}
</script>

<style scoped>

</style>