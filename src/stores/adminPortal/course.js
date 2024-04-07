import {defineStore} from "pinia"
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();


export const useCourseStore = defineStore('course',{
    state: () => ({
        courseData: {},
        courseSuccessData: {},
        coursesList: [],
        coursesAllList: [],
        metaView:{},
        authErrors: [],
    }),
    getters: {
        course: (state) => state.courseData,
        successData: (state) => state.courseSuccessData,
        courses: (state) => state.coursesList,
        allCourses: (state) => state.coursesAllList,
        meta: (state) => state.metaView,
        errors: (state) => state.authErrors
    },
    actions: {

        async getCourses(page,per_page) {
            page = page || 1;
            per_page = per_page || 15;
            this.authErrors = [];
            await axios.get(`/api/admin/courses?page=${page}&per_page=${per_page}`)
                .then((response) => {
                    this.coursesList = response.data?.data
                    this.metaView = response.data?.meta
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async getAllCourses() {
            this.authErrors = [];
            await axios.get(`/api/admin/courses/all`)
                .then((response) => {
                    this.coursesAllList = response.data?.data
                    this.metaView = response.data?.meta
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async getCourse(id) {
            this.authErrors = [];
            await axios.get(`/api/admin/courses/${id}`)
                .then((response) => {
                    this.courseData = response.data?.data
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async storeCourse(data) {
            this.authErrors = [];
            await axios.post(`/api/admin/courses`,data)
                .then((response) => {
                    this.courseSuccessData = response.data?.data
                    this.router.push({ name:'courses' })
                    $toast.success('Course Created successfully',
                        {
                            position: 'top-right'
                        });
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async updateCourse(id,data) {
            this.authErrors = [];
            await axios.put(`/api/admin/courses/${id}`,data)
                .then((response) => {
                    this.courseSuccessData = response.data?.data
                    this.router.push({ name:'courses' })
                    $toast.success('Course updated successfully',
                        {
                            position: 'top-right'
                        });
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async deleteCourse(id) {
            this.authErrors = [];
            await axios.delete(`/api/admin/courses/${id}`)
                .then((response) => {
                    this.courseSuccessData = response.data?.data
                    $toast.success('Course deleted successfully',
                        {
                            position: 'top-right'
                        });
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

    },
    persist: true,
})