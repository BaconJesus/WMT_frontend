<template>
<div class="overflow-y-scroll ">
  <!-- component -->
  <!-- This is an example component -->
  <div class="flex flex-wrap max-w-2xl mx-auto bg-white p-16">
    <div class="container mx-auto my-5 p-5 w-full">

    <form @submit.prevent="saveStudent">
      <div class="mb-6">
<!--        upload-->
        <div class="max-w-2xl rounded-lg shadow-sm bg-white">
          <div class="m-4">
            <label class="flex justify-center inline-block mb-2 font-xl text-gray-900 text-3xl">Edit Profile </label>
            <div class="flex items-center justify-center w-full">
              <img v-if="student.profileImg" :src="student.profileImg" class="h-[300px] w-[300px]"/>
              <img v-else :src="icon" class="h-[300px] w-[300px]"/>
              <UploadImages :max="1" @changed="handleImage" />
            </div>
          </div>
        </div>
<!--        end upload-->
      </div>

      <div class="mb-6">
        <label class="block mb-2 text-2xl font-medium text-gray-900 ">About Me</label>
        <textarea
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-sky-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            rows="3"
            placeholder="Write something about yourself ..."
            v-model="student.description"
        ></textarea>
      </div>
      <div class="flex justify-center ">
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dar">Submit</button>
      </div>
      
    </form>
    <pre>{{ student }}</pre>
    </div>
  </div>
</div>
</template>

<script>
import UploadImages from 'vue-upload-drop-images'
import StudentService from '@/services/StudentService'
import UploadService from '@/services/UploadService'
export default {
  inject: ['GStore'],
  name: "EditStudentProfile",
  components: {
    UploadImages
  },
  data() {
    return {
      student: {
        description: '',
        profileImg: '', 
      },
      files: [],
      icon: require("@/assets/icon.png"),
      studentid: null,
    }
  },
  methods: {
    saveStudent(){
      Promise.all(this.files.map((file) => {
          return UploadService.uploadFile(file)
        }))
      .then((response) =>{
        var image = response.map((r) => r.data)
        if (image[0] == null || image[0] == ''){
          StudentService.editStudent(this.student, this.studentid)
            .then((response) => {
            this.$router.push({
              name: 'StProfilePage',
              params: { id: response.data.data.editStudent.id }
            })
        })
        } else{      
        this.student.profileImg = image[0]
        StudentService.editStudent(this.student, this.studentid)
        .then((response) => {
          this.$router.push({
              name: 'StProfilePage',
              params: { id: response.data.data.editStudent.id }
            })
        })
        }
      })
    },
    handleImage(file){
      this.files = file
    },
  },
   // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    StudentService.getStudent(parseInt(routeTo.params.id))
        .then((response) => {
          next((comp) => {
            console.log(response.data.data.getStudent)
            comp.student.description = response.data.data.getStudent.description;
            comp.student.profileImg = response.data.data.getStudent.profileImg;
            comp.studentid = response.data.data.getStudent.id
          })
        })
  },
}
</script>

<style scoped>

</style>