<template>
<div class="card flex flex-col items-center justify-center p-4 shadow-lg rounded-2xl w-60 mt-[5px]">
        {{preference.name}}
</div>
</template>

<script>
export default {
    data(){
        return {
            isClicked: false
        }
    },
  props: {
    label: {
      type: String,
      default: ''
    },
    preference: {
      type: Object,
      required: true
    }
  },
  methods: {
    click(){
      this.isClicked = !this.isClicked
    }
  }
}
</script>
