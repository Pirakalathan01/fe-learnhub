import {defineStore} from "pinia"
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();


export const useStudentEnrollmentStore = defineStore('studentEnrollment',{
    state: () => ({
        enrollmentData: {},
        enrollmentsList: [],
        enrollmentSuccessData: {},
        metaView:{},
        authErrors: [],
    }),
    getters: {
        enrollment: (state) => state.enrollmentData,
        enrollments: (state) => state.enrollmentsList,
        successData: (state) => state.enrollmentSuccessData,
        meta: (state) => state.metaView,
        errors: (state) => state.authErrors
    },
    actions: {

        async getEnrollments(page,per_page) {
            page = page || 1;
            per_page = per_page || 15;
            this.authErrors = [];
            await axios.get(`/api/student/enrollments?page=${page}&per_page=${per_page}`)
                .then((response) => {
                    this.enrollmentsList = response.data?.data
                    this.metaView = response.data?.meta
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async storeEnrollment(data) {
            this.authErrors = [];
            await axios.post(`/api/student/enrollments`,data)
                .then((response) => {
                    this.enrollmentSuccessData = response.data?.data
                    $toast.success('Enrollment Requested successfully',
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