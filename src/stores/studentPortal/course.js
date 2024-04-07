import {defineStore} from "pinia"
import axios from "axios";
import 'vue-toast-notification/dist/theme-sugar.css';

export const useStudentCourseStore = defineStore('studentCourse',{
    state: () => ({
        courseData: {},
        coursesList: [],
        metaView:{},
        authErrors: [],
    }),
    getters: {
        course: (state) => state.courseData,
        courses: (state) => state.coursesList,
        meta: (state) => state.metaView,
        errors: (state) => state.authErrors
    },
    actions: {

        async getCourses(page,per_page) {
            page = page || 1;
            per_page = per_page || 15;
            this.authErrors = [];
            await axios.get(`/api/student/courses?page=${page}&per_page=${per_page}`)
                .then((response) => {
                    this.coursesList = response.data?.data
                    this.metaView = response.data?.meta
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async getCourse(id) {
            this.authErrors = [];
            await axios.get(`/api/student/courses/${id}`)
                .then((response) => {
                    this.courseData = response.data?.data
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

    },
    persist: true,
})