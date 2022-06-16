<template>
<div class="overflow-y-scroll ">
  <!-- component -->
  <!-- This is an example component -->
  <div class="flex flex-wrap max-w-2xl mx-auto bg-white p-16">
    <div class="container mx-auto my-5 p-5 w-full">

    <form @submit.prevent="saveTutor">
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
      <div class="grid grid-cols gap-6 mb-6 w-full">
        <div>
          <label class="block mb-2 text-2xl font-medium text-gray-900 ">Preference</label>
          <div class="grid grid-cols-2 gap-[30px]">
        
          <PrefSelection @click="InputPref(item.id);"
        v-for="item in GStore.preferences" :key="item.id" :preference="item"
          />
        
          </div>
        </div>

        <div>
          <label class="block mb-2 text-2xl font-medium text-gray-900">Subject's Category</label>
          <div class="overflow-y-scroll h-[300px] w-[550px] grid grid-cols-2 gap-[30px]">
          <CategorySelection @click="InputCategory(item.id);"
        v-for="item in categories" :key="item.id" :category="item"
        :class="[!CheckSelectedCategory(item.id) && 'bg-white-500 cursor-pointer' || CheckSelectedCategory(item.id) && 'bg-sky-500 cursor-pointer']"
          />
          </div>
        </div>

        <div v-if="subjects">
          <label class="block mb-2 text-2xl font-medium text-gray-900">Subject</label>
          <div class="overflow-y-scroll w-[550px] grid grid-cols-2 gap-[30px]">
          <SubjectSelection @click="InputSubject(item.id);"
        v-for="item in subjects" :key="item.id" :subject="item"
        :class="[CheckSelected(item.id) && 'bg-white-500 cursor-pointer' || !CheckSelected(item.id) && 'bg-sky-500 cursor-pointer']"
          />
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="block mb-2 text-2xl font-medium text-gray-900 ">About Me</label>
        <textarea
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-sky-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            rows="3"
            placeholder="Write something about yourself ..."
            v-model="tutor.description"
        ></textarea>
      </div>
      <div class="flex justify-center ">
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dar">Submit</button>
      </div>
      
    </form>
    <pre>{{ tutor }}</pre>
    </div>
  </div>
</div>
</template>

<script>
import PrefSelection from '@/components/PrefSelection.vue'
import UploadImages from 'vue-upload-drop-images'
import TutorService from '@/services/TutorService'
import UploadService from '@/services/UploadService'
import CategoryService from '@/services/CategoryService'
import CategorySelection from '@/components/CategorySelection.vue'
import SubjectService from '@/services/SubjectService'
import SubjectSelection from '@/components/SubjectSelection.vue'
export default {
  inject: ['GStore'],
  name: "CreateTutorProfile",
  components: {
    UploadImages, PrefSelection, CategorySelection, SubjectSelection
  },
  data() {
    return {
      tutor: {
        description: '',
        profileImg: '',
        preferences: [],
        subjects:[]
      },
      files: [],
      userid: null,
      categories: null,
      categoryId: null,
      subjects: null
    }
  },
  methods: {
    saveTutor(){
      Promise.all(this.files.map((file) => {
          return UploadService.uploadFile(file)
        }))
      .then((response) =>{
        var image = response.map((r) => r.data)       
        this.tutor.profileImg = image[0]
        TutorService.createTutor(this.tutor, this.userid)
        .then((response) => {
          this.$router.push({
              name: 'ProfilePage',
              params: { id: response.data.data.createTutor.id }
            })
        })
      })
    },
    handleImage(file){
      this.files = file
    },
    InputPref(id){
      let exist = false
      var position 
      for (var x = 0; x < this.tutor.preferences.length; x++) {
            if(this.tutor.preferences[x].id == id){
              exist = true
              position = x
            }
      }
      if(exist){
        this.tutor.preferences.splice(position,1)
      }else{
      this.tutor.preferences.push({id:id})
      }
    },
    InputCategory(id){
      this.categoryId = id
      SubjectService.getSubjects(id)
        .then((response) => {
            this.subjects = response.data.data.getSubjects
       })
    },
    InputSubject(id){
      let exist = false
      var position 
      for (var x = 0; x < this.tutor.subjects.length; x++) {
            if(this.tutor.subjects[x].id == id){
              exist = true
              position = x
            }
      }
      if(exist){
        this.tutor.subjects.splice(position,1)
      }else{
      this.tutor.subjects.push({id:id})
      }
    },
    CheckSelected(id){
      let exist = false
      for (var x = 0; x < this.tutor.subjects.length; x++) {
            if(this.tutor.subjects[x].id == id){
              exist = true
            }
      }
      if(exist){
        return false
      }else return true
    },
    CheckSelectedCategory(id){
      if(this.categoryId == id){
        return true
      }
      else return false
    }
  },
  created(){
    CategoryService.getCategories()
        .then((response) => {
             this.categories = response.data.data.getCategories
        })
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