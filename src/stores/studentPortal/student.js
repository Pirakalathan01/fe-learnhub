import {defineStore} from "pinia"
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();


export const useStudentUserStore = defineStore('studentUser',{
    state: () => ({
        studentData: {},
        studentSuccessData: {},
        authErrors: [],
    }),
    getters: {
        student: (state) => state.studentData,
        successData: (state) => state.studentSuccessData,
        errors: (state) => state.authErrors
    },
    actions: {

        async getStudent(id) {
            this.authErrors = [];
            await axios.get(`/api/student/students/${id}`)
                .then((response) => {
                    this.studentData = response.data?.data
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async updateStudent(id,data) {
            this.authErrors = [];
            await axios.put(`/api/student/students/${id}`,data)
                .then((response) => {
                    this.studentSuccessData = response.data?.data
                    this.router.push({ name: 'student-portal-dashboard' })
                    $toast.success('Student updated successfully',
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