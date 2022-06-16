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
            <label class="flex justify-center inline-block mb-2 font-xl text-gray-900 text-3xl">Create Profile </label>
            <div class="flex items-center justify-center w-full">
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
import TutorService from '@/services/TutorService'
import UploadService from '@/services/UploadService'
export default {
  inject: ['GStore'],
  name: "CreateStudentProfile",
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
      userid: null,
    }
  },
  methods: {
    saveStudent(){
      Promise.all(this.files.map((file) => {
          return UploadService.uploadFile(file)
        }))
      .then((response) =>{
        var image = response.map((r) => r.data)       
        this.tutor.profileImg = image[0]
        TutorService.createTutor(this.tutor, this.userid)
        .then((response) => {
          this.$router.push({
              name: 'StProfilePage',
              params: { id: response.data.data.createStudent.id }
            })
        })
      })
    },
    handleImage(file){
      this.files = file
    },
  },
   // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
        next((comp) => {
          comp.userid = routeTo.params.id;
          console.log(comp.userid)
        })
  },
}
</script>

<style scoped>

</style>