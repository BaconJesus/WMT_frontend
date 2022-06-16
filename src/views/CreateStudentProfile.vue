<template>

  <!-- This is an example component -->
  <div class="max-w-2xl mx-auto bg-white p-16">

    <form>
      <div class="mb-6">
<!--        upload-->
        <div class="max-w-2xl rounded-lg shadow-sm bg-white">
          <div class="m-4">
            <label class="flex justify-center inline-block mb-2 font-xl text-gray-900">Upload profile picture </label>
            <div class="flex items-center justify-center w-full">
              <label
                  class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div class="flex flex-col items-center justify-center pt-7">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                       fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Attach a file</p>
                </div>
                <input type="file" class="opacity-0" />
              </label>
            </div>
          </div>
          <div class="flex justify-center p-2">
            <button class="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">Upload</button>
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
        ></textarea>
      </div>
      <div class="flex justify-center ">
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dar">Submit</button>
      </div>
    </form>

  </div>

</template>

<script>
export default {
  name: "CreateStudentProfile"
}
</script>

<style scoped>

</style>