import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import TutorList from "@/views/TutorList";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import browse from "@/components/browse";
import profilePage from "@/views/profilePage";
import CreateTutorProfile from "@/views/CreateTutorProfile";
import CreateStudentProfile from "@/views/CreateStudentProfile";

const routes = [
    { path: "/", name: "HomePage", component: Home },
    { path: "/tutorlist", component: TutorList, props: (route) => ({ page: parseInt(route.query.page) || 1 }) },
    { path: "/login", component: LoginForm },
    { path: "/register", component: RegisterForm },
    { path: "/test", component: browse },
    { path: "/profile/:id", name: "ProfilePage", component: profilePage },
    { path: "/createtutor", component: CreateTutorProfile },
    { path: "/createstudent", component: CreateStudentProfile },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;