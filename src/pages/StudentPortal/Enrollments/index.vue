<script setup>
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationIcon } from '@heroicons/vue/outline'
import {onMounted, ref} from "vue";
import Loader from "../../../components/Spinner/Loader.vue"
import {useStudentEnrollmentStore} from "../../../stores/studentPortal/enrollment.js";

const enrollmentStore = useStudentEnrollmentStore();
const isLoading = ref(false);
const deleteLoading = ref(false)
const openDeleteModel =  ref(false);
const selectedId = ref('')

const paginationDetail = ref({
  per_page: 15,
  from: 0,
  to: 0,
  total: 0,
})
const page = ref(1)

const getEnrollments = async (page, per_page) => {
  try {
    isLoading.value = true;
    await enrollmentStore.getEnrollments(page, per_page)
    paginationDetail.value.per_page = enrollmentStore.meta?.per_page;
    paginationDetail.value.from = enrollmentStore.meta?.from;
    paginationDetail.value.to = enrollmentStore.meta?.to;
    paginationDetail.value.total = enrollmentStore.meta?.total;
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
  }
}


const onClickHandler = async (page) => {
  await getEnrollments(page, paginationDetail.value.per_page);
};

onMounted(async () => {
  await getEnrollments(page.value, paginationDetail.value.per_page);
});
</script>


<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Enrollments</h1>
        <p class="mt-2 text-sm text-gray-700">The enrollments list provides an overview of available students</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
      </div>
    </div>
    <Loader v-if="isLoading"/>
    <div v-else class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Start Date
                </th>
                <th scope="col"
                    class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
                  Course Code
                </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Course Name
                </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Course Type
                </th>

                <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Status
                </th>
              </tr>
              </thead>
              <tbody v-if="enrollmentStore.enrollments.length > 0" class="divide-y divide-gray-200 bg-white">
              <tr v-for="enrollment in enrollmentStore?.enrollments" :key="enrollment.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ enrollment.created_at }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ enrollment.course.course_code }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ enrollment.course.course_name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ enrollment.course.course_type }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span v-if="enrollment.status === 'Cancelled'" class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"> Cancelled </span>
                  <span v-if="enrollment.status === 'Enrolled'" class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"> Enrolled </span>
                  <span v-if="enrollment.status === 'Completed'" class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"> Completed </span>
                  <span v-if="enrollment.status === 'Requested'" class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"> Requested </span>
                </td>
              </tr>
              </tbody>
              <tbody v-else class="divide-y divide-gray-200 text-center">
              <tr>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6" :colspan="7">
                  No details found.
                </td>
              </tr>
              </tbody>
            </table>
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Showing
                    {{ ' ' }}
                    <span class="font-medium">{{ paginationDetail?.from }}</span>
                    {{ ' ' }}
                    to
                    {{ ' ' }}
                    <span class="font-medium">{{ paginationDetail?.to }}</span>
                    {{ ' ' }}
                    of
                    {{ ' ' }}
                    <span class="font-medium">{{ paginationDetail?.total }}</span>
                    {{ ' ' }}
                    results
                  </p>
                </div>
                <div>
                  <vue-awesome-paginate
                      :total-items="paginationDetail.total"
                      :items-per-page="paginationDetail.per_page"
                      :max-pages-shown="3"
                      v-model="page"
                      :on-click="onClickHandler"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}

</style>

