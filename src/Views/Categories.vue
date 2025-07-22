<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6">
    <!-- Main Container -->
    <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <!-- Header Section -->
      <div class="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Product Categories</h1>
          <p class="text-sm text-gray-500 mt-1">Manage your product categories and organization</p>
        </div>
        <div class="flex gap-3">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search categories..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            @click="openModal"
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add New Category
          </button>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('categoryName')">
                Category Name
                <span v-if="sortField === 'categoryName'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('categoryCode')">
                Code
                <span v-if="sortField === 'categoryCode'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('status')">
                Status
                <span v-if="sortField === 'status'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('createdOn')">
                Created On
                <span v-if="sortField === 'createdOn'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in filteredCategories" :key="item.categoryID" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-blue-600 font-medium">{{ item.categoryName.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.categoryName }}</div>
                    <div class="text-sm text-gray-500 truncate max-w-xs">{{ item.categoryDescription }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 font-mono">{{ item.categoryCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'bg-green-100 text-green-800': item.status === 'active',
                  'bg-yellow-100 text-yellow-800': item.status === 'inactive',
                  'bg-red-100 text-red-800': item.status === 'archived'
                }" class="px-3 py-1 text-xs font-medium rounded-full capitalize">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(item.createdOn) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    @click="openModal(item)"
                    class="flex items-center space-x-1 text-blue-600 hover:text-blue-900 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span class="sr-only sm:not-sr-only">Edit</span>
                  </button>
                  <button
                    @click="confirmDelete(item)"
                    class="flex items-center space-x-1 text-red-600 hover:text-red-900 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    <span class="sr-only sm:not-sr-only">Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCategories.length === 0" class="p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No categories found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by adding a new product category.</p>
        <div class="mt-6">
          <button
            @click="openModal"
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add Category
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredCategories.length > 0" class="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <div class="flex-1 flex justify-between sm:hidden">
          <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              to <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredCategories.length) }}</span>
              of <span class="font-medium">{{ filteredCategories.length }}</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="currentPage = 1"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">First</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg class="h-5 w-5 -ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <template v-for="page in visiblePages" :key="page">
                <button
                  @click="currentPage = page"
                  :class="[page === currentPage ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50', 'relative inline-flex items-center px-4 py-2 border text-sm font-medium']"
                >
                  {{ page }}
                </button>
              </template>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click="currentPage = totalPages"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Last</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                <svg class="h-5 w-5 -mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                    {{ currentCategory ? 'Edit Category' : 'Add New Category' }}
                  </h3>
                  <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div class="mt-6 space-y-4">
                  <div>
                    <label for="category-name" class="block text-sm font-medium text-gray-700">Category Name *</label>
                    <input
                      type="text"
                      id="category-name"
                      v-model="formData.categoryName"
                      class="mt-1 h-10 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      :class="{ 'border-red-500': errors.categoryName }"
                    >
                    <p v-if="errors.categoryName" class="mt-1 text-sm text-red-600">{{ errors.categoryName }}</p>
                  </div>

                  <div>
                    <label for="category-status" class="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      id="category-status"
                      v-model="formData.status"
                      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label for="category-description" class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id="category-description"
                      v-model="formData.categoryDescription"
                      rows="3"
                      class="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type your category description (max 500 characters)"
                    ></textarea>
                    <p class="mt-1 text-xs text-gray-500 text-right">
                      {{ formData.categoryDescription ? formData.categoryDescription.length : 0 }}/500
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="submitForm"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>
                {{ currentCategory ? 'Update' : 'Create' }}
              </span>
            </button>
            <button
              type="button"
              @click="closeModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoryStore } from '../store/categoryStore'
import Swal from 'sweetalert2'
import { computed, ref, onMounted, watch } from 'vue'

export default {
  setup() {
    const CategoryStore = useCategoryStore()
    const data = computed(() => CategoryStore.getData)
    
    // Form state
    const formData = ref({
      categoryName: '',
      categoryCode: '',
      categoryDescription: '',
      status: 'active'
    })
    
    const errors = ref({})
    const isSubmitting = ref(false)
    const isModalOpen = ref(false)
    const currentCategory = ref(null)
    const searchQuery = ref('')
    const sortField = ref('createdOn')
    const sortDirection = ref('desc')
    const currentPage = ref(1)
    const itemsPerPage = ref(10)

    // Computed properties
    const filteredCategories = computed(() => {
      let result = [...data.value]
      
      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(item => 
          item.categoryName.toLowerCase().includes(query) ||
          item.categoryCode.toLowerCase().includes(query) ||
          (item.categoryDescription && item.categoryDescription.toLowerCase().includes(query)))
      }
      
      // Apply sorting
      result.sort((a, b) => {
        const field = sortField.value
        const direction = sortDirection.value === 'asc' ? 1 : -1
        
        if (a[field] < b[field]) return -1 * direction
        if (a[field] > b[field]) return 1 * direction
        return 0
      })
      
      return result
    })

    const paginatedCategories = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredCategories.value.slice(start, end)
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredCategories.value.length / itemsPerPage.value)
    })

    const visiblePages = computed(() => {
      const range = 2
      const start = Math.max(1, currentPage.value - range)
      const end = Math.min(totalPages.value, currentPage.value + range)
      
      const pages = []
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    })

    // Methods
    const openModal = (category = null) => {
      currentCategory.value = category
      if (category) {
        // Bind data for editing
        formData.value = {
          categoryName: category.categoryName,
          categoryCode: category.categoryCode,
          categoryDescription: category.categoryDescription,
          status: category.status
        }
      } else {
        // Reset form for new category
        formData.value = {
          categoryName: '',
          categoryCode: '',
          categoryDescription: '',
          status: 'active'
        }
      }
      errors.value = {}
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
    }

    const validateForm = () => {
      errors.value = {}
      let isValid = true
      
      if (!formData.value.categoryName.trim()) {
        errors.value.categoryName = 'Category name is required'
        isValid = false
      } else if (formData.value.categoryName.length > 50) {
        errors.value.categoryName = 'Category name must be less than 50 characters'
        isValid = false
      }
      
      if (formData.value.categoryDescription && formData.value.categoryDescription.length > 500) {
        errors.value.categoryDescription = 'Description must be less than 500 characters'
        isValid = false
      }
      
      return isValid
    }

    const generateCategoryCode = (categoryName) => {
      const prefix = categoryName.slice(0, 2).toUpperCase()
      const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase()
      return (prefix + randomPart).padEnd(5, 'X')
    }

    const submitForm = async () => {
      if (!validateForm()) return
      
      isSubmitting.value = true
      
      try {
        const payload = { ...formData.value }
        
        if (!currentCategory.value) {
          // Generate code for new categories only
          payload.categoryCode = generateCategoryCode(payload.categoryName)
          payload.noOfItems = 0
        }
        
        if (currentCategory.value) {
          await CategoryStore.updateCategory({
            ...payload,
            categoryID: currentCategory.value.categoryID
          })
          showToast('success', 'Category updated successfully')
        } else {
          await CategoryStore.AddnewCategory(payload)
          showToast('success', 'Category created successfully')
        }
        
        closeModal()
      } catch (error) {
        showToast('error', error.message || 'An error occurred')
      } finally {
        isSubmitting.value = false
      }
    }

    const confirmDelete = (category) => {
      Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete "${category.categoryName}". This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await CategoryStore.deleteCategory(category.categoryID)
            showToast('success', 'Category deleted successfully')
          } catch (error) {
            showToast('error', error.message || 'Failed to delete category')
          }
        }
      })
    }

    const sortBy = (field) => {
      if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortField.value = field
        sortDirection.value = 'asc'
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const showToast = (icon, message) => {
      Swal.fire({
        position: 'top-end',
        icon,
        title: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        timerProgressBar: true
      })
    }

    // Lifecycle hooks
    onMounted(() => {
      const token = localStorage.getItem('token')
      CategoryStore.fetchCategories(token)
    })

    watch(totalPages, (newVal) => {
      if (currentPage.value > newVal) {
        currentPage.value = Math.max(1, newVal)
      }
    })

    return {
      data,
      formData,
      errors,
      isModalOpen,
      currentCategory,
      searchQuery,
      filteredCategories,
      paginatedCategories,
      currentPage,
      itemsPerPage,
      totalPages,
      visiblePages,
      sortField,
      sortDirection,
      openModal,
      closeModal,
      submitForm,
      confirmDelete,
      sortBy,
      formatDate,
      isSubmitting
    }
  }
}
</script>

<style>
/* Add any custom styles here */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (min-width: 640px) {
  .sm\:not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
}
</style>