import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import TutorList from "@/views/TutorList";
import LoginForm from "@/views/LoginForm";
import RegisterForm from "@/views/RegisterForm";
import browse from "@/components/browse";
import ProfilePage from "@/views/ProfilePage";
import CreateTutorProfile from "@/views/CreateTutorProfile";
import CreateStudentProfile from "@/views/CreateStudentProfile";
import RegisterAs from '@/views/RegisterAs';
import NoProfile from '@/views/NoProfile';
import StProfilePage from '@/views/StProfilePage';
import TutorNameList from "@/views/TutorNameList";
import StudentNameList from "@/views/StudentNameList";

const routes = [
    { path: "/", name: "HomePage", component: Home },
    { path: "/tutorlist", component: TutorList, props: (route) => ({ page: parseInt(route.query.page) || 1 }) },
    { path: "/login", name: "LoginPage", component: LoginForm },
    { path: "/regcheck", name: "RegisterCheck", component: RegisterAs },
    { path: "/register/:role", name: "RegisterPage", component: RegisterForm },
    { path: "/test", component: browse },
    { path: "/profile/:id", name: "ProfilePage", component: ProfilePage },
    { path: "/createtutor", name: 'CreateTutor', component: CreateTutorProfile },
    { path: "/createstudent", name: 'CreateStudent', component: CreateStudentProfile },
    { path: "/noprof", name: 'NoProfile', component: NoProfile },
    { path: "/stprofile/:id", name: "StProfilePage", component: StProfilePage },
    { path: "/tutornamelist", name: "TutorNameList",component: TutorNameList, props: (route) => ({ page: parseInt(route.query.page) || 1})},
    { path: "/studentnamelist", name: "StudentNameList",component: StudentNameList, props: (route) => ({ page: parseInt(route.query.page) || 1})}

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;