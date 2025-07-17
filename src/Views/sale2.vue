<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="bg-white shadow-sm px-6 py-4 border-b border-gray-200">
      <h1 class="text-2xl font-semibold text-gray-800">Make Sale</h1>
    </div>

    <!-- Main content area -->
    <div class="flex flex-col lg:flex-row mx-4 mt-4 gap-6">
      <!-- Products Section -->
      <div class="w-full lg:w-2/5 bg-white shadow-sm rounded-lg border border-gray-200 flex flex-col">
        <div class="p-4">
          <div class="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 md:items-center">
            <div class="relative flex-grow">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                v-model="searchQuery" 
                @input="productSearch"  
                type="text"  
                placeholder="Search products..."  
                class="pl-10 w-full rounded-lg border border-gray-300 py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select 
              v-model="category" 
              @input="categorysearch" 
              class="w-full md:w-48 rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              <option value="" disabled selected>Filter by category</option>
              <option v-for="option in categ" :key="option.categoryID" :value="option.categoryID">
                {{ option.categoryName }}
              </option>
            </select>
          </div>
        </div>

        <!-- Product listing -->
      <div class="border-t border-gray-200 flex-grow overflow-hidden flex flex-col">
  <div class="p-4 overflow-y-auto flex-grow">
    <!-- Grid View -->
    <div v-if="display" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="(prod, index) in filteredCategory" 
        :key="index"  
        @click="SelectedItem(prod)" 
        class="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-green-300 hover:bg-green-50 flex flex-col h-full"
      >
        <!-- Product Image -->
        <div class="bg-gray-100 rounded-lg mb-3 w-full aspect-square flex items-center justify-center">
          <span class="text-gray-400">Product Image</span>
          <!-- Replace with: <img :src="prod.imageUrl" class="w-full h-full object-cover rounded-lg"> -->
        </div>

        <!-- Product Details -->
        <div class="flex flex-col flex-grow space-y-2">
          <h3 class="font-medium text-gray-900 line-clamp-2" :title="prod.productName">
            {{ prod.productName }}
          </h3>
          
          <p class="text-lg font-semibold text-green-600 mt-auto">
            {{ prod.sellingPrice }} KSH
          </p>
          
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">
              Stock: {{ prod.stockQuantity || 'N/A' }}
            </span>
            <!-- <button 
              class="text-green-600 hover:text-green-800 focus:outline-none"
              @click.stop="addToCart(prod)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button> -->
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="grid grid-cols-1 gap-3">
      <div 
        v-for="(prod, index) in filteredProducts" 
        :key="index" 
        @click="SelectedItem(prod)" 
        class="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-green-300 hover:bg-green-50 flex items-center"
      >
        <!-- Product Image (smaller in list view) -->
        <!-- <div class="bg-gray-100 rounded-lg mr-4 w-16 h-16 flex-shrink-0 flex items-center justify-center">
          <span class="text-gray-400 text-xs">Image</span>
        </div> -->
        
        <!-- Product Details -->
        <div class="flex-grow min-w-0">
          <div class="flex justify-between items-start">
            <div class="pr-2">
              <p class="font-medium text-gray-800 line-clamp-2" :title="prod.productName">
                {{ prod.productName }}
              </p>
              <p class="text-sm text-gray-500 mt-1">Stock: {{ prod.stockQuantity || 'N/A' }}</p>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-lg font-semibold text-green-600 whitespace-nowrap">
                {{ prod.sellingPrice }} KSH
              </span>
              <!-- <button 
                class="text-green-600 hover:text-green-800 focus:outline-none mt-2"
                @click.stop="addToCart(prod)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>

      <!-- Cart Section -->
      <div class="w-full lg:w-3/5 bg-white shadow-sm rounded-lg border border-gray-200 flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-800">Order Summary</h2>
        </div>
        
        <div class="flex-grow overflow-hidden flex flex-col">
          <div class="overflow-y-auto flex-grow">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                  <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(item, index) in selectedItems" :key="index" class="hover:bg-gray-50 transition-colors duration-150">
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ index + 1 }}</td>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900">
                    <div class="truncate max-w-xs" :title="item.productName">{{ item.productName }}</div>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-right">
                    <input 
                      type="number" 
                      v-model="item.count" 
                      @input="getCount(item)" 
                      min="1"
                      class="w-16 text-right p-1 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-500">{{ item.sellingPrice }}.00</td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{{ item.subtotal }}.00</td>
                  <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      @click="removeItem(index, item.productID)"
                      class="text-red-500 hover:text-red-700 focus:outline-none"
                      title="Remove item"
                    >
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div v-if="selectedItems.length === 0" class="p-8 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Empty cart</h3>
              <p class="mt-1 text-sm text-gray-500">Start by adding products from the left panel</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer with totals and payment buttons -->
    <div class="bg-white px-6 py-4 mx-4 mt-4 rounded-lg border border-gray-200 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500">ITEMS</span>
            <span class="text-lg font-semibold text-gray-800">{{ NoItems }}</span>
          </div>
          
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500">DISCOUNT</span>
            <span class="text-lg font-semibold text-gray-800">{{ Discount }}</span>
          </div>
          
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500">SHIPPING</span>
            <span class="text-lg font-semibold text-gray-800">{{ Shipping }}</span>
          </div>
          
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500">VAT</span>
            <span class="text-lg font-semibold text-gray-800">{{ Vat }}</span>
          </div>
          
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-500">TOTAL</span>
            <span class="text-xl font-bold text-green-600">{{ TtotalCost }} KSH</span>
          </div>
        </div>
        
        <div class="flex space-x-3">
          <button 
            @click="OpenCash" 
            :disabled="selectedItems.length === 0"
            :class="{'bg-blue-600 hover:bg-blue-700': selectedItems.length > 0, 'bg-blue-400 cursor-not-allowed': selectedItems.length === 0}"
            class="text-white font-medium rounded-lg px-6 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            CASH
          </button>
          
          <button 
            @click="OpenMpesa" 
            :disabled="selectedItems.length === 0"
            :class="{'bg-green-600 hover:bg-green-700': selectedItems.length > 0, 'bg-green-400 cursor-not-allowed': selectedItems.length === 0}"
            class="text-white font-medium rounded-lg px-6 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            M-PESA
          </button>
          
          <button 
            @click="OpencCredit"
            :disabled="selectedItems.length === 0"
            :class="{'bg-gray-700 hover:bg-gray-800': selectedItems.length > 0, 'bg-gray-400 cursor-not-allowed': selectedItems.length === 0}"
            class="text-white font-medium rounded-lg px-6 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            CREDIT
          </button>
        </div>
      </div>
    </div>

    <!-- Payment Modals -->
    <!-- Mpesa payment modal -->
    <div v-if="isMpesaOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        <div class="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900">Pay via M-PESA</h3>
          <button @click="CloseMpesa" class="text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="PayViaMpesa" class="p-5">
          <div class="mb-5">
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">+254</span>
              </div>
              <input
                id="phone"
                type="tel"
                placeholder="700123456"
                v-model="phoneNumber"
                class="focus:ring-green-500 focus:border-green-500 block w-full pl-16 py-3 sm:text-sm border-gray-300 rounded-md"
                required
                pattern="[0-9]{9}"
                maxlength="9"
              />
            </div>
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-gray-200">
            <button type="button" @click="CloseMpesa" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Cash payment modal -->
    <div v-if="isCashOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        <div class="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900">Pay via Cash</h3>
          <button @click="CloseCash" class="text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="PayViaCash" class="p-5">
          <div class="mb-5">
            <label for="cashAmount" class="block text-sm font-medium text-gray-700 mb-1">Amount Tendered</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">KSh</span>
              </div>
              <input
                id="cashAmount"
                type="number"
                v-model.number="cashAmount"
                :min="TtotalCost"
                class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 py-3 sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div v-if="cashAmount > 0" class="mt-2 text-sm">
              <p class="text-gray-600">Total: <span class="font-medium">{{ TtotalCost }} KSh</span></p>
              <p class="text-gray-600">Change: <span class="font-medium">{{ cashAmount - TtotalCost }} KSh</span></p>
            </div>
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-gray-200">
            <button type="button" @click="CloseCash" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Credit payment modal -->
    <div v-if="isCreditOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        <div class="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900">Pay via Credit</h3>
          <button @click="CloseCredit" class="text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="SubmitCredit" class="p-5">
          <div class="mb-5">
            <label for="creditAmount" class="block text-sm font-medium text-gray-700 mb-1">Credit Amount</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">KSh</span>
              </div>
              <input
                id="creditAmount"
                type="number"
                v-model.number="creditAmount"
                :min="TtotalCost"
                class="focus:ring-gray-500 focus:border-gray-500 block w-full pl-12 py-3 sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div v-if="creditAmount > 0" class="mt-2 text-sm">
              <p class="text-gray-600">Total: <span class="font-medium">{{ TtotalCost }} KSh</span></p>
              <p class="text-gray-600">Balance: <span class="font-medium">{{ creditAmount - TtotalCost }} KSh</span></p>
            </div>
          </div>
          <div class="mb-4">
            <label for="customerName" class="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              id="customerName"
              type="text"
              v-model="customerName"
              class="focus:ring-gray-500 focus:border-gray-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-gray-200">
            <button type="button" @click="CloseCredit" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Confirm Credit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

   

   <script>
    import { useCategoryStore } from '../store/categoryStore';
    import { UseInventoryStore } from '../store/InventoryStore';
    // import { ReceiptComponent } from '../Views/Receipt.vue';
    import { useSaleStore } from '../store/SaleStore';
    import { errorState } from '../store/ErrorState';
        import {useCatalogueStore} from '../store/catalogueStore'

    import Swal from 'sweetalert2';
    import { ref, onMounted, watch,computed } from 'vue';
    
    export default {
      // components: {
      //   ReceiptComponent,
      // },
      setup() {
        const CategoryStore = useCategoryStore();
        const inventorystore = UseInventoryStore();
        const saleStore = useSaleStore();
        const CatalogStore  = useCatalogueStore();

    
        const paymentrefference = ref('');
        const display = ref(false);
        const isMpesaOpen = ref(false);
        const isCashOpen = ref(false);
        const isCreditOpen = ref(false);
        const category = ref('');
        const insufficient = ref(false);
    
        const selectedItems = ref([]);
        const totalcost = ref(0);
        const TtotalCost = ref(0);
        const ITcost = ref(0);
        const NoItems = ref(0);
        const Discount = ref(0);
        const Shipping = ref(0);
        const Vat = ref(0);
        const mpesanNo = ref(254);
        const cashchange = ref(0);
        const receivedcash = ref(0);
        const Pname = ref('');
    
        const showReceipt = ref(false);
        const transactionData = ref(null);
        const paymentMethod = ref(null);
    
        let previousTotal = 0;
        let ExistCount = 0;
        let subtotal = 0;
        let TCost = 0;
    
        const categ = computed(() => CategoryStore.getData);
        const products = computed(() => inventorystore.getData);
        //const filteredProducts = computed(() => CatalogStore.getData); 
        const filterProductCategory = computed(() => inventorystore.filterProductCategory);
        
       const filteredProducts = computed(() => inventorystore.filterProducts);
    
        onMounted(() => { 
          let token = localStorage.getItem('token');
           CatalogStore.fetchCatalogue(token);

          inventorystore.getallproducts(token);
          CategoryStore.fetchCategories(token);
        }); 

        watch(() => errorState.message, (newVal) => {
          if (newVal) {
            DisplayMessage(`Error: ${errorState.code} - ${newVal}`)
          }
		    }) 

    
        const productSearch = (e) => {
          display.value = false;
          inventorystore.setSearchProduct(e.target.value);
        };
    
        const categorysearch = (e) => {
          display.value = true;
          inventorystore.setSearchCategory(e.target.value);
        };
    
        const getCount = (item) => {
          const itemprice = ref(item.sellingPrice);
          if (item.count > 0) {
            previousTotal = parseInt(TCost) - parseInt(item.subtotal);
            subtotal = parseInt(item.count) * parseInt(itemprice.value);
            item.subtotal = subtotal;
            TCost = subtotal + previousTotal;
            NoItems.value = ExistCount + parseInt(item.count) - 1;
            TtotalCost.value = TCost;
          }
        };
    
        const SelectedItem = (items) => {
          const itemsp = items.sellingPrice;
          items.subtotal = itemsp;
          const existingProduct = selectedItems.value.find((selItem) => selItem.productID === items.productID);
          let ECount;
    
          ExistCount += 1;
          if (existingProduct == true) {
            ECount = parseInt(existingProduct.count);
            ECount += 1;
            existingProduct.count = ECount;
            existingProduct.subtotal = existingProduct.count * itemsp;
          } else {
            selectedItems.value.push({ ...items, count: 1 });
          }
          TCost += parseFloat(items.subtotal);
          NoItems.value = ExistCount;
          TtotalCost.value = TCost;
          calculatecost();
        };
    
        const removeItem = (index, productID) => {
          const item = selectedItems.value.find((selItem) => selItem.productID === productID);
          TCost = parseInt(TCost) - parseInt(item.subtotal);
          TtotalCost.value = TCost;
          NoItems.value = parseInt(NoItems.value) - parseInt(selectedItems.value[index].count);
    
          selectedItems.value.splice(index, 1);
          ExistCount = NoItems.value;
        };
    
        const calculatecost = () => {
          const less = parseFloat(Vat.value) + parseFloat(Shipping.value);
          ITcost.value = TCost;
          totalcost.value = parseFloat(ITcost.value) + less - parseFloat(Discount.value);
        };
    
        //SubmitCash
        const submitpayment = async () => {
          const productsArray = [];
          let totalSellingPrice = 0;
    
          const now = new Date();
          const day = now.getDate();
          const month = now.getMonth() + 1;
          const hour = now.getHours();
          const minute = now.getMinutes();
          const second = now.getSeconds();
    
          selectedItems.value.forEach((selectedItem) => {
            totalSellingPrice += selectedItem.sellingPrice;
    
            productsArray.push({
              productID: selectedItem.productId,
              productName: selectedItem.productName,
              SKU:selectedItem.sku,
              Availability:selectedItem.availability,
              quantity: selectedItem.count,
              price: selectedItem.sellingPrice,
              discount: selectedItem.discount || 0,
            });
          });
    
        //   let PaymentID = PAY_${month}${hour}${minute}${day}${second};
        //   let TrxId = TRX_${month}${second}${minute}${hour};
        //let PaymentID =  Pname.value.substring(0, 3) + "_" + month.value + hour.value + minute.value + day.value + second.value + "Y"; 
        
        let PaymentID = "Ult" + "_" + month + hour + minute + day + second + "Y"; 
        
        //let TrxId = "Trx"+"_"+ month.value + second.value + minute.value + hour.value ;
        let TrxId = "Trx"+"_"+ month + second + minute + hour ;
    
          const postData = {
            transaction: [
              {
                // transactionID: TrxId,
                //userID: 1,
                totalValueAddedTax: 0,
               // productID: selectedItems.value[0]?.productID,
                totalCost: totalSellingPrice,
                totalDiscount: Discount.value,
                amountRecieved: receivedcash.value,
                cashChange: cashchange.value,
                quantity: NoItems.value,
                remarks: 'Sold in good condition',
                // createdBy: 'chee',
                // updatedBy: '',
                transactionproducts: productsArray,
                paymentDetails: [
                  {
                    // paymentID: PaymentID,
                    paymentMethod: paymentMethod.value, //paymentrefference.value,
                    paymentStatus: 1,
                    paymentReference: paymentrefference.value,
                    amount: totalSellingPrice,
                    transactionID: TrxId,
                    // paymentDate: new Date().toISOString(),
                  },
                ],
              },
            ],
          };
    
          try { 
            saleStore.Addtransaction(postData);
            // saleStore.AddTransaction(postData);
    
            if (saleStore.success) {
              transactionData.value = {
                transactionID: TrxId,
                transactionDate: new Date(),
                items: productsArray,
                subtotal: totalSellingPrice - Discount.value,
                tax: 0,
                totalCost: totalSellingPrice,
                paymentMethod: paymentrefference.value,
                amountPaid: receivedcash.value,
                cashChange: cashchange.value,
                loyalty: {
                  customerName: 'John Doe',
                  loyaltyCode: 'LOY12345',
                  previousPoints: 100,
                  pointsEarned: 10,
                  totalPoints: 110,
                },
                cashier: 'chee',
                supervisor: 'Supervisor Name',
                paymentReference: '123456789',
              };
    
              showReceipt.value = true;
              DisplayMessage('success', saleStore.successmsg || 'Transaction completed successfully');
            } else {
              DisplayMessage('error', saleStore.error || 'Transaction failed with an unknown error.');
            }
          } catch (error) {
            DisplayMessage('error', 'Failed to process transaction: ' + (error.message || 'Unknown error'));
          }
        };
    
        const printReceipt = (element) => {
          const printWindow = window.open('', '_blank');
          printWindow.document.write(element.outerHTML);
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
          printWindow.close();
          showReceipt.value = false;
        };
    
        const filterPhoneNo = (e) => {
          const value = e.target.value;
          if (value.length >= 10) {
            e.preventDefault();
            return;
          }
          mpesanNo.value = value.replace(/\D/g, '');
        };
    
        const cashchanged = computed(() => parseInt(receivedcash.value) - parseInt(totalcost.value));


        const filterCashChange = () => {
          if (parseInt(receivedcash.value) >= parseInt(totalcost.value)) {
            cashchange.value = cashchanged.value;
            insufficient.value = false;
          } else {
            cashchange.value = 0;
            insufficient.value = true;
          }
        }; 

        const PayViaMpesa = () => {
           isMpesaOpen.value = false;
           paymentMethod.value = "MPESA";
           submitpayment();
         }

         const SubmitCash = () =>{
            PayViaCash();
         }
    
          const PayViaCash = () =>{
              isCashOpen.value = false;
              paymentMethod.value = "CASH";
              paymentrefference.value = "paid in cash";
              submitpayment();
          }
    
        const OpenMpesa = () => {
          if (totalcost.value > 0) {
            isMpesaOpen.value = true;
          }
        };
    
        const OpenCash = () => {
          if (totalcost.value > 0) {
            isCashOpen.value = true;
          }
        };
    
        const OpencCredit = () => {
          isCreditOpen.value = true;
        };
    
        const CloseCash = () => {
          isCashOpen.value = false;
        };
    
        const CloseMpesa = () => {
          isMpesaOpen.value = false;
        };
    
        const CloseCredit = () => {
          isCreditOpen.value = false;
        };
    
     

        const DisplayMessage = (icon, message) => {
      Swal.fire({
        position: 'center',
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 1500,
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })
    }
    
        return {
          products,
          NoItems,
          ITcost,
          totalcost,
          display,
          isMpesaOpen,
          isCashOpen,
          isCreditOpen,
          mpesanNo,
          selectedItems,
          Discount,
          Shipping,
          Vat,
          TtotalCost,
          submitpayment,
          showReceipt,
          transactionData,
          productSearch,
          categorysearch,
          getCount,
          SelectedItem,
          removeItem,
          calculatecost,
          filterPhoneNo,
          receivedcash,
          cashchanged,
          cashchange,
          filterCashChange,
          OpenMpesa,
          OpenCash,
          OpencCredit,
          CloseCash,
          CloseMpesa,
          CloseCredit,
          DisplayMessage,
          printReceipt,
          filteredProducts,
          filterProductCategory,
          PayViaMpesa,
          PayViaCash,
          SubmitCash,
          paymentMethod,
          paymentrefference,
          categ,
          category,
          CatalogStore
        };
      },
    };
    </script> 

  <style scoped>
   @import 'node_modules/@fortawesome/fontawesome-free/css/all.css';
   .card {
  @apply w-16 h-16 rounded-s-md relative; 
  /* / Using Tailwind for width, height, and rounded corners / */
   }
   .cards-container {
  @apply flex flex-wrap gap-4; 
  /* / Using Tailwind for layout / */
}
 
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Truncate text with ellipsis */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>