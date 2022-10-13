<template>

  <div flex items-center justify-center>
    <h3 class=" flex items-center justify-center text-5xl font-sans font-bold  text-sky-500">
      Leaderboard
    </h3>
  </div>

      <div id="nav">
      <router-link :to="{ name: 'TutorRanking' }" @click="GStore.rankStudents = null">For Tutors</router-link>
      |
      <router-link :to="{ name: 'StudentRanking' }"  @click="GStore.rankTutors = null">For Students</router-link>
    </div>
    <div v-if="GStore.rankTutors">
    <router-view :rankTutors="GStore.rankTutors" />
    </div>
    <div v-if="GStore.rankStudents">
    <router-view :rankStudents="GStore.rankStudents" />
    </div>
    <!-- <router-view/> -->

</template>
<script>
export default {
  inject: ['GStore']
}
</script>