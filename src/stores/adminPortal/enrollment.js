import {defineStore} from "pinia"
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();


export const useEnrollmentStore = defineStore('enrollment',{
    state: () => ({
        enrollmentData: {},
        enrollmentSuccessData: {},
        enrollmentsList: [],
        metaView:{},
        authErrors: [],
    }),
    getters: {
        enrollment: (state) => state.enrollmentData,
        successData: (state) => state.enrollmentSuccessData,
        allEnrollments: (state) => state.enrollmentsList,
        meta: (state) => state.metaView,
        errors: (state) => state.authErrors
    },
    actions: {

        async getEnrollments(page,per_page) {
            page = page || 1;
            per_page = per_page || 15;
            this.authErrors = [];
            await axios.get(`/api/admin/enrollments?page=${page}&per_page=${per_page}`)
                .then((response) => {
                    this.enrollmentsList = response.data?.data
                    this.metaView = response.data?.meta
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async getEnrollment(id) {
            this.authErrors = [];
            await axios.get(`/api/admin/enrollments/${id}`)
                .then((response) => {
                    this.enrollmentData = response.data?.data
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async storeEnrollment(data) {
            this.authErrors = [];
            await axios.post(`/api/admin/enrollments`,data)
                .then((response) => {
                    this.enrollmentSuccessData = response.data?.data
                    this.router.push({ name:'enrollments' })
                    $toast.success('Enrollment Created successfully',
                        {
                            position: 'top-right'
                        });
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async updateEnrollment(id,data) {
            this.authErrors = [];
            await axios.put(`/api/admin/enrollments/${id}`,data)
                .then((response) => {
                    this.enrollmentSuccessData = response.data?.data
                    this.router.push({ name:'enrollments' })
                    $toast.success('Enrollment updated successfully',
                        {
                            position: 'top-right'
                        });
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async deleteEnrollment(id) {
            this.authErrors = [];
            await axios.delete(`/api/admin/enrollments/${id}`)
                .then((response) => {
                    this.enrollmentSuccessData = response.data?.data
                    $toast.success('Enrollment deleted successfully',
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