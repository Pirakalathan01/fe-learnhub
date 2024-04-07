import {defineStore} from "pinia"
import axios from "axios";
import {useToast} from "vue-toast-notification";

const $toast = useToast();

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        authErrors: null,
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors
    },
    actions: {
        async getToken() {
            await axios.get("/sanctum/csrf-cookie");
        },

        async handleLogin(data) {
            this.authErrors = null;
            await this.getToken();
            await axios.post('/login',data)
                .then(response => {
                    this.authUser = response.data?.user
                    if(response.data?.user?.role?.name === 'Admin'){
                        this.router.push({ name: "dashboard" })
                    }
                    else {
                        this.router.push({ name: "student-portal-dashboard" })
                    }

                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async handleRegister(data) {
            this.authErrors = null;
            await this.getToken();
            await axios.post('/register',data)
                .then(response => {
                    this.router.push({ name: "login" })
                    $toast.success('Student Registered successfully',
                        {
                            position: 'top-right'
                        });
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        },

        async handleLogout() {
            this.authErrors = null;
            await this.getToken();
            await axios.post('/logout')
                .then(response => {
                    this.authUser = null
                    this.router.push({ name: "login" })
                })
                .catch(error => {
                    this.authErrors = error.response.data;
                });
        }


    },
    persist: true,
});