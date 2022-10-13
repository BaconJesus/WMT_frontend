<template>
<div class="overflow-y-scroll ">
  <!-- component -->
  <!-- This is an example component -->
  <div :class="[
        (!showEditModal && 'flex flex-wrap max-w-2xl mx-auto bg-white p-16') ||
          (showEditModal &&
            'flex flex-wrap max-w-2xl mx-auto bg-white p-16 opacity-30 transition'),
      ]">
    <div class="container mx-auto my-5 p-5 w-full">

    <form @submit.prevent="saveTutor">
      <div class="mb-6">
<!--        upload-->
        <div class="max-w-2xl rounded-lg shadow-sm bg-white">
          <div class="m-4">
            <label class="flex justify-center inline-block mb-2 font-xl text-gray-900 text-3xl">Edit Profile </label>
            <div class="flex items-center justify-center w-full">
              <img v-if="tutor.profileImg !== null" :src="tutor.profileImg" class="h-[300px] w-[300px]"/>
              <img v-else :src="icon" class="h-[300px] w-[300px]"/>
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
          :class="[CheckPreference(item.id) && 'bg-white-500 cursor-pointer' || !CheckPreference(item.id) && 'bg-sky-500 cursor-pointer']"
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
      </div>
      <div class="flex mb-6">
      <textarea v-if="checkPrivilege"
            class="form-control disabled block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-sky-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            rows="3"
            placeholder="Write something about yourself ..."
            v-model="tutor.description"
            disabled
      ></textarea>
      <textarea v-else
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-sky-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            rows="3"
            placeholder="Write something about yourself ..."
            v-model="tutor.description"
      ></textarea>
      </div>
      <div @click="EditModal" class="flex mb-6 cursor-pointer justify-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dar" v-if="checkPrivilege">
      Edit
      </div>
      <div class="flex justify-center">
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dar">Submit</button>
      </div>      
    </form>
    </div>
  </div>
      <!-- Push modal -->
  <div
    v-if="showEditModal"
    id="defaultModal"
    tabindex="-1"
    class="
      overflow-y-auto overflow-x-hidden
      fixed
      top-0
      right-0
      left-0
      z-50
      w-full
      md:inset-0
      h-modal
      md:h-full
      justify-center
      items-center
      flex
    "
    aria-modal="true"
    role="dialog"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="
            flex
            justify-between
            items-start
            p-4
            rounded-t
            border-b
            dark:border-gray-600
          "
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Edit About Me
          </h3>
          <button
            @click="showEditModal = false"
            type="button"
            class="
              text-gray-400
              bg-transparent
              hover:bg-gray-200 hover:text-gray-900
              rounded-lg
              text-sm
              p-1.5
              ml-auto
              inline-flex
              items-center
              dark:hover:bg-gray-600 dark:hover:text-white
            "
            data-modal-toggle="defaultModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="flex no-wrap">
          <div class="w-10/12">
            <textarea
              type="search"
              id="default-search"
              class="
                flex-auto
                w-full
                h-full
                p-4
                text-sm text-gray-900
                bg-blue-50
                rounded-lg
                border border-gray-300
                focus:ring-blue-500 focus:border-blue-500
                dark:bg-sky-200
                dark:border-gray-300
                dark:placeholder-gray-400
                dark:text-black
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              placeholder="Message"
              name="message"
              v-model="editmessage"
            />
            
          </div>
          <div class="mx-2 w-2/12">
            <button @click="bold">Bold</button><br/>
            <button @click="italic">Italic</button><br/>
            <button @click="underline">Underline</button><br/>
            <button @click="color">Color</button><br/>
            <button @click="image">Image</button><br/>
            <button @click="newLine">New Line</button>
          </div>
        </div>
          <!-- Modal footer -->
          <div
            class="
              flex
              items-center
              p-6
              space-x-2
              rounded-b
              border-t border-gray-200
              dark:border-gray-600
            "
          >
            <div @click="handleEditPost"
              data-modal-toggle="defaultModal"
              type="submit"
              class="
                text-white
                bg-blue-700
                hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                cursor-pointer
              "
            >
              Submit
            </div>
            <div @click="Preview" class="
                text-white
                bg-blue-700
                hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                cursor-pointer
              ">Preview</div>
            
          </div>
          <b v-if="showPreview" class="mx-2 p-2 mb-2">Preview</b>
          <div v-if="showPreview" class="overflow-y-scroll h-[350px] border border-blue-500 border-2 rounded">
            
              <BBCodeDescription :description="editmessage"/>
            </div>
      </div>
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
import BBCodeDescription from '@/components/BBCodeDescription';
import GStore from '@/store'
export default {
  inject: ['GStore'],
  name: "CreateTutorProfile",
  components: {
    UploadImages, PrefSelection, CategorySelection, SubjectSelection, BBCodeDescription
  },
  data() {
    return {
      tutor: {
        description: '',
        profileImg: '',
        rewardPoints: null,
        preferences: [],
        subjects:[]
      },
      files: [],
      icon: require("@/assets/icon.png"),
      tutorid: null,
      categories: null,
      categoryId: null,
      subjects: null,
      showEditModal: false,
      showPreview: false,
      editmessage: ''
    }
  },
  computed: {
    checkPrivilege() {
      if(this.tutor.rewardPoints < 30){
      return false
      }
      else return true
    },
  },
  methods: {
    saveTutor(){
      Promise.all(this.files.map((file) => {
          return UploadService.uploadFile(file)
        }))
      .then((response) =>{
        var image = response.map((r) => r.data)
        if (image[0] == null || image[0] == ''){
          TutorService.editTutor(this.tutor, this.tutorid)
            .then((response) => {
              GStore.currentUser.tutor = response.data.data.editTutor
            this.$router.push({
              name: 'ProfilePage',
              params: { id: response.data.data.editTutor.id }
            })
        })
        } else{      
        this.tutor.profileImg = image[0]
        TutorService.editTutor(this.tutor, this.tutorid)
        .then((response) => {
          GStore.currentUser.tutor = response.data.data.editTutor
          this.$router.push({
              name: 'ProfilePage',
              params: { id: response.data.data.editTutor.id }
            })
        })
        }
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
     CheckPreference(id){
      let exist = false
      for (var x = 0; x < this.tutor.preferences.length; x++) {
            if(this.tutor.preferences[x].id == id){
              exist = true
            }
      }
      if(exist){
        return false
      }else return true
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
    },
    EditModal(){
      this.editmessage = this.tutor.description;
      this.showEditModal = true;
    },
    Preview(){
      this.showPreview = false;
      setTimeout(() => {
                        // After 3 seconds remove it
                         this.showPreview = true;
                    }, 500)
    },
    handleEditPost(){
      this.tutor.description = this.editmessage;
      this.showEditModal = false;
    },
    bold(){
      this.editmessage = this.editmessage + "[b]<INSERT TEXT HERE>[/b]"
    },
    italic(){
      this.editmessage = this.editmessage + "[i]<INSERT TEXT HERE>[/i]"
    },
    color(){
      this.editmessage = this.editmessage + "[color=<COLORHEX>]<INSERT TEXT HERE>[/color]"
    },
    underline(){
      this.editmessage = this.editmessage + "[u]<INSERT TEXT HERE>[/u]"
    },
    image(){
      this.editmessage = this.editmessage + "[img=<IMAGE URL HERE>]"
    },
    newLine(){
      this.editmessage = this.editmessage + "\n[br]"
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
    TutorService.getTutorToEdit(parseInt(routeTo.params.id))
        .then((response) => {
          next((comp) => {
            comp.tutor.description = response.data.data.getTutor.description;
            comp.tutor.profileImg = response.data.data.getTutor.profileImg;
            comp.tutor.preferences = response.data.data.getTutor.preferences;
            comp.tutor.subjects = response.data.data.getTutor.subjects;
            comp.tutor.rewardPoints = response.data.data.getTutor.rewardPoints;
            comp.tutorid = response.data.data.getTutor.id
          })
        })
  },
}
</script>

<style scoped>

</style>