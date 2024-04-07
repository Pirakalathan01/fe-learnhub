import {createRouter, createWebHistory, useRoute} from "vue-router";
import {useAuthStore} from "../stores/auth.js";

import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";

import SideMenu from  "../layout/SideMenu.vue";

import Dashboard from "../pages/AdminPortal/Dashboard/index.vue";
import Courses from "../pages/AdminPortal/Courses/index.vue";
import CreateCourse from "../pages/AdminPortal/Courses/create.vue";
import UpdateCourse from "../pages/AdminPortal/Courses/update.vue";
import Students from "../pages/AdminPortal/Students/index.vue";
import CreateStudent from "../pages/AdminPortal/Students/create.vue";
import UpdateStudent from "../pages/AdminPortal/Students/update.vue";
import Enrollments from "../pages/AdminPortal/Enrollments/index.vue";
import CreateEnrollment from "../pages/AdminPortal/Enrollments/create.vue";
import UpdateEnrollment from "../pages/AdminPortal/Enrollments/update.vue";

import StudentDashboard from "../pages/StudentPortal/Dashboard/index.vue"
import StudentCourses from "../pages/StudentPortal/Courses/index.vue"
import ViewStudentCourse from "../pages/StudentPortal/Courses/view.vue"
import StudentEnrollments from "../pages/StudentPortal/Enrollments/index.vue"

import UserProfile from "../pages/Profile/index.vue"
import NotFound from "../components/NotFound/index.vue"



const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            middleware: "guest",
        },
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            middleware: "guest",
        },
    },
    {
        path: "/",
        name: "side-menu",
        component:SideMenu,
        meta: {
            middleware: "auth",
        },
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: Dashboard,
                meta: {
                    middleware: "admin",
                },
            },
            {
                path: "courses",
                name: "courses",
                component: Courses,
                meta: {
                    middleware: "admin",
                },
            },
            {
                path: "courses/create",
                name: "course-create",
                component: CreateCourse,
                meta: {
                    middleware: "admin",
                },
            },
            {
                path: "courses/update/:id",
                name: "course-update",
                component: UpdateCourse,
                meta: {
                    middleware: "admin",
                },
            },
            {
                path: "students",
                name: "students",
                component: Students,
                meta: {
                    middleware: "admin",
                },
            },
            {
                path: "students/create",
                name: "student-create",
                component: CreateStudent,
                meta: {
                    middleware: "admin",
                },
            },
            {
                path: "students/update/:id",
                name: "student-update",
                component: UpdateStudent,
                meta: {
                    middleware: "admin",
                },
            },
            {
                path: "enrollments",
                name: "enrollments",
                component: Enrollments,
                meta: {
                    middleware: "admin",
                },
            },
            {
                path: "enrollments/create",
                name: "enrollment-create",
                component: CreateEnrollment,
                meta: {
                    middleware: "admin",
                },
            },
            {
                path: "enrollments/update/:id",
                name: "enrollment-update",
                component: UpdateEnrollment,
                meta: {
                    middleware: "admin",
                },
            },
            {
                path: "student-portal/dashboard",
                name: "student-portal-dashboard",
                component: StudentDashboard,
                meta: {
                    middleware: "student",
                },
            },
            {
                path: "student-portal/courses",
                name: "student-portal-courses",
                component: StudentCourses,
                meta: {
                    middleware: "student",
                },
            },
            {
                path: "student-portal/courses/view/:id",
                name: "student-portal-course-view",
                component: ViewStudentCourse,
                meta: {
                    middleware: "student",
                },
            },
            {
                path: "student-portal/enrollments",
                name: "student-portal-enrollments",
                component: StudentEnrollments,
                meta: {
                    middleware: "student",
                },
            },
            {
                path: "user/profile/:id",
                name: "user-profile",
                component: UserProfile,
                meta: {
                    middleware: "auth",
                },
            },


        ]
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const authUser = authStore.user;
    const isAdminRole = authUser && authStore.user.role.name === 'Admin';
    const requiresAuth = to.matched.some(record => record.meta.middleware !== 'guest');
    const requiresAdmin = to.matched.some(record => record.meta.middleware === 'admin');

    if (requiresAuth && !authUser) {
        next({ name: 'login' });
    }
    else if (to.meta.middleware === 'guest' && authUser) {
        next(isAdminRole ? { name: 'dashboard' } : { name: 'student-portal-dashboard' });
    }
    else if (requiresAdmin && !isAdminRole) {
        next({ name: 'student-portal-dashboard' });
    }
    else if (to.meta.middleware === 'student' && isAdminRole) {
        next({ name: 'dashboard' });
    }
    next();
});



export default router;