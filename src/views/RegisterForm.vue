<template>
  <div class="main overflow-y-scroll flex items-center justify-center h-screen">
    <!--    <div class="card p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-white ">-->
    <Form
      @submit="handleRegister"
      :validation-schema="schema"
      class="space-y-6 w-[400px]"
      action="#"
    >
      <h5
        class="
          login
          flex
          items-center
          justify-center
          text-6xl
          font-sans font-bold
          text-gray-900
          drop-shadow-xl
          dark:text-cyan-500
        "
      >
        Sign Up
      </h5>
      <div class="flex flex-wrap">
        <label
          for="email"
          class="block mb-2 text-md font-medium text-gray-900 dark:text-sky-900 w-full"
          >Name</label
        >
        <!--          <input type="email" name="email" id="email" class="bg-blue-300 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-300 dark:border-blue-500 dark:placeholder-gray-300 dark:text-white" placeholder="name@company.com" required>-->
        <div class="flex flex-wrap w-[200px]">
        <Field
          type="name"
          name="firstname"
          class="
          form-group
            bg-blue-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500
            w-half
            p-2.5
            dark:bg-blue-300
            dark:border-blue-500
            dark:placeholder-gray-600
            dark:text-white
            font-sans
          "
          placeholder="name"
        />
        <ErrorMessage name="firstname" class="error-feedback text-xs" />
        </div>
        <div class="flex flex-wrap w-[200px]">
        <Field
          type="lastname"
          name="lastname"
          class="
          form-group
            bg-blue-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500
            flex
            flex-none
            w-[200px]
            p-2.5
            dark:bg-blue-300
            dark:border-blue-500
            dark:placeholder-gray-600
            dark:text-white
            font-sans
          "
          placeholder="lastname"
        />
        <ErrorMessage name="lastname" class="error-feedback text-xs" />
        </div>
      </div>
        <div>
        <label
          for="password"
          class="block mb-2 text-md font-medium text-gray-900 dark:text-sky-900"
          >Email</label
        >
        <Field
          type="name"
          name="username"
          id="username"
          placeholder="Email address"
          class="
          form-group
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
        <ErrorMessage name="username" class="error-feedback text-xs" />  
        </div>
      <div>
        <label
          for="password"
          class="block mb-2 text-md font-medium text-gray-900 dark:text-sky-900"
          >Display Name</label
        >
        <Field
          type="name"
          name="displayname"
          id="displayname"
          placeholder="Display name"
          class="
          form-group
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
        <ErrorMessage name="displayname" class="error-feedback text-xs" />  
        </div>
        <div class="flex flex-wrap">
        <div class="flex flex-wrap gap-[130px]">
        <label
          for="password"
          class="w-half block mb-2 text-md font-medium text-gray-900 dark:text-sky-900"
          >Password</label
        >
         <label
          for="password"
          class="w-half block mb-2 text-md font-medium text-gray-900 dark:text-sky-900"
          >Confirm password</label
        >
      </div>
        <!--          <input type="email" name="email" id="email" class="bg-blue-300 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-300 dark:border-blue-500 dark:placeholder-gray-300 dark:text-white" placeholder="name@company.com" required>-->
        <div class="flex flex-wrap w-[200px]">
        <Field
          type="password"
          name="password"
          class="
          form-group
            bg-blue-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500
            w-half
            p-2.5
            dark:bg-blue-300
            dark:border-blue-500
            dark:placeholder-gray-600
            dark:text-white
            font-sans
          "
          placeholder="*********"
        />
        <ErrorMessage name="password" class="error-feedback text-xs" />
        </div>
        <div class="flex flex-wrap w-[200px]">
        <Field
          type="password"
          name="confirm"
          class="
          form-group
            bg-blue-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500
            flex
            flex-none
            w-[200px]
            p-2.5
            dark:bg-blue-300
            dark:border-blue-500
            dark:placeholder-gray-600
            dark:text-white
            font-sans
          "
          placeholder="*********"
        />
        <ErrorMessage name="confirm" class="error-feedback text-xs" />
        </div>
      </div>
      <div class="flex items-start"></div>
      <div class="button flex items-center justify-center">
        <button
          type="submit"
          class="
            form-group
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
          Sign up
        </button>
      </div>
      <div class="text-sm font-medium flex items-center justify-center">
        <router-link to="/login">
        <a href="#" class="text-blue-700 hover:underline dark:text-blue-500"
          >Already have an account?</a
        >
        </router-link>
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
  name: "RegisterForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("A required field is missing")
        .email("This field must be in email format"),
      password: yup
        .string()
        .required("A required field is missing")
        .min(6, "This field must be 6-12 characters long")
        .max(12, "This field must be 6-12 characters long"),
      confirm: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password must match')
        .required("A required field is missing")
        .min(6, "This field must be 6-12 characters long")
        .max(12, "This field must be 6-12 characters long"),
      firstname: yup
        .string()
        .matches(
          /^'?\p{L}+(?:[' ]\p{L}+)*'?$/u,
          "This field must not contain special characters"
        )
        .required("A required field is missing"),
      lastname: yup
        .string()
        .matches(
          /^'?\p{L}+(?:[' ]\p{L}+)*'?$/u,
          "This field must not contain special characters"
        )
        .required("A required field is missing"),
      displayname: yup
        .string()
        .required("A required field is missing")
        .min(3, "This field must be 3-20 characters long")
        .max(20, "This field must be 6-12 characters long")
    });
    return {
      schema,
      role: null
    };
  },
  methods: {
    handleRegister(user) {
      if(this.role == "tutor"){
      AuthService.registerTutor(user)
        .then(() => {
          this.$router.push({ name: "LoginPage" });
        })
        .catch(() => {
          this.message = "could not login";
        });
      }
      if(this.role == "student"){
      AuthService.registerStudent(user)
        .then(() => {
          this.$router.push({ name: "LoginPage" });
        })
        .catch(() => {
          this.message = "could not login";
        });
      }
    },
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    next((comp) => {
      comp.role = routeTo.params.role
    })
  }
};
</script>