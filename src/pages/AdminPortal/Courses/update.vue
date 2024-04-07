<script setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./form.vue";
import {useRoute, useRouter} from "vue-router";
import {useCourseStore} from "../../../stores/adminPortal/course.js";
import Loader from "../../../components/Spinner/Loader.vue"

const router = useRouter();
const route = useRoute();
const courseStore = useCourseStore();
const $externalResults = reactive({});
const isLoading = ref(false);
const isGetLoading = ref(false);

const rules = {
  course_code: {
    required: helpers.withMessage("The course code field is required", required),
  },
  course_name: {
    required: helpers.withMessage("The course name field is required", required),
  },
  description: {
    required: helpers.withMessage("The description field is required", required),
  },
  course_type: {
    required: helpers.withMessage("The course type field is required", required),
  },
  course_fee: {
    required: helpers.withMessage("The course fee field is required", required),
  },
};

const createData = reactive({
  course_code: "",
  course_name: "",
  description: "",
  course_type: "",
  course_fee: null,
});

const validate = useVuelidate(rules, toRefs(createData), { $externalResults });

const updateCourse = async (data, validate) => {
  validate.$touch();
  if (!validate.$invalid) {
    try {
      isLoading.value = true;
      await courseStore.updateCourse(route.params.id, data);
      // await router.push({ name:'courses' })
      isLoading.value = false;
    } catch (err) {
      isLoading.value = false;
    }
  }
};

const getCourse = async () => {
  try {
    isGetLoading.value = true;
    await courseStore.getCourse(route.params.id)
    createData.course_code = courseStore.course?.course_code;
    createData.course_name = courseStore.course?.course_name;
    createData.description = courseStore.course?.description;
    createData.course_type = courseStore.course?.course_type;
    createData.course_fee = courseStore.course?.course_fee;
    isGetLoading.value = false;
  } catch (err) {
    isGetLoading.value = false;
  }
}

onMounted(async () => {
  await getCourse()
});

</script>
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Update Courses</h1>
        <p class="mt-2 text-sm text-gray-700"> Update course for students</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link :to="{ name: 'courses'}">
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
        @save-data="updateCourse"
    />
  </div>

</template>


