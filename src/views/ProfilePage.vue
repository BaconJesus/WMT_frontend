<template>
<TutorDetail v-if="tutor" :tutor="tutor"/>
</template>


<script>
import TutorService from '@/services/TutorService'
import TutorDetail from '@/components/TutorDetail.vue'
export default {
  inject: ['GStore'],
  name: "ProfilePage",
  components:{
    TutorDetail
  },
  data() {
    return {
      tutor: null,
      studentid: null,
      icon: require("@/assets/icon.png"),
    };
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    TutorService.getTutor(routeTo.params.id)
    .then((response) => {
          next((comp) => {
          comp.tutor = response.data.data.getTutor
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

