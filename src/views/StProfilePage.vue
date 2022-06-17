<template>

<StudentDetail v-if="student" :student="student"/>
</template>

<script>
import StudentService from '@/services/StudentService'
import StudentDetail from '@/components/StudentDetail.vue'
export default {
  inject: ['GStore'],
  name: "StProfilePage",
  components:{
    StudentDetail
  },
  data() {
    return {
      student: null,
      studentid: null,
      icon: require("@/assets/icon.png"),
    };
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    StudentService.getStudent(routeTo.params.id)
    .then((response) => {
          next((comp) => {
          comp.studentid = routeTo.params.id;
          comp.student = response.data.data.getStudent
        })
    })      
  },
}
</script>

<style scoped>
:root {
  --main-color: #4a76a8;
}

.bg-main-color {
  background-color: var(--main-color);
}

.text-main-color {
  color: var(--main-color);
}

.border-main-color {
  border-color: var(--main-color);
}
</style>

