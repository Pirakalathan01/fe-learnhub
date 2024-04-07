<script setup>
import { ref } from "vue";
import {useCourseStore} from "../../../stores/adminPortal/course.js";

const courseStore = useCourseStore();


const props = defineProps({
  data: {
    type: Object,
  },
  loading: {
    type: Boolean,
  },
  validate: {
    type: Object,
  },
});

const emits = defineEmits(["saveData"]);

const courseTypes = ref([
  { id: 'Engineering', name:'Engineering'},
  { id: 'Finance', name:'Finance'},
  { id: 'InformationTechnology', name:'InformationTechnology'},
  { id: 'AcademicCourses', name:'AcademicCourses'}
])

</script>
<template>
  <div class="flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <form class="space-y-8 divide-y divide-gray-200">
          <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div class=" space-y-6  sm:space-y-5">

              <div class="space-y-6 sm:space-y-5">
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Course
                    code </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" name="course_code" id="course_code"
                           v-model="validate.course_code.$model"
                           class="max-w-lg h-8 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"/>
                    <template v-if="validate.course_code.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.course_code.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                    <div
                        v-if="courseStore.errors?.errors?.course_code"
                        class="mt-2 text-red-600 text-sm text-left"
                    >
                      {{ courseStore.errors?.errors?.course_code[0] }}
                    </div>
                  </div>

                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="last-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Course
                    name </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" name="course_name" id="course_name"
                           v-model="validate.course_name.$model"
                           class="max-w-lg h-8 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"/>
                    <template v-if="validate.course_name.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.course_name.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                    <div
                        v-if="courseStore.errors?.errors?.course_name"
                        class="mt-2 text-red-600 text-sm text-left"
                    >
                      {{ courseStore.errors?.errors?.course_name[0] }}
                    </div>
                  </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="about" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Description </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea id="description" name="description" rows="3"
                                  v-model="validate.description.$model"
                                  class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"/>
                    <p class="mt-2 text-sm text-gray-500">Write a few sentences about course.</p>
                    <template v-if="validate.description.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.description.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                    <div
                        v-if="courseStore.errors?.errors?.description"
                        class="mt-2 text-red-600 text-sm text-left"
                    >
                      {{ courseStore.errors?.errors?.description[0] }}
                    </div>
                  </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="country" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Course
                    Type </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <select id="course_type" name="course_type"
                            v-model="validate.course_type.$model"
                            class="max-w-lg h-8 block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border border-gray-300 rounded-md">
                      <option v-for="courseType in courseTypes" :key="courseType.id" :value="courseType.id">{{ courseType.name }}</option>
                    </select>
                    <template v-if="validate.course_type.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.course_type.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                    <div
                        v-if="courseStore.errors?.errors?.course_type"
                        class="mt-2 text-red-600 text-sm text-left"
                    >
                      {{ courseStore.errors?.errors?.course_type[0] }}
                    </div>
                  </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="last-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Course
                    Fee </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="number" name="course_fee" id="course_fee"
                           v-model="validate.course_fee.$model"
                           class="max-w-lg h-8 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"/>
                    <template v-if="validate.course_fee.$error" class="text-left">
                      <div
                          v-for="(error, index) in validate.course_fee.$errors"
                          :key="index"
                          class="mt-2 text-red-600 text-sm"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                    <div
                        v-if="courseStore.errors?.errors?.course_fee"
                        class="mt-2 text-red-600 text-sm text-left"
                    >
                      {{ courseStore.errors?.errors?.course_fee[0] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-5">
            <div class="flex justify-end">
              <router-link :to="{ name: 'courses'}">
              <button type="button"
                      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              </router-link>
              <button
                  type="button"
                  @click="emits('saveData', data, validate)"
                  :disabled="loading"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg v-if="loading" class="w-4 h-5 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                  </path>
                </svg>
                {{' '}}{{ loading? 'Saving...' : 'Save' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



