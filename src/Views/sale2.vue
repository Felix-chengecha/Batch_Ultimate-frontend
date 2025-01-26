<template>

   <div class="bg-gray-100">
    <span class="text-2xl text-gray-600 px-3 py-2"> Make sale</span>
     <!-- Section one consist of all items bought -->
    <div class="flex flex-col mx-3 mt-2 lg:flex-row h-200">      


     <!-- Section one consist of all items bought -->
        <div class="w-full lg:w-4/7 m-1 bg-white shadow-lg text-lg rounded-md border border-gray-200">
            <div class="overflow-x-auto rounded-lg p-1 h-full flex flex-col">    
                <div class="flex-grow">
                   
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
                                <td class="py-3 px-4 text-sm text-right"> <input type="text" v-model="item.count" @input="getCount(item)" class="w-12 p-1 border rounded " /> </td>
                                <td class="py-3 px-4 text-sm text-right">{{ item.sellingPrice }}.00</td>
                                <td class="py-3 px-4 text-sm text-right">{{ item.subtotal }}.00</td>
                                <td class="py-3 px-4 text-sm text-right">
                                    <button @click="removeItem(index, item.productID)" class="text-red-500 hover:text-red-700 focus:outline-none">
                                        X
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
             </div>
         </div>

<!-- AVAILABLE PRODUCTS -->
        <div class="w-full lg:w-3/7 ">
            <div class="w-full bg-white shadow-md p-3 border border-gray-200 rounded-md" >
                <div class="mt-auto flex items-center justify-between">
                    <span class="text-MD text-gray-600 px-0"> Search </span>
                      <select v-model="category" id="category" @input="categorysearch" class="w-1/2 rounded-lg border border-gray-400 p-2 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 text-black bg-white">
                        <option disabled value="">Select a category</option>
                        <option v-for="option in categ" :key="option.categoryID" :value="option.categoryID">
                            {{ option.categoryName }}
                        </option>
                       </select>
                      <input  v-model="searchQuery" id="Search" @input="productSearch" class="block w-1/4 space-x-2 bg-white text-gray-900 font-medium border border-gray-400 rounded-lg p-2 leading-tight focus:outline-none focus:border-[#98c01d] text-sm" type="text"  placeholder="Search product" required />
                    </div>


                <!-- unjanja promax hide one when sorting the other -->   
                <!-- sorted categories -->
                   <div v-if="display" class="flex flex-wrap - mx-1 mb-6 border border-gray-300 rounded-md  py-3 mt-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                        <div  v-for="(prod, index) in filteredCategory"  :key="index"  @click="SelectedItem(prod)" 
                        class="bg-white shadow-md rounded-lg border border-gray-200 px-2 py-1">
                            <small class="text-sm ">{{ prod.productName }}</small>     <br>
                            <!-- <small>. delamere</small> <br> -->
                            <!-- <small>. 0.5L</small> <br> -->
                            <small>. {{ prod.sellingPrice }} KSH</small>
                         </div>
                      </div>
                    </div>
    
                    <div v-else class="flex flex-wrap - mx-1 mb-6 border border-gray-300 rounded-md  py-3 mt-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                        <div v-for="(prod, index) in filteredProducts" :key="index" @click="SelectedItem(prod)"class="bg-white shadow-md rounded-lg border border-gray-200 px-2 py-1">
                            <small class="text-sm">{{ prod.productName }}</small> <br>
                            <!-- <small>. delamere</small> <br> -->
                            <!-- <small>0.5L</small> <br> -->
                            <small>{{ prod.sellingPrice }} KSH</small>
                            </div>
                        </div>
                    </div>
                    
               </div>
             </div>
            </div>

        <!-- section 3 totals -->
            <div class="footer bg-white h-16 px-2 mx-3 py-4 flex items-center   rounded-md justify-between border border-gray-300 ">
                    <div class="flex  space-x-2 text-gray-600">       
                    <div class="mt-auto flex items-center justify-between">
                            <div class="flex space-x-4 text-gray-800 ">
                                <span class="text-md font-semibold">ITEMS:</span>       <span class="text-md border px-3 rounded-md border-gray-900">{{ NoItems }}</span>
                                <span class="text-md font-semibold">DISCOUNT:</span>    <span class="text-md border px-6 rounded-md border-gray-900">{{ Discount }}</span>
                                <span class="text-md font-semibold">SHIPPING:</span>    <span class="text-sm border px-6 rounded-md border-gray-900"> {{ Shipping }}</span>
                                <span class="text-md font-semibold">VAT:</span>         <span class="text-sm border  px-6 rounded-md border-gray-900">{{ Vat }} </span>
                                <span class="text-md font-semibold">TOTAL PAYMENT:</span>  <span class="text-md border  px-8 rounded-md border-gray-900"> {{ TtotalCost }}</span>
                            </div>
                            <div class="ml-auto flex space-x-3 absolute right-4">
                                <button  @click="OpenCash" class="appearance-none bg-blue-600 text-gray-800 font-bold border border-gray-200 rounded-lg py-2 px-2 leading-tight hover:bg-blue-400 focus:outline-none focus:bg-white focus:border-gray-500">
                                    CASH
                                </button>
                                <button  @click="OpenMpesa"  class="appearance-none bg-green-700 text-gray-800 font-bold border border-gray-200 rounded-lg py-2 px-2 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500">
                                    M-PESA
                                </button>
                                <button  @click="OpencCredit" class="appearance-none bg-gray-700 text-gray-100  font-bold border border-gray-200 rounded-lg py-2 px-2 leading-tight hover:bg-gray-700 focus:outline-none focus:bg-white focus:border-gray-500">
                                    CREDIT
                                </button>
                            </div>
                        </div>
                        </div>
                </div>

<!--Section 4 payment options  -->
            <!--mpesa cpayment option input-->
         <div v-if="isMpesaOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full">

            <div class="relative flex items-center justify-center"> 
                <p class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center">Pay via mpesa</p>
                <button @click="CloseMpesa" class="absolute right-0 bg-black text-white px-1 rounded">x</button>
            </div>
      

        <!-- <div class=" mt-4 "> -->
            <div class="flex space-x-6  p-4">
               <div  class="p-2 w-1/2 mt-1 border border-gray-400 rounded-md">  
                <span class="text-md">No Of Items: </span>
                <span class="text-2xl"> {{ NoItems }}</span>
               </div>

                <div  class="p-2 mt-1 w-1/2 border border-gray-400 rounded-md"> 
                <span class="text-md">Total VAT: </span>
                <span class="text-2xl">{{ Vat }}.KSH</span>
                </div>

            </div>
            
            <div class="flex space-x-6 w-full  p-4">
            <div  class="p-2 mt-1 w-1/2 border border-gray-400 rounded-md"> 
            <span class="text-md">Total Discount: </span>
            <span class="text-2xl">{{ Discount }}.KSH</span>
            </div>

            <div  class="p-2 mt-1 w-1/2 border border-gray-400 rounded-md">  
               <span class="text-md"> Cost: </span>
               <span class="text-2xl"> {{ ITcost }}.KSH</span>
            </div>
        </div> 

        <div class="flex space-x-6 w-full  p-4">
            <div  class="p-2 mt-1 w-full border border-gray-400 rounded-md">  
               <span class="text-md ml-10">TOTAL TRANSACTION COST: </span>
               <span class="text-2xl"> {{ totalcost }}.KSH</span>
            </div>
        </div>

       <div class="  mt-3 p-5">
         <div>
            <label class="text-sm text-center block w-full">Mpesa Number</label>
            <input type="text" v-model="mpesanNo"  @input="filterPhoneNo"  class="w-full rounded-lg  p-3 border border-gray-700  text-sm shadow-sm focus:border-black focus:ring-black text-black bg-white" />
         </div>
         </div>

         <div class="flex justify-center py-4">
        <button @click="PayViaMpesa" class="bg-green-500 text-lg text-white p-3 rounded w-1/3">PAY</button>
        </div>

        </div>
        </div>




        <!-- cash PAYMENT input -->
        <div v-if="isCashOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full">

            <div class="relative flex items-center justify-center"> 
                <p class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center">Payment via cash</p>
                <button @click="CloseCash" class="absolute right-0 bg-black text-white px-1 rounded">x</button>
            </div>
          
            <div class="flex space-x-6  p-4">
            <div  class="p-2 w-1/2 mt-1 border border-gray-400 rounded-md">  
            <span class="text-md">No Of Items: </span>
            <span class="text-xl px-4"> {{ NoItems }}</span>
            </div>

            <div  class="p-2 mt-1 w-1/2 border border-gray-400 rounded-md"> 
            <span class="text-md">Total VAT: </span>
            <span class="text-xl px-4">{{ Vat }}.KSH</span>
            </div>
            </div>
            
            <div class="flex space-x-6 w-full  p-4">
            <div  class="p-2 mt-1 w-1/2 border border-gray-400 rounded-md"> 
            <span class="text-md">Total Discount: </span>
            <span class="text-xl text-black">{{ Discount }}.KSH</span>
            </div>

            <div  class="p-2 mt-1 w-1/2 border border-gray-400 rounded-md">  
               <span class="text-md"> Items Cost: </span>
               <span class="text-xl"> {{ ITcost }}.KSH</span>
            </div>          
        </div> 

         <div class="flex space-x-6 w-full  p-4">
             <div  class="p-2 mt-1 w-full border border-gray-400 rounded-md">  
               <span class="text-md ml-10">TOTAL COST: </span>
               <span class="text-2xl px-7"> {{ totalcost }}.KSH</span>
             </div>
         </div>

        <div class="flex space-x-6 w-full  p-4">
            <div  class="p-2  w-1/2 "> 
            <label class="text-sm text-center block w-full">AMOUNT RECEIVED </label>
            <input type="text" v-model="receivedcash"  @input="filterCashChange"  class="w-full rounded-lg  p-3 border border-gray-700  text-sm shadow-sm focus:border-black focus:ring-black text-black bg-white" />
         </div>
        
         <div class="w-1/2  mt-2">   
            <label class="text-sm text-center block w-full">CHANGE</label>
           <div class=" border border-gray-400 rounded-md h-12 p-2">  
               <span class="text-xl"> {{ cashchange }}.KSH</span>
           </div>       
         </div>
         </div>

         <div class="flex justify-center py-4">
        <button @click="PayViaCash" class="bg-blue-500 text-lg text-white p-3 rounded w-1/3">PAY</button>
        </div>
        <span v-if = "insufficient" class="text-red-500 text-center block justify-center"> !!.insufficient balance </span>

        </div>
        </div>

        <!-- credit payment input -->
        <div v-if="isCreditOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full">
            <p class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center">Payment on Credit</p>  
            <ul>
            <!-- <li v-for="item in contactGroup" :key="item.id">{{ item.name }} - {{ item.price }}</li> -->
             <li>In development </li>
            </ul>

            <button @click="CloseCredit" class="bg-black text-white px-1 mt-3 rounded">x</button>
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
    
    import Swal from 'sweetalert2';
    import { ref, onMounted, computed } from 'vue';
    
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