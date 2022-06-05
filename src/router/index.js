import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import TutorList from "@/views/TutorList";

const routes = [
    { path: "/",name: "HomePage" , component: Home },
    { path: "/Tutorlist", component: TutorList },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;