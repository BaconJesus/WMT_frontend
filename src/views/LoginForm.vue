<template>
  <div class="main flex w-18 items-center justify-center h-screen">
    <!--    <div class="card p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-white ">-->
    <Form
      @submit="handleLogin"
      :validation-schema="schema"
      class="space-y-6 w-[350px]"
      action="#"
    >
      <h5
        class="
          login
          flex
          items-center
          justify-center
          text-7xl
          font-sans font-bold
          text-gray-900
          drop-shadow-xl
          dark:text-cyan-500
        "
      >
        Login
      </h5>
      <div class="form-group">
        <label
          for="email"
          class="block mb-2 text-md font-medium text-gray-900 dark:text-sky-900"
          >Email</label
        >
        <!--          <input type="email" name="email" id="email" class="bg-blue-300 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-300 dark:border-blue-500 dark:placeholder-gray-300 dark:text-white" placeholder="name@company.com" required>-->
        <Field
          type="email"
          name="username"
          id="email"
          class="
            bg-blue-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500
            block
            w-full
            p-2.5
            dark:bg-blue-300
            dark:border-blue-500
            dark:placeholder-gray-600
            dark:text-white
            font-sans
          "
          placeholder="name@company.com"
        />
        <ErrorMessage name="username" class="error-feedback" />
      </div>
      <div class="form-group">
        <label
          for="password"
          class="block mb-2 text-md font-medium text-gray-900 dark:text-sky-900"
          >Password</label
        >
        <Field
          type="password"
          name="password"
          id="password"
          placeholder="********"
          class="
            bg-blue-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:border-blue-500
            dark:border-blue-500
            dark:placeholder-gray-600
            dark:text-white
          "
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>

      <div class="form-group button flex items-center justify-center">
        <button
          type="submit"
          class="
            w-600
            text-sky-900
            bg-green-400
            hover:bg-green-500
            focus:ring-4 focus:outline-none focus:ring-green-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            text-center
            dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-700
          "
        >
          Login
        </button>
      </div>
    </Form>
    <!--    </div>-->
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "LoginForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().email().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      schema,
    };
  },
  methods: {
    handleLogin(user) {
      AuthService.login(user)
        .then(() => {
          var verify = JSON.parse(localStorage.getItem('user'))
          if(verify.student == null && verify.tutor == null){
          this.$router.push({ name: "NoProfile" });
          }
          else this.$router.push({ name: "HomePage" });
        })
        .catch(() => {
          this.message = "could not login";
        });
    },
  },
};
</script>