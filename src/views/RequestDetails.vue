<template>
    
  <!-- <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"> -->
  <div class="overflow-y-scroll bg-white" >
    <div :class="[
        (!showModal && 'container mx-auto my-5 p-5 w-[1200px]') ||
          (showModal &&
            'container mx-auto my-5 p-5 w-[1200px] opacity-30 transition'),
      ]">
      <div class="md:flex no-wrap md:-mx-2 ">
        <!-- Left -->
        <div class="w-full md:w-3/12 md:mx-2">
          <!-- Profile Card -->
          <div class="bg-white p-3 border-t-4 border-sky-400" v-if="GStore.currentUser.tutor">
            <div class="image overflow-hidden">
              <div class="h-auto w-full mx-auto rounded-lg" v-if="!request.student.profileImg" >
              <img :src="icon" />
            </div>
            <div class="h-auto w-full mx-auto rounded-lg" v-else>
              <img :src="request.student.profileImg" class="h-[300px] w-[300px]"/>
            </div>
            </div>
            <h1 class="flex justify-center mx-auto name text-gray-900 font-bold text-xl leading-8 my-1" v-if="GStore.currentUser.tutor">{{request.student.user.displayname}}
              <br>({{request.student.user.firstname}} {{request.student.user.lastname}})</h1>
          </div>
          <div class="bg-white p-3 border-t-4 border-sky-400" v-if="GStore.currentUser.student">
            <div class="image overflow-hidden">
              <div class="h-auto w-full mx-auto rounded-lg" v-if="!request.tutor.profileImg" >
              <img :src="icon" />
            </div>
            <div class="h-auto w-full mx-auto rounded-lg" v-else>
              <img :src="request.tutor.profileImg" class="h-[300px] w-[300px]"/>
            </div>
            </div>
            <h1 class="flex justify-center mx-auto name text-gray-900 font-bold text-xl leading-8 my-1" v-if="GStore.currentUser.student">{{request.tutor.user.displayname}}
              <br>({{request.tutor.user.firstname}} {{request.tutor.user.lastname}})</h1>
         
          </div>
          <!-- Student list  -->
          <div class="bg-white p-3 hover:shadow">
          </div>
        </div>
        <!-- Right Side -->
        <div class="w-full md:w-9/12 pl-[50px] mx-2 h-64">
          <!-- Profile tab -->
          <!-- About Section -->
          <div class="bg-white p-3 shadow-sm rounded-sm">
            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"> 
              <span class="tracking-wide">Request Message</span>
            </div>
            <div class="text-gray-700 h-[300px]">
              <div class="grid md:grid-cols-2 text-sm">
<!--                <div class="grid grid-cols-2">-->
                  <div class="description px-4 py-2 ">{{request.message}}</div>
<!--                </div>-->
              </div>
            </div>
            <div  class="text-white" v-if="GStore.currentUser.tutor">
              <div class="grid md:grid-cols-2 text-sm">
<!--                <div class="grid grid-cols-2">-->
                  <button @click="accept" class="rounded mx-2 bg-green-500 description px-4 py-2 ">Accept</button>
                  <button @click="reject" class="rounded mx-2 bg-red-500 description px-4 py-2 ">Reject</button>
<!--                </div>-->
              </div>
              
            </div>
            <div  v-else>
              <div class="text-gray-700 h-[300px]">
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"> 
              <span class="tracking-wide">Reply from the tutor</span>
            </div>
            <div class="text-gray-700 h-[300px]">
              <div class="grid md:grid-cols-2 text-sm">
<!--                <div class="grid grid-cols-2">-->
                  <div class="description px-4 py-2 ">{{request.reply}}</div>
<!--                </div>-->
              </div>
              </div>
          </div>
          <!-- End about -->
      </div>
    </div>
        </div>
      </div>
  </div>
  <!-- Modal -->
    <div
    v-if="showModal"
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
            Attach a message along
          </h3>
          <button
            @click="cancel"
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
        <div>
          <textarea
              type="search"
              id="default-search"
              class="
                flex-auto
                w-full
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
              placeholder="Reply message"
              name="reply"
              v-model="repl"
            />
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
            <button v-if="acceptance"
            @click="handleResponse"
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
              "
            >
              Accept Request and Send
            </button>
            <button v-if="refusal"
              @click="handleResponse"
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
              "
            >
              Reject Request and Send
            </button>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import RequestService from "@/services/RequestService";

export default {
  inject: ['GStore'],
  name: "RequestDetails",
    data() {
    return {
      showModal: false,
      acceptance: false,
      refusal: false,
      repl: "",
      request: {
        id: null,
	message: null,
  reply: null,
  tutor: {
	profileImg: null,
	user :{
			firstname: null,
				lastname: null,
				displayname: null
		}
      },
	student: {
	profileImg: null,
	user :{
			firstname: null,
				lastname: null,
				displayname: null
		}
      }
      },
      icon: require("@/assets/icon.png")
    };
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    RequestService.getRequestReceived(routeTo.params.id)
    .then((response) => {      
          next((comp) => {
          comp.request = response.data.data.getRequest
        })
    })      
  },
  beforeRouteUpdate(routeTo) {
    RequestService.getRequestReceived(routeTo.params.id).then((response) => {
      this.request = response.data.data.getRequest;
    });
  },
  methods:{
    accept(){
      this.showModal = true
      this.acceptance = true
      this.refusal = false
    },
    reject(){
      this.showModal = true
      this.acceptance = false
      this.refusal = true
    },
    cancel(){
      this.showModal = false
      this.acceptance = false
      this.refusal = false
    },
    handleResponse(){
      if(this.acceptance){
      RequestService.acceptRequest(this.repl, this.request.id).then(() => {
        this.$router.replace('/tutorlist')
      })
      }
      
      if(this.refusal){
        RequestService.refuseRequest(this.repl, this.request.id).then(() => {
        this.$router.replace('/tutorlist')
      })
      }
    }
  }
}

</script>