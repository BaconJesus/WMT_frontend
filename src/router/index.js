import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import TutorList from "@/views/TutorList";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import browse from "@/components/browse";

const routes = [
    { path: "/",name: "HomePage" , component: Home },
    { path: "/tutorlist", component: TutorList },
    { path: "/login", component: LoginForm },
    { path: "/register", component: RegisterForm },
    { path: "/test", component: browse },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;