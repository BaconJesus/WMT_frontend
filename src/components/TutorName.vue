<template>
  <div>
    <router-link
        :to="{ name: 'ProfilePage', params: { id: tutor.id } }">
      <li>
        {{tutor.user.firstname}} {{tutor.user.lastname}}
      </li>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "TutorName",
  props: {
    tutor: {
      type: Object,
      required: true
    }
  },
}
</script>


<style scoped>

</style>