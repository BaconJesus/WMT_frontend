<template>

  <div flex items-center justify-center>
    <h3 class=" flex items-center justify-center text-5xl font-sans font-bold  text-sky-500">
      User List
    </h3>
  </div>

  <div class="container flex flex-wrap justify-between items-center mx-auto">
  <div class="grid grid-cols-1 w-full">

    <div flex items-center justify-center>
      <h3 class=" flex items-center justify-center text-2xl font-sans font-bold text-gray-900">
        Student List
      </h3>
      <div class="flex items-center justify-center text-md font-medium text-gray-900" >
        <ol class="list-decimal text-md font-medium text-gray-900">
          <StudentName v-for="item in students" :key="item.id" :student="item"/>
        </ol>
      </div>
    </div>

  </div>
  </div>

</template>

<script>
import StudentService from "@/services/StudentService";
import StudentName from "@/components/StudentName";
export default {
  name: "UserList",
  components: {StudentName},
  data() {
    return {
      students: null,
      totalElements:0
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    StudentService.getStudents(parseInt(routeTo.query.page) || 1,9)
        .then((response) => {
          next((comp) => {
            comp.students = response.data.data.getStudents.content;
            comp.totalElements = response.data.data.getStudents.totalElements;
          })
        })
  },


}
</script>

<style scoped>

</style>