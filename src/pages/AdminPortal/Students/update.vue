<script setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import {email, helpers, required} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./form.vue";
import {useRoute, useRouter} from "vue-router";
import Loader from "../../../components/Spinner/Loader.vue"
import {useStudentStore} from "../../../stores/adminPortal/student.js";

const router = useRouter();
const route = useRoute();
const studentStore = useStudentStore();
const $externalResults = reactive({});
const isLoading = ref(false);
const isGetLoading = ref(false);

const rules = {
  title: {
    required: helpers.withMessage("The title field is required", required),
  },
  first_name: {
    required: helpers.withMessage("The first name field is required", required),
  },
  last_name: {
    required: helpers.withMessage("The last name field is required", required),
  },
  email: {
    required: helpers.withMessage("The email field is required", required),
    email
  },
  is_active: {
    required: helpers.withMessage("The is_active field is required", required),
  },
  gender: {
    required: helpers.withMessage("The gender field is required", required),
  },
  phone_number: {
    required: helpers.withMessage("The phone_number field is required", required),
  },
  password: {},
  password_confirmation: {},
};

const createData = reactive({
  title: "",
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  is_active: false,
  phone_number: "",
  password: "",
  password_confirmation: "",
});

const validate = useVuelidate(rules, toRefs(createData), { $externalResults });

const updateStudent = async (data, validate) => {
  validate.$touch();
  if (!validate.$invalid) {
    try {
      isLoading.value = true;
      await studentStore.updateStudent(route.params.id, data);
      // await router.push({ name:'students' })
      isLoading.value = false;
    } catch (err) {
      isLoading.value = false;
    }
  }
};

const getStudent = async () => {
  try {
    isGetLoading.value = true;
    await studentStore.getStudent(route.params.id)
    createData.title = studentStore.student?.title;
    createData.first_name = studentStore.student?.first_name;
    createData.last_name = studentStore.student?.last_name;
    createData.email = studentStore.student?.email;
    createData.gender = studentStore.student?.gender;
    createData.is_active = studentStore.student?.is_active;
    createData.phone_number = studentStore.student?.phone_number;

    isGetLoading.value = false;
  } catch (err) {
    isGetLoading.value = false;
  }
}

onMounted(async () => {
  await getStudent()
});

</script>
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Update Student</h1>
        <p class="mt-2 text-sm text-gray-700"> Update student in admin side</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link :to="{ name: 'students'}">
          <button type="button"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Go Back
          </button>
        </router-link>
      </div>
    </div>
    <Loader v-if="isGetLoading"/>
    <Form
        v-else
        :data="createData"
        :loading="isLoading"
        :validate="validate"
        @save-data="updateStudent"
    />
  </div>

</template>


