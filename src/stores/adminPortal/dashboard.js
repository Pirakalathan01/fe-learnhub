import {defineStore} from "pinia"
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();


export const useDashboardStore = defineStore('dashboard',{
    state: () => ({
        enrollmentsList: [],
        metaView:{},
        authErrors: [],
        overviewWidgetData:[],
    }),
    getters: {
        enrollments: (state) => state.enrollmentsList,
        overviewWidget: (state) => state.overviewWidgetData,
        meta: (state) => state.metaView,
        errors: (state) => state.authErrors
    },
    actions: {

        async getRequestedEnrollments(page,per_page) {
            page = page || 1;
            per_page = per_page || 15;
            this.authErrors = [];
            await axios.get(`/api/admin/enrollments?status=Requested&page=${page}&per_page=${per_page}`)
                .then((response) => {
                    this.enrollmentsList = response.data?.data
                    this.metaView = response.data?.meta
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async getOverviewWidget() {
            this.authErrors = [];
            await axios.get(`/api/admin/dashboard/overview-widget`)
                .then((response) => {
                    this.overviewWidgetData = response.data?.overviewWidget
                    this.metaView = response.data?.meta
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

    },
    persist: true,
})