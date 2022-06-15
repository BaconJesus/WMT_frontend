import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import TutorList from "@/views/TutorList";
import LoginForm from "@/views/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import browse from "@/components/browse";
import profilePage from "@/views/profilePage";

const routes = [
    { path: "/", name: "HomePage", component: Home },
    { path: "/tutorlist", component: TutorList, props: (route) => ({ page: parseInt(route.query.page) || 1 }) },
    { path: "/login", name: "LoginPage", component: LoginForm },
    { path: "/register", component: RegisterForm },
    { path: "/test", component: browse },
    { path: "/profile/:id", name: "ProfilePage", component: profilePage },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;