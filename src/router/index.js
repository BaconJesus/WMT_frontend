import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import TutorList from "@/views/TutorList";
import LoginForm from "@/components/LoginForm";

const routes = [
    { path: "/",name: "HomePage" , component: Home },
    { path: "/Tutorlist", component: TutorList },
    { path: "/login", component: LoginForm },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;