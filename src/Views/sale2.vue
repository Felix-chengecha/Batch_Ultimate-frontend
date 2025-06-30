<template>
  <div class="bg-gray-100 min-h-screen">
    <span class="text-2xl text-gray-600 px-3 py-2 block">Make sale</span>

    <!-- Main content area -->
    <div class="flex flex-col lg:flex-row mx-3 mt-2 gap-4">


      <!-- Section two: Available products -->
      <div class="w-full lg:w-3/7 bg-white shadow-md p-3 border border-gray-200 rounded-md flex flex-col">
        <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-3  md:space-x-3 mb-4">
          <span class="text-md text-gray-600 mb-2 sm:mb-0">Search</span>
          <select  v-model="category" id="category" @input="categorysearch" class="w-full sm:w-1/2 rounded-lg border border-gray-400 p-2 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 text-black bg-white">
            <option disabled value="">Select a category</option>
            <option v-for="option in categ":key="option.categoryID":value="option.categoryID">
              {{ option.categoryName }}
            </option>
          </select>
             <input v-model="searchQuery" id="Search" @input="productSearch"  type="text"  placeholder="Search product"  required class="mt-4 w-full sm:w-1/3 rounded-lg border border-gray-400 p-2  text-sm shadow-sm focus:outline-none focus:border-[#98c01d] text-black bg-white"/>
        </div> 

        <!-- Product listing -->
        <div  v-if="display" class="border border-gray-300 rounded-md py-3 mt-2 overflow-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <div v-for="(prod, index) in filteredCategory" :key="index"  @click="SelectedItem(prod)" class="bg-white shadow-md rounded-lg border border-gray-200 px-2 py-1 cursor-pointer hover:bg-gray-100">
              <small class="text-sm">{{ prod.productName }}</small><br />
              <small>. {{ prod.sellingPrice }} KSH</small>
            </div>
          </div>
        </div>

        <div  v-else class="border border-gray-300 rounded-md py-3 mt-2 overflow-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <div v-for="(prod, index) in filteredProducts" :key="index" @click="SelectedItem(prod)" class="bg-white shadow-md rounded-lg border border-gray-200 px-2 py-1 cursor-pointer hover:bg-gray-100">
              <small class="text-sm">{{ prod.productName }}</small><br />
              <small>{{ prod.sellingPrice }} KSH</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Section one: Items bought -->
      <div class="w-full lg:w-4/7 bg-white shadow-lg text-lg rounded-md border border-gray-200 flex flex-col">
        <div class="overflow-x-auto rounded-lg p-1 flex-grow flex flex-col">
          <div class="flex-grow overflow-auto">
            <table class="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
              <thead class="bg-gray-50 text-gray-800">
                <tr>
                  <th class="py-3 px-4 text-left text-sm font-semibold uppercase">#</th>
                  <th class="py-3 px-4 text-left text-sm font-semibold uppercase">Product</th>
                  <th class="py-3 px-4 text-right text-sm font-semibold uppercase">Quantity</th>
                  <th class="py-3 px-4 text-right text-sm font-semibold uppercase">Price</th>
                  <th class="py-3 px-4 text-right text-sm font-semibold uppercase">Subtotal</th>
                  <th class="py-3 px-4 text-right text-sm font-semibold uppercase">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(item, index) in selectedItems" :key="index" class="hover:bg-gray-100 transition duration-200">
                  <td class="py-3 px-4 text-sm">{{ index + 1 }}</td>
                  <td class="py-3 px-4 text-sm">{{ item.productName }}</td>
                  <td class="py-3 px-4 text-sm text-right">
                    <input type="text" v-model="item.count" @input="getCount(item)" class="w-12 p-1 border rounded mx-auto lg:mx-0"/>
                  </td>
                  <td class="py-3 px-4 text-sm text-right">{{ item.sellingPrice }}.00</td>
                  <td class="py-3 px-4 text-sm text-right">{{ item.subtotal }}.00</td>
                  <td class="py-3 px-4 text-sm text-right">
                    <button @click="removeItem(index, item.productID)"class="text-red-500 hover:text-red-700 focus:outline-none">
                      X
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      

    </div>

    <!-- Section three: totals and payment buttons -->
    <div class="footer bg-white px-3 py-4 mx-3 mt-4 flex flex-col md:flex-row items-center justify-between rounded-md border border-gray-300 space-y-3 md:space-y-0">
      <!-- <div class="flex flex-wrap items-center space-x-2 text-gray-600">
        <span class="text-md font-semibold">ITEMS:</span>
        <span class="text-md border px-3 rounded-md border-gray-900">{{ NoItems }}</span>

        <span class="text-md font-semibold ml-2">DISCOUNT:</span>
        <span class="text-md border px-6 rounded-md border-gray-900">{{ Discount }}</span>

        <span class="text-md font-semibold ml-2">SHIPPING:</span>
        <span class="text-sm border px-6 rounded-md border-gray-900">{{ Shipping }}</span>

        <span class="text-md font-semibold ml-2">VAT:</span>
        <span class="text-sm border px-6 rounded-md border-gray-900">{{ Vat }}</span>

        <span class="text-md font-semibold ml-2">TOTAL PAYMENT:</span>
        <span class="text-md border px-8 rounded-md border-gray-900">{{ TtotalCost }}</span>
      </div> -->

      <div class="flex flex-wrap gap-x-4 gap-y-2 text-gray-600">
  <div class="flex items-center space-x-2">
    <span class="text-md font-semibold">ITEMS:</span>
    <span class="text-md border px-8 w-50 rounded-md border-gray-900">{{ NoItems }}</span>
  </div>

  <div class="flex items-center space-x-2">
    <span class="text-md font-semibold">DISCOUNT:</span>
    <span class="text-md border px-8 rounded-md border-gray-900">{{ Discount }}</span>
  </div>

  <div class="flex items-center space-x-2">
    <span class="text-md font-semibold">SHIPPING:</span>
    <span class="text-sm border px-6 rounded-md border-gray-900">{{ Shipping }}</span>
  </div>

  <div class="flex items-center space-x-2">
    <span class="text-md font-semibold">VAT:</span>
    <span class="text-sm border px-6 rounded-md border-gray-900">{{ Vat }}</span>
  </div>

  <div class="flex items-center space-x-2">
    <span class="text-md font-semibold">TOTAL PAYMENT:</span>
    <span class="text-md border px-12 rounded-md border-gray-900">{{ TtotalCost }}</span>
  </div>
</div>


      <div class="flex space-x-3">
        <button @click="OpenCash" class="bg-blue-600 text-gray-800 font-bold border border-gray-200 rounded-lg py-2 px-4 hover:bg-blue-400 focus:outline-none focus:bg-white focus:border-gray-500">
          CASH
        </button>
        <button @click="OpenMpesa" class="bg-green-700 text-gray-800 font-bold border border-gray-200 rounded-lg py-2 px-4 hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500">
          M-PESA
        </button>
        <button @click="OpencCredit"
          class="bg-gray-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-2 px-4 hover:bg-gray-800 focus:outline-none focus:bg-white focus:border-gray-500" >
          CREDIT
        </button>
      </div>
    </div>

    <!-- Section four: Payment modals -->

    <!-- Mpesa payment modal -->
    <div
      v-if="isMpesaOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4"
    >
      <div class="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full max-h-full overflow-auto">
        <div class="relative flex items-center justify-center mb-4">
          <p
            class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center w-full"
          >
            Pay via mpesa
          </p>
          <button
            @click="CloseMpesa"
            class="absolute right-0 top-0 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            X
          </button>
        </div>
        <form @submit.prevent="SubmitMpesa">
          <label class="block mb-1 text-gray-600 font-semibold" for="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Enter Phone number"
            v-model="phoneNumber"
            class="w-full px-3 py-2 mb-3 rounded border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#98c01d]"
            required
          />
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            Pay
          </button>
        </form>
      </div>
    </div>

    <!-- Cash payment modal -->
    <div
      v-if="isCashOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div class="relative flex items-center justify-center mb-4">
          <p
            class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center w-full"
          >
            Pay via cash
          </p>
          <button
            @click="CloseCash"
            class="absolute right-0 top-0 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            X
          </button>
        </div>
        <form @submit.prevent="SubmitCash">
          <label class="block mb-1 text-gray-600 font-semibold" for="cashAmount">
            Amount tendered
          </label>
          <input
            id="cashAmount"
            type="number"
            v-model.number="cashAmount"
            class="w-full px-3 py-2 mb-3 rounded border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#98c01d]"
            required
            min="0"
          />
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

    <!-- Credit payment modal -->
    <div
      v-if="isCreditOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div class="relative flex items-center justify-center mb-4">
          <p
            class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center w-full"
          >
            Pay via credit
          </p>
          <button
            @click="CloseCredit"
            class="absolute right-0 top-0 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            X
          </button>
        </div>
        <form @submit.prevent="SubmitCredit">
          <label class="block mb-1 text-gray-600 font-semibold" for="creditAmount">
            Credit Amount
          </label>
          <input
            id="creditAmount"
            type="number"
            v-model.number="creditAmount"
            class="w-full px-3 py-2 mb-3 rounded border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#98c01d]"
            required
            min="0"
          />
          <button
            type="submit"
            class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

   
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
   </style>
   <script>
    import { useCategoryStore } from '../store/categoryStore';
    import { UseInventoryStore } from '../store/InventoryStore';
    // import { ReceiptComponent } from '../Views/Receipt.vue';
    import { useSaleStore } from '../store/SaleStore';
    import { errorState } from '../store/ErrorState';

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
        const filteredCategory = computed(() => inventorystore.filterProductCategory);
        const filteredProducts = computed(() => inventorystore.filterProducts);
    
        onMounted(() => {
          inventorystore.getallproducts();
          CategoryStore.fetchCategories();
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
          if (existingProduct) {
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
              productID: selectedItem.productID,
              productName: selectedItem.productName,
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
                transactionID: TrxId,
                userID: 1,
                totalValueAddedTax: 0,
                productID: selectedItems.value[0]?.productID,
                totalCost: totalSellingPrice,
                totalDiscount: Discount.value,
                amountRecieved: receivedcash.value,
                cashChange: cashchange.value,
                quantity: NoItems.value,
                remarks: 'Sold in good condition',
                createdBy: 'chee',
                updatedBy: '',
                transactionproducts: productsArray,
                paymentDetails: [
                  {
                    paymentID: PaymentID,
                    paymentMethod: paymentMethod.value, //paymentrefference.value,
                    paymentStatus: 1,
                    paymentReference: paymentrefference.value,
                    amount: totalSellingPrice,
                    transactionID: TrxId,
                    paymentDate: new Date().toISOString(),
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
            title: icon === 'success' ? 'Success!' : 'An ERROR occurred!',
            text: message,
            showConfirmButton: true,
            timer: 4000,
          });
        };
    
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
          filteredCategory,
          PayViaMpesa,
          PayViaCash,
          paymentMethod,
          paymentrefference
        };
      },
    };
    </script> 