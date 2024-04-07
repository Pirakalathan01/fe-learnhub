<script setup>
import { reactive, ref, toRefs } from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./form.vue";
import { useRouter } from "vue-router";
import { useCourseStore } from "../../../stores/adminPortal/course.js";

const router = useRouter();
const courseStore = useCourseStore();
const $externalResults = reactive({});
const isLoading = ref(false);

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


const saveCourse = async (data, validate) => {
  validate.$touch();
  if (!validate.$invalid) {
    try {
      isLoading.value = true;
      await courseStore.storeCourse(data);
      // await router.push({ name:'courses' })
      isLoading.value = false;
    } catch (err) {
      isLoading.value = false;
    }
  }
};

</script>
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Create Courses</h1>
        <p class="mt-2 text-sm text-gray-700"> Create course for students</p>
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
    <Form
        :data="createData"
        :loading="isLoading"
        :validate="validate"
        @save-data="saveCourse"
    />
  </div>

</template>



