import {defineStore} from "pinia"
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();


export const useStudentStore = defineStore('student',{
    state: () => ({
        studentData: {},
        studentSuccessData: {},
        studentsList: [],
        studentsAllList: [],
        metaView:{},
        authErrors: [],
    }),
    getters: {
        student: (state) => state.studentData,
        successData: (state) => state.studentSuccessData,
        students: (state) => state.studentsList,
        allStudents: (state) => state.studentsAllList,
        meta: (state) => state.metaView,
        errors: (state) => state.authErrors
    },
    actions: {

        async getStudents(page,per_page) {
            page = page || 1;
            per_page = per_page || 15;
            this.authErrors = [];
            await axios.get(`/api/admin/students?page=${page}&per_page=${per_page}`)
                .then((response) => {
                    this.studentsList = response.data?.data
                    this.metaView = response.data?.meta
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async getAllStudents() {
            this.authErrors = [];
            await axios.get(`/api/admin/students/all`)
                .then((response) => {
                    this.studentsAllList = response.data?.data
                    this.metaView = response.data?.meta
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async getStudent(id) {
            this.authErrors = [];
            await axios.get(`/api/admin/students/${id}`)
                .then((response) => {
                    this.studentData = response.data?.data
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async storeStudent(data) {
            this.authErrors = [];
            await axios.post(`/api/admin/students`,data)
                .then((response) => {
                    this.studentSuccessData = response.data?.data
                    this.router.push({ name:'students' })
                    $toast.success('Student Created successfully',
                        {
                            position: 'top-right'
                        });
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async updateStudent(id,data) {
            this.authErrors = [];
            await axios.put(`/api/admin/students/${id}`,data)
                .then((response) => {
                    this.studentSuccessData = response.data?.data
                    this.router.push({ name:'students' })
                    $toast.success('Student updated successfully',
                        {
                            position: 'top-right'
                        });
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async deleteStudent(id) {
            this.authErrors = [];
            await axios.delete(`/api/admin/students/${id}`)
                .then((response) => {
                    this.studentSuccessData = response.data?.data
                    $toast.success('Student deleted successfully',
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