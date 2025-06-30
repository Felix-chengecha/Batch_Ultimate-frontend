
      
    <template>
  <main class="p-2">
    <!-- Header and Search Bar -->
    <div class="overflow-x-auto rounded-t-lg py-1 px-1">
      <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-700 text-center sm:text-left">
          Transactions
        </h2>
        <input
          type="text"
          id="Search"
          @input="productSearch"
          placeholder="Search for...anything"
          class="w-full sm:w-1/3 rounded-md border-gray-300 py-2 px-4 shadow-sm sm:text-sm"
        />
      </div>
    </div>

    <!-- Responsive Table Container -->
    <div class="overflow-x-auto mt-4">
      <table class="min-w-full divide-y divide-gray-200 text-sm bg-gray-50 rounded">
        <thead class="text-gray-900 border border-gray-300 bg-white">
          <tr>
            <th class="px-4 py-2 whitespace-nowrap font-medium">ID</th>
            <th class="px-4 py-2 whitespace-nowrap font-medium">BatchID</th>
            <th class="px-4 py-2 whitespace-nowrap font-medium">Item</th>
            <th class="px-4 py-2 whitespace-nowrap font-medium">Code</th>
            <th class="px-4 py-2 whitespace-nowrap font-medium">Description</th>
            <th class="px-4 py-2 whitespace-nowrap font-medium">Cost</th>
            <th class="px-4 py-2 whitespace-nowrap font-medium">Selling Price</th>
            <th class="px-4 py-2 whitespace-nowrap font-medium">Status</th>
            <th class="px-4 py-2 whitespace-nowrap font-medium">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(item, index) in filteredTransactions" :key="index">
            <td class="px-4 py-2 whitespace-nowrap">{{ item.transactionID }}</td>
            <td class="px-4 py-2 whitespace-nowrap">{{ item.quantity }}</td>
            <td class="px-4 py-2 whitespace-nowrap">{{ item.amountRecieved }}</td>
            <td class="px-4 py-2 whitespace-nowrap">{{ item.cashChange }}</td>
            <td class="px-4 py-2 whitespace-nowrap">{{ item.totalCost }}</td>
            <td class="px-4 py-2 whitespace-nowrap">{{ item.totalDiscount }}</td>
            <td class="px-4 py-2 whitespace-nowrap">{{ item.createdOn }}</td>
            <td class="px-4 py-2 whitespace-nowrap">{{ item.createdBy }}</td>
            <td class="px-4 py-2 whitespace-nowrap">
              <span @click="openproducts(item.transactionID)" class="cursor-pointer">...</span>
            </td>
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
  </main>
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