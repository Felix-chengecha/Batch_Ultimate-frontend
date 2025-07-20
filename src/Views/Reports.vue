<template>
  <div class="p-1 md:p-1 bg-gray-50 min-h-screen">
    <div class="max-w-1xl mx-auto p-1">
      <h1 class="text-2xl md:text-3xl font-bold mb-3  text-gray-800">Generate Reports</h1>

      <!-- Report Configuration Card -->
      <div class="mb-6  bg-white p-4 md:p-5 rounded-lg shadow-sm border border-gray-200">
        <!-- <h2 class="text-lg font-semibold mb-4 text-gray-700 text-center">Report Configuration</h2> -->
        
        <div class="mb-4">
          <label class="block ml-2  font-medium text-gray-700 mb-1"> Report Type </label>
          <select v-model="reportType" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
            <option value="Sales Report">Sales Report</option>
            <option value="Product Report">Product Report</option>
            <option value="Stock Alert Report">Stock Alert Report</option>
            <option value="Customer Report">Customer Report</option>
            <option value="Suppliers Report">Suppliers Report</option>
            <option value="Supplies Report">Supplies Report</option>
          </select>
        </div>

        <!-- Date Range (Sales Report) -->
        <div v-if="reportType === 'Sales Report'" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class=" ml-2 block text-gray-700 mb-1">
              From Date:
            </label>
            <input
              type="date"
              v-model="fromDate"
              class="w-4/5 p-2 ml-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">
              To Date:
            </label>
            <input
              type="date"
              v-model="toDate"
              class="w-3/4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <!-- Product Report Filter -->
        <div v-if="reportType === 'Product Report'" class="mt-4">
          <label class="block text-gray-700 mb-1">
            Product Type:
          </label>
          <input
            type="text"
            v-model="productType"
            placeholder="Enter Product Type"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <!-- Stock Alert Report Filter -->
        <div v-if="reportType === 'Stock Alert Report'" class="mt-4">
          <label class="block text-gray-700 mb-1">
            Low Stock Threshold:
          </label>
          <input
            type="number"
            v-model.number="lowStockThreshold"
            placeholder="Enter Low Threshold"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <!-- Customer Report Filter -->
        <div v-if="reportType === 'Customer Report'" class="mt-4">
          <label class="block text-gray-700 mb-1">
            Customer Name:
          </label>
          <input
            type="text"
            v-model="customerName"
            placeholder="Enter Customer Name"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>


    <div class="bg-gray-500 px-2 py-1 rounded">
     <div class="flex justify-between">
      <div class="flex space-x-8">

         

      <!-- Action Buttons -->
      <!-- <div class="flex flex-col sm:flex-row gap-3 justify-center mb-6"> -->
        <button 
          @click="handleGenerate" 
          class="px-1 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
          Generate
        </button>

          <button 
          @click="resetFilters"
          class="px-1 py-2 bg-red-400 text-white rounded-md hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          Reset
        </button>
        </div>

          <h2 class="text-center font-medium text-2xl text-white">Report Results</h2>

        <div class="flex space-x-10">    
        <button 
          @click="handlePrint"
          :disabled="!reportData.length"
          class="px-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd" />
          </svg>
          Print
        </button>


        <button 
          @click="handleExport"
          :disabled="!reportData.length"
          class="px-1 py-2 bg-purple-600 text-gray-500 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition flex items-center justify-center gap-2 disabled:bg-amber-100 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Export
        </button> 

           <button 
          @click="handleExport"
          :disabled="!reportData.length"
          class="py-1 px-2 bg-purple-600 text-gray-500 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition flex items-center justify-center gap-2 disabled:bg-green-500 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Save Report
        </button>
        
      
      <!-- </div> -->
       </div>
         </div>
         </div>

      <!-- Results Section -->
      <div class="bg-white p-4 mt-1 md:p-6 rounded-lg shadow-sm border border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <!-- <h2 class="text-lg font-semibold text-gray-700">Report Results</h2> -->
          <span class="text-sm text{{ title }}-gray-500">
            {{ filteredData.length }} records found
          </span>
        </div>

        <div v-if="isLoading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        <div v-else>
          <div v-if="filteredData.length > 0" class="overflow-x-auto">
            <div class="min-w-full inline-block align-middle">
              <div class="overflow-hidden rounded-lg border border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th 
                        v-for="(key, index) in Object.keys(filteredData[0])" 
                        :key="index" 
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div class="flex items-center">
                          {{ key }}
                          <button @click="sortTable(key)" class="ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr 
                      v-for="(row, index) in paginatedData" 
                      :key="index" 
                      class="hover:bg-gray-50 transition"
                    >
                      <td 
                        v-for="(value, i) in Object.values(row)" 
                        :key="i" 
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {{ value }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="filteredData.length > itemsPerPage" class="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button 
                  @click="currentPage = Math.max(1, currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button 
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to 
                    <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredData.length) }}</span> of 
                    <span class="font-medium">{{ filteredData.length }}</span> results
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                      @click="currentPage = Math.max(1, currentPage - 1)"
                      :disabled="currentPage === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Previous</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      v-for="page in visiblePages"
                      :key="page"
                      @click="currentPage = page"
                      :class="[page === currentPage ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50']"
                      class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      {{ page }}
                    </button>
                    <button 
                      @click="currentPage = Math.min(totalPages, currentPage + 1)"
                      :disabled="currentPage === totalPages"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Next</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="reportData.length > 0 && filteredData.length === 0" class="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No matching records found</h3>
            <p class="mt-1 text-sm text-gray-500">Try adjusting your filters.</p>
          </div>
          <div v-else class="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No records found</h3>
            <p class="mt-1 text-sm text-gray-500">Generate a report to see data here.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import Swal from 'sweetalert2';
import { useReportStore } from '../store/ReportStore';

export default {
  name: "ReportPage",
  setup() {
    const ReportStore = useReportStore();

    // Reactive state
    const fromDate = ref("");
    const toDate = ref("");
    const reportType = ref("Sales Report");
    const productType = ref("");
    const customerName = ref("");
    const lowStockThreshold = ref(0);
    const reportData = ref([]);
    const isLoading = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const sortKey = ref(null);
    const sortDirection = ref('asc');

    // Computed properties
    const filteredData = computed(() => {
      if (!reportData.value || reportData.value.length === 0) return [];
      
      let data = [...reportData.value];
      
      // Apply filters based on report type
      switch (reportType.value) {
        case "Sales Report":
          if (fromDate.value && toDate.value) {
            data = data.filter(item => {
              const itemDate = new Date(item.date);
              return itemDate >= new Date(fromDate.value) && itemDate <= new Date(toDate.value);
            });
          }
          break;
          
        case "Product Report":
          if (productType.value) {
            const searchTerm = productType.value.toLowerCase();
            data = data.filter(item => 
              (item.category?.toLowerCase().includes(searchTerm) || 
               item.name?.toLowerCase().includes(searchTerm))
            );
          }
          break;
          
        case "Customer Report":
          if (customerName.value) {
            const searchTerm = customerName.value.toLowerCase();
            data = data.filter(item => 
              item.customerName?.toLowerCase().includes(searchTerm)
            );
          }
          break;
          
        case "Stock Alert Report":
          if (lowStockThreshold.value) {
            data = data.filter(item => 
              item.quantity <= parseFloat(lowStockThreshold.value)
            );
          }
          break;
      }
      
      return data;
    });

    const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value));
    
    const visiblePages = computed(() => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages.value, start + maxVisible - 1);
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    });

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      let data = [...filteredData.value];
      
      if (sortKey.value) {
        data.sort((a, b) => {
          if (a[sortKey.value] < b[sortKey.value]) return sortDirection.value === 'asc' ? -1 : 1;
          if (a[sortKey.value] > b[sortKey.value]) return sortDirection.value === 'asc' ? 1 : -1;
          return 0;
        });
      }
      
      return data.slice(start, end);
    });

    // Methods
    const handleGenerate = async () => {
      isLoading.value = true;
      try {
        const payLoad = {
          reportType: reportType.value,
          format: "JSON",
          parameters: {}
        };

        // Set parameters based on report type
        if (reportType.value === "Sales Report") {
          payLoad.parameters = {
            FromDate: fromDate.value,
            ToDate: toDate.value
          };
        } else if (reportType.value === "Product Report") {
          payLoad.parameters = {
            ProductType: productType.value
          };
        } else if (reportType.value === "Customer Report") {
          payLoad.parameters = {
            customerName: customerName.value
          };
        } else if (reportType.value === "Stock Alert Report") {
          payLoad.parameters = {
            LowStockThreshold: lowStockThreshold.value
          };
        }

        const response = await ReportStore.FetchReportData(payLoad);
        reportData.value = response || [];
        currentPage.value = 1;

        if (reportData.value.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'No Data Found',
            text: 'Your search criteria did not match any records.',
            confirmButtonColor: '#3b82f6',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to generate report. Please try again.',
          confirmButtonColor: '#ef4444',
        }); 
      } finally {
        isLoading.value = false;
      }
    };

    const handlePrint = async () => {
      if (filteredData.value.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No Data to Print',
          text: 'Please generate a report first.',
          confirmButtonColor: '#3b82f6',
        });
        return false;
      }else{

        //Get Parameters Dynamically


        //Define RequestData
        var requestData = {
          reportType : reportType.value,
          format : "pdf",
          parameters : {
          }
        }
        // Set parameters based on report type
        if (reportType.value === "Sales Report") {
          requestData.parameters = {
            fromDate: fromDate.value,
            toDate: toDate.value
          };
        } else if (reportType.value === "Product Report") {
          requestData.parameters = {
            productType: productType.value
          };
        } else if (reportType.value === "Customer Report") {
          requestData.parameters = {
            customerName: customerName.value
          };
        } else if (reportType.value === "Stock Alert Report") {
          requestData.parameters = {
            lowStockThreshold: lowStockThreshold.value,
            format : requestData.format
          };
        }

        //pass request to backend
        try{
          const response = await ReportStore.ExportReportData(requestData);
          alert("Your report has been generated and downloaded successfully.");
          return true;
        }catch(error){
          Swal.fire({
            icon: 'error',
            title: 'Download Failed',
            text: error.message || 'An error occurred while downloading the report.',
            confirmButtonColor: '#e11d48'
          });

          return false;
        }
        


      }
    };

    const handleExport = async () => {
       if (filteredData.value.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No Data to Print',
          text: 'Please generate a report first.',
          confirmButtonColor: '#3b82f6',
        });
        return false;
      }else{

        //Get Parameters Dynamically


        //Define RequestData
        var requestData = {
          reportType : reportType.value,
          format : "pdf",
          parameters : {
          }
        }
        // Set parameters based on report type
        if (reportType.value === "Sales Report") {
          requestData.parameters = {
            fromDate: fromDate.value,
            toDate: toDate.value
          };
        } else if (reportType.value === "Product Report") {
          requestData.parameters = {
            productType: productType.value
          };
        } else if (reportType.value === "Customer Report") {
          requestData.parameters = {
            customerName: customerName.value
          };
        } else if (reportType.value === "Stock Alert Report") {
          requestData.parameters = {
            lowStockThreshold: lowStockThreshold.value
          };
        }

        //pass request to backend
        try{
          const response = await ReportStore.ExportReportData(requestData);
          alert("Your report has been generated and downloaded successfully.");
          return true;
        }catch(error){
          Swal.fire({
            icon: 'error',
            title: 'Download Failed',
            text: error.message || 'An error occurred while downloading the report.',
            confirmButtonColor: '#e11d48'
          });

          return false;
        }
        


      }
    };

    const resetFilters = () => {
      fromDate.value = "";
      toDate.value = "";
      productType.value = "";
      customerName.value = "";
      lowStockThreshold.value = 0;
      reportData.value = [];
      currentPage.value = 1;
      sortKey.value = null;
      sortDirection.value = 'asc';
      ReportStore.clearReportData();
    };

    const sortTable = (key) => {
      if (sortKey.value === key) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey.value = key;
        sortDirection.value = 'asc';
      }
    };

    // Watchers
    watch([reportType, fromDate, toDate, productType, customerName, lowStockThreshold], () => {
      currentPage.value = 1;
    });

    return {
      fromDate,
      toDate,
      reportType,
      productType,
      customerName,
      lowStockThreshold,
      reportData,
      filteredData,
      isLoading,
      currentPage,
      itemsPerPage,
      totalPages,
      visiblePages,
      paginatedData,
      handleGenerate,
      handlePrint,
      handleExport,
      resetFilters,
      sortTable,
    };
  },
};
</script>

<style scoped>
/* Print-specific styles */
@media print {
  body * {
    visibility: hidden;
  }
  .bg-white, .bg-white * {
    visibility: visible;
  }
  .bg-white {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  /* Hide buttons and other non-essential elements when printing */
  button, .flex, .hidden {
    display: none !important;
  }
}

/* Smooth transitions for interactive elements */
button, select, input {
  transition: all 0.2s ease;
}

/* Better focus states */
input:focus, select:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
</style>