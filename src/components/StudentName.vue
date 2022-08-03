<template>
  <div>
    <router-link
        :to="{ name: 'StProfilePage', params: { id: student.id } }">
      <li>
        {{student.user.firstname}} {{student.user.lastname}}
      </li>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "StudentName",
  props: {
    student: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>