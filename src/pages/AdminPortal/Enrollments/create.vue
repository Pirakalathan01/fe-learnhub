<script setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import {helpers, required} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./form.vue";
import { useRouter } from "vue-router";
import { useCourseStore } from "../../../stores/adminPortal/course.js";
import {useStudentStore} from "../../../stores/adminPortal/student.js";
import {useEnrollmentStore} from "../../../stores/adminPortal/enrollment.js";

const router = useRouter();
const enrollmentStore = useEnrollmentStore();
const studentStore = useStudentStore();
const courseStore = useCourseStore();
const $externalResults = reactive({});
const isLoading = ref(false);

const rules = {
  course_id: {
    required: helpers.withMessage("The course field is required", required),
  },
  user_id: {
    required: helpers.withMessage("The student field is required", required),
  },
  status: {},
};


const createData = reactive({
  course_id: "",
  user_id: "",
  status: "",
});

const validate = useVuelidate(rules, toRefs(createData), { $externalResults });


const saveEnrollment = async (data, validate) => {
  validate.$touch();

  if (!validate.$invalid) {
    try {
      isLoading.value = true;
      await enrollmentStore.storeEnrollment(data);
      // await router.push({ name:'enrollments' })
      isLoading.value = false;
    } catch (err) {
      isLoading.value = false;
    }
  }
};

const getAllCourses = async () => {
  await courseStore.getAllCourses()
}

const getAllStudents = async () => {
  await studentStore.getAllStudents()
}

onMounted(async () => {
  await getAllCourses();
  await getAllStudents();
});
</script>
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Create Enrollment</h1>
        <p class="mt-2 text-sm text-gray-700"> Create Enrollment in admin side</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link :to="{ name: 'enrollments'}">
          <button type="button"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Go Back
          </button>
        </router-link>
      </div>
    </div>
    <Form
        :data="createData"
        :courseData="courseStore.allCourses"
        :studentData="studentStore.allStudents"
        :loading="isLoading"
        :validate="validate"
        @save-data="saveEnrollment"
    />
  </div>

</template>



