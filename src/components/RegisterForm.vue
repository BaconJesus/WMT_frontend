<template>
  <div class="main  flex items-center justify-center h-screen">
    <!--    <div class="card p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-white ">-->
    <form class="space-y-6" action="#">
      <h5 class="login flex items-center justify-center text-6xl font-sans font-bold text-gray-900 drop-shadow-xl dark:text-cyan-500" >Sign Up</h5>
      <div>
                  <label for="email" class="block mb-2 text-md font-medium text-gray-900 dark:text-sky-900 ">Email</label>
        <!--          <input type="email" name="email" id="email" class="bg-blue-300 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-300 dark:border-blue-500 dark:placeholder-gray-300 dark:text-white" placeholder="name@company.com" required>-->
        <input type="email" name="email" id="email" class="bg-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-blue-300 dark:border-blue-500 dark:placeholder-gray-600 dark:text-white font-sans"  placeholder="name@company.com" required>

      </div>
      <div>
                  <label for="password" class="block mb-2 text-md font-medium text-gray-900 dark:text-sky-900">Password</label>
        <input type="password" name="password" id="password" placeholder="********" class="bg-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-blue-500 dark:border-blue-500 dark:placeholder-gray-600 dark:text-white" required>
        <label for="password" class="block mb-2 text-md font-medium text-gray-900 dark:text-sky-900">Re-enter Password</label>
        <input type="password" name="password" id="comfirmPassword" placeholder="********" class="bg-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-blue-500 dark:border-blue-500 dark:placeholder-gray-600 dark:text-white" required>
      </div>
      <div class="flex items-start">
        <div class="flex items-start">
<!--          <div class="flex items-center h-5">-->
<!--            <input id="remember" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required>-->
<!--          </div>-->
<!--          <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-900">Remember me</label>-->
        </div>
      </div>
      <div class="button flex items-center justify-center ">
        <button type="submit" class=" w-600  text-sky-900 bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-700">Sign up!</button>
      </div>
      <div class="text-sm font-medium  flex items-center justify-center">
         <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Already have an account?</a>
      </div>
    </form>
    <!--    </div>-->
  </div>
</template>

<script>

export default {
  name: "RegisterForm",
  components: { },
  data() {
  },
};

</script>