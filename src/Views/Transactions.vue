<template>
       <main>
              <div class="overflow-x-auto rounded-t-lg py-1 px-1 ">
              <div class="relative flex flex-col sm:flex-row items-start w-full">
              <div class="flex flex-wrap items-center w-3/4 sm:mb-0">
              <h2 class="text-3xl block font-bold sm:text-2xl text-center justify-center text-gray-700 px-2 ml-10">Transactions</h2>
              </div>
              <label for="Search" class="sr-only">Search</label>
              <input type="text"  id="Search" @input="productSearch" placeholder="Search for...anything" class="w-1/3 sm:w-1/3 rounded-md border-gray-200 py-2 pe-10 shadow-sm  lg:absolute right-1  sm:text-sm"/> 
              </div> 
              </div>

             <table class="min-w-full divide-y-2 divide-gray-200  mt-4 text-sm rounded px-2 bg-gray-50">
              <thead class="ltr:text-left rtl:text-right border border-gray-300">

  
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">BatchID</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Item</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Code</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Cost</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Selling Price</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
    
    
    
            </tr>
          </thead>
    
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, index) in filteredTransactions" :key="index">
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item.transactionID}}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.quantity}}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.amountRecieved }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.cashChange }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.totalCost }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.totalDiscount }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.createdOn }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.createdBy }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                <span @click="openproducts(item.transactionID)">...</span></td>
           
            </tr>
          </tbody>
        </table>
    
    
           <!-- Modal backdrop  to add a new template-->
    
    
        <div v-if="isModalProductsOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full">
          <button @click="closeModal" class="bg-black text-white px-1 mt-3 rounded">x</button>
          <p class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center">{{ TRXID }}: PRODUCTS</p>
    
    
      <div class="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
     
    <!-- Display all products from filtered transactions in an unordered list -->

  
          <div class="max-w-4xl mx-auto px-4">
    <!-- Container for the list with border and padding -->
    <ul class="space-y-4">
      <li v-for="(product, pIndex) in allParsedProducts" :key="pIndex" class="border p-4 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
        <!-- Product info with proper spacing -->
        <div class="flex justify-between items-center">
          <strong class="text-md font-semibold">{{ product.ProductName }}</strong>
          <span class="text-gray-600">Price: ksh.{{ product.Price }}</span>
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
    
    
       </main>
       
  </template>  
       
      
    
    
    
    <script>
    import { useSaleStore } from '../store/SaleStore';
    import { useTransactionStore } from '../store/TransactionsStore';
    import { ref, onMounted, computed } from 'vue';

    
    export default {
      setup() {
        const transactionStore = useTransactionStore();
        const saleStore = useSaleStore();
        const isModalProductsOpen = ref(false); 
        const TRXID = ref('');

        onMounted(() => {
          transactionStore.fetchTransactions();
        });

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