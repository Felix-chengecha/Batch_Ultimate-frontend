<template>
  <div class="rounded-xl bg-white h-full p-4 shadow-sm border border-gray-100">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Transactions</h1>
        <p class="text-sm text-gray-500 mt-1">All transactions</p>
      </div>
      
      <div class="relative w-full md:w-96">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="text" 
          id="Search" 
          placeholder="Search your transactions..." 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
        >
      </div>
    </div>



     <div class="overflow-x-auto">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-100 text-sm rounded">
          <thead class="text-left">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Transaction ID</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">SKU</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Item</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No Item</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Transaction Code</th>
               <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Cost</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">served By </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
          
            <tr class="bg-white border-4 border-gray-200" v-for="(item, index) in filteredTransactions" :key="index">
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.transactionID }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.quantity }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.amountRecieved }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.cashChange }}</td> 

              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.totalCost }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.totalDiscount }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.createdOn }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.createdBy }}</td>

              <td class="whitespace-nowrap px-4 py-2 text-gray-700">..</td>
            </tr>
          </tbody>
        </table>
      </div>


    <!-- Modal for Products -->
    <div v-if="isModalProductsOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 px-4">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
        <button @click="closeModal" class="bg-black text-white rounded px-2 py-1 mt-2 ml-2">x</button>
        <p class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center mt-2">{{ TRXID }}: PRODUCTS</p>

        <div class="p-4 sm:p-6">
          <ul class="space-y-4">
            <li
              v-for="(product, pIndex) in allParsedProducts"
              :key="pIndex"
              class="border p-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              <div class="flex justify-between items-center">
                <strong class="text-md font-semibold">{{ product.ProductName }}</strong>
                <span class="text-gray-600 text-sm">Price: ksh.{{ product.Price }}</span>
              </div>
              <div class="flex justify-between items-center text-sm text-gray-500">
                <span>Quantity: {{ product.Quantity }}</span>
                <span>Discount: {{ product.Discount }}%</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

    
    
    <script>
    import { useSaleStore } from '../store/SaleStore';
    import { useTransactionStore } from '../store/TransactionsStore';
    import { ref,  watch, onMounted, computed } from 'vue';
   import { errorState } from '../store/ErrorState'; 
    
    export default {
      setup() {
        const transactionStore = useTransactionStore();
        const saleStore = useSaleStore();
        const isModalProductsOpen = ref(false); 
        const TRXID = ref('');

        onMounted(() => {
          transactionStore.fetchTransactions();
        });

        watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   DisplayMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		    }) 


        const filteredTransactions = computed(() => transactionStore.filterTransactions);
    
    const openproducts = (transactionID) => {
      isModalProductsOpen.value = true;
      TRXID.value= transactionID;
    };
    
    const closeModal = () => {
      isModalProductsOpen.value = false;
    };

     // Function to parse transactionproducts from JSON string to an array
     const allParsedProducts = computed(() => {
      // Flatten all the transactionproducts from all filtered transactions
      return filteredTransactions.value
        .flatMap(transaction => JSON.parse(transaction.transactionproducts));
    });
       
    
       
        
        return {

        openproducts,
          closeModal,
          isModalProductsOpen,
          filteredTransactions,
          saleStore,
          transactionStore,
          TRXID,
          allParsedProducts
        //   fetchData: contactStore.fetchData
        };
      }
    };
    </script>