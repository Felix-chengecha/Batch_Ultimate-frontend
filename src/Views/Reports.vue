<!-- <template>
   <main class=" bg-gray-300 w-full, h-full">

    <div class="flex flex-wrap items-center  sm:mb-0">
      <span class="text-xl mx-4 mt-2">REPORTS </span>
   </div> -->


<!-- <div class="flex  justify-center w-full relative h-content bg-gray-300 "> -->

<!-- <div  class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"> -->
 <!-- <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full h-content  mt-1"> -->

   <!-- <p class="text-md font-semibold uppercase tracking-widest text-gray-700 text-center">GENERATE REPORTS</p> -->

   <!-- sm:p-6 md:col-span-2 lg:p-8 -->

  <!-- <div class=" mt-2">  -->
     <!-- <label class="w-full text-sm text-black  ml-3">MODULE NAME</label>
     <div class="relative"> -->
      <!-- <div class="flex-1"> -->
         <!-- <select v-model="selectedmodule" id="category" class="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-gray-300  focus:ring-gray-300  text-black bg-white mt-2">          
           <option v-for="option in modules" :key="option.value" :value="option.value">{{ option.value }}</option>
         </select> 
       </div>
   </div>
   </div> -->


   <!-- <div class="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-3">
       <div class="flex-1">
         <label for="date" class="text-sm text-center w-full">FROM DATE</label>
         <input type="date" v-model="FromDate" class="w-full rounded-lg p-3 border border-gray-300 text-sm shadow-sm focus:border-gray-300  focus:ring-gray-300  text-black bg-white" />
       </div> -->

       <!-- <div class="flex-1">
         <label for="date" class="text-sm text-center w-full">TO DATE</label>
         <input type="date" v-model="ToDate" class="w-full rounded-lg p-3 border border-gray-300 text-sm shadow-sm focus:border-gray-300  focus:ring-gray-300  text-black bg-white" />
       </div>

       </div> -->

       <!-- <div class="flex-1 mt-4">
         <label class="text-sm ml-3 w-full">REPORT NAME</label>
         <input type="text" v-model="reportname" class="w-full rounded-lg p-2 border border-gray-300 text-sm shadow-sm focus:border-gray-300  focus:ring-gray-300  text-black bg-white" />
       </div> -->


       <!-- <div class="mt-4">
         <label  class="text-sm ml-3 w-full">FORMAT</label>
       <div class="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-1 border border-gray-400 rounded-md">
        

         <div class="flex-1">
         <span class=" ml-3 mt-3 text-sm text-center w-full">EXCEL</span>
            <input type="radio"   v-model="ExcelFormat" class="w-full  focus:border-gray-300 focus:ring-gray-200  text-black bg-white" /> 
      </div>

         <div class="flex-1">
         <span class=" ml-3 mt-3 text-sm text-center w-full">PDF</span>
            <input type="radio"   v-model="PdfFormat" class="w-full  focus:border-gray-300 focus:ring-gray-200  text-black bg-white" /> 
      </div>
   </div>
      </div> -->

<!-- <div class="flex justify-center mt-5">
 <a @click="generateReport" class="  px-5 py-3 inline-block bg-blue-500 rounded-md text-sm font-bold uppercase tracking-widest text-white ">SUBMIT</a>
</div>
 
</div>

</div>


</main>
</template> -->

<!-- <script> -->
<!-- // import Swal from 'sweetalert2';
// import { computed ,watch, onMounted,ref } from 'vue';
// import axios from '../axios'

// export default { 

// setup() { 

// const ExcelFormat = ref(false);
// const PdfFormat = ref(false);
// const ToDate = ref('');
// const FromDate = ref('');
// const selectedmodule= ref();
// const reportname = ref(''); -->

<!-- const generateReport = () => {

  let payload = {
     ToDate: ToDate.value,
     FromDate: FromDate.value,
     Module: selectedmodule.value,
     filename: reportname.value,
     user_id:localStorage.getItem('user_id')
  }
     axios.GenerateReport(Token.value,{payload})
     .then((response) =>{
      console.log(response);
   })
   .catch((error)=>{
      console.log(error);
   })
   } -->
<!-- return{
   reportname,
   ExcelFormat,
   PdfFormat,
   ToDate,
   FromDate,
   selectedmodule,
   generateReport
}
}
}
</script> -->  



<template>
   <div class="p-6 bg-gray-100 min-h-screen">
     <h1 class="text-2xl font-bold mb-4 text-center">Generate Report</h1>
 
     <div class="mb-6 bg-white p-4 rounded-lg shadow-md">
       <div class="mb-4">
         <label class="block font-medium">
           Report Type:
           <select
             v-model="reportType"
             class="w-full p-2 border rounded-md mt-1"
           >
             <option value="Sales Report">Sales Report</option>
             <option value="Product Report">Product Report</option>
             <option value="Customer Report">Customer Report</option>
             <option value="Customer Report">Suppliers Report</option>
             <option value="Customer Report">supplies Report</option>
           </select>
         </label>
       </div>
 
       <div v-if="reportType === 'Sales Report'" class="grid grid-cols-2 gap-4">
         <label class="block">
           From Date:
           <input
             type="date"
             v-model="fromDate"
             class="w-full p-2 border rounded-md mt-1"
           />
         </label>
         <label class="block">
           To Date:
           <input
             type="date"
             v-model="toDate"
             class="w-full p-2 border rounded-md mt-1"
           />
         </label>
       </div>
 
       <div v-if="reportType === 'Product Report'" class="mt-4">
         <label class="block">
           Product Type:
           <input
             type="text"
             v-model="productType"
             placeholder="Enter Product Type"
             class="w-full p-2 border rounded-md mt-1"
           />
         </label>
       </div>
 
       <div v-if="reportType === 'Customer Report'" class="mt-4">
         <label class="block">
           Customer Name:
           <input
             type="text"
             v-model="customerName"
             placeholder="Enter Customer Name"
             class="w-full p-2 border rounded-md mt-1"
           />
         </label>
       </div>
     </div>
 
     <div class="flex gap-4 justify-center mb-6">
       <button
         @click="handleGenerate"
         class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
       >
         Generate
       </button>
       <button
         class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
       >
         Print
       </button>
       <button
         :disabled="!reportData.length"
         class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-300"> Export
       </button>
       <button
         @click="resetFilters"
         class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
       >
         Reset
       </button>
     </div>
 
     <div class="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
       <div v-if="reportData.length > 0">
         <table class="min-w-full table-auto border-collapse border border-gray-300">
           <thead>
             <tr>
               <th
                 v-for="(key, index) in Object.keys(reportData[0])"
                 :key="index"
                 class="border border-gray-300 px-4 py-2 bg-gray-200"
               >
                 {{ key }}
               </th>
             </tr>
           </thead>
           <tbody>
             <tr
               v-for="(row, index) in reportData"
               :key="index"
               class="odd:bg-gray-100"
             >
               <td
                 v-for="(value, i) in Object.values(row)"
                 :key="i"
                 class="border border-gray-300 px-4 py-2"
               >
                 {{ value }}
               </td>
             </tr>
           </tbody>
         </table>
       </div>
       <p v-else class="text-center text-gray-600">No records to display</p>
     </div>
   </div>
 </template>
 
 <script>
//  import { ref, reactive } from "vue";
 import Swal from 'sweetalert2';
 import { ref,onMounted, watch,computed } from 'vue';
 import {useCategoryStore} from '../store/categoryStore'
 import {UseInventoryStore} from '../store/InventoryStore'
 import {useReportStore} from '../store/ReportStore'
//  import {useTransactionStore} from '../store/TransactionsStore'
 
 export default {
   name: "ReportPage",
   setup() { 

      const CategoryStore  = useCategoryStore();
      const inventorystore  = UseInventoryStore();
      // const TransactionStore  = useTransactionStore();
      const ReportStore = useReportStore();

     const fromDate = ref("");
     const toDate = ref("");
     const reportType = ref("Sales Report");
     const productType = ref("");
     const customerName = ref("");
     const reportData = ref([]); 

     
     const category = computed(() => CategoryStore.getData);
     const products = computed(() => inventorystore.getData);
   //   const  Transactions = computed(() =>  TransactionStore.getData);

   //   const filteredCategory = computed(() => ReportStore.filterProductCategory);
   //   const filteredProducts = computed(() => ReportStore.filterProducts); 
   //   const filteredTransactions = computed(() => ReportStore.filteredTransactions )

 
     const handleGenerate = () => {
       let data;

       if (reportType.value === "Sales Report") {
         data = Transactions;
       } else if (reportType.value === "Product Report") {
         data =products;
       } else if (reportType.value === "supplies Report") {
         data =filteredProducts;
       } 

       else if (reportType.value === "suppliers Report") {
         data =filteredProducts;
       } 
   
       reportData.value = data;
     };
 
     const resetFilters = () => {
       fromDate.value = "";
       toDate.value = "";
       productType.value = "";
       customerName.value = "";
       reportData.value = [];
     };
 
     return {
       fromDate,
       toDate,
       reportType,
       productType,
       customerName,
       reportData,
       handleGenerate,
       resetFilters,
     };
   },
 };
 </script>
 
 <style scoped>
 /* Add any custom styles here if necessary */
 </style>
 