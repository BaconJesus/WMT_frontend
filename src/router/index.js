import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import TutorList from "@/views/TutorList";
import TutorListPrefered from "@/views/TutorListPrefered";
import LoginForm from "@/views/LoginForm";
import RegisterForm from "@/views/RegisterForm";
import browse from "@/components/browse";
import RequestDetails from "@/views/RequestDetails"
import ProfilePage from "@/views/ProfilePage";
import CreateTutorProfile from "@/views/CreateTutorProfile";
import CreateStudentProfile from "@/views/CreateStudentProfile";
import RegisterAs from '@/views/RegisterAs';
import NoProfile from '@/views/NoProfile';
import StProfilePage from '@/views/StProfilePage';
import TutorNameList from "@/views/TutorNameList";
import StudentNameList from "@/views/StudentNameList";
import EditStudent from "@/views/EditStudentProfile";
import EditTutor from "@/views/EditTutorProfile"
import PreferenceService from "@/services/PreferenceService";
import RequestSent from "@/views/RequestSent"
import TutorRanking from "@/views/TutorRanking";
import StudentRanking from "@/views/StudentRanking";
import RankingLayout from "@/views/RankingLayout"
import TutorService from "@/services/TutorService";
import StudentService from "@/services/StudentService";
import GStore from '@/store'

const routes = [
    { path: "/", name: "HomePage", component: Home, props: (route) => ({ page: parseInt(route.query.page) || 1 }) },
    {
        path: "/tutorlist",
        name: "TutorList",
        component: TutorList,
        props: (route) => ({ page: parseInt(route.query.page) || 1, name: route.query.name || '' })
    },
    {
        path: "/requestsent",
        name: "RequestSent",
        component: RequestSent
    },
    {
        path: "/prefered",
        name: "TutorListPrefered",
        component: TutorListPrefered,
        props: (route) => ({ page: parseInt(route.query.page) || 1, subj: route.query.subj || null, pref: route.query.pref || null })
    },
    // { path: "/tutorname", name: "SearchTutorByName", component: SearchTutorByName, props: (route) => ({ page: parseInt(route.query.page) || 1 }) },
    { path: "/login", name: "LoginPage", component: LoginForm },
    { path: "/regcheck", name: "RegisterCheck", component: RegisterAs },
    { path: "/register/:role", name: "RegisterPage", component: RegisterForm },
    { path: "/test", component: browse },
    { path: "/profile/:id", name: "ProfilePage", component: ProfilePage },
    {
        path: "/createtutor/:id",
        name: 'CreateTutor',
        component: CreateTutorProfile,
        beforeEnter: () => {
            return PreferenceService.getPreferences()
                .then((response) => {
                    GStore.preferences = response.data.data.getPreferences
                })
                .catch(() => {
                    GStore.preferences = null
                    console.log('cannot load preferences')
                })
        }
    },
    { path: "/createstudent/:id", name: 'CreateStudent', component: CreateStudentProfile },
    { path: "/noprof", name: 'NoProfile', component: NoProfile },
    { path: "/stprofile/:id", name: "StProfilePage", component: StProfilePage },
    { path: "/request/:id", name: "RequestDetails", component: RequestDetails },
    { path: "/tutornamelist", name: "TutorNameList", component: TutorNameList, props: (route) => ({ page: parseInt(route.query.page) || 1 }) },
    { path: "/studentnamelist", name: "StudentNameList", component: StudentNameList, props: (route) => ({ page: parseInt(route.query.page) || 1 }) },
    {
        path: "/rankings",
        name: "RankingLayout",
        component: RankingLayout,
        props: true,
        children: [{
                path: 'tutors',
                name: 'TutorRanking',
                props: true,
                component: TutorRanking,
                beforeEnter: () => {
                    return TutorService.getTutorRanking()
                        .then((response) => {
                            GStore.rankTutors = response.data.data.getRankedTutors;
                        })
                }
            },
            {
                path: 'students',
                name: 'StudentRanking',
                props: true,
                component: StudentRanking,
                beforeEnter: () => {
                    return StudentService.getStudentRanking()
                        .then((response) => {
                            GStore.rankStudents = response.data.data.getRankedStudents;
                        })
                }
            },
        ]
    },
    { path: "/studentnamelist", name: "StudentNameList", component: StudentNameList, props: (route) => ({ page: parseInt(route.query.page) || 1 }) },
    { path: "/editstudent/:id", name: 'EditStudent', component: EditStudent },
    {
        path: "/edittutor/:id",
        name: 'EditTutor',
        component: EditTutor,
        beforeEnter: () => {
            return PreferenceService.getPreferences()
                .then((response) => {
                    GStore.preferences = response.data.data.getPreferences
                })
                .catch(() => {
                    GStore.preferences = null
                    console.log('cannot load preferences')
                })
        }
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;