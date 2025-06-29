<template>
  <div class="rounded-lg border border-gray-200 bg-gray-300 h-full p-2">
    
    <!-- Header & Search Controls -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">
      <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700">My Inventory</h2>
      <div class="flex flex-col sm:flex-row items-center gap-2">
        <button @click="openModal"
          class="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring focus:ring-yellow-400">
          Add New Product
        </button>

        <input v-model="searchQuery" id="Search" @input="productSearch" type="text"
          placeholder="Search inventory..."
          class="w-full sm:w-64 rounded-md border border-gray-300 py-2 px-3 shadow-sm text-sm focus:ring focus:ring-blue-400" />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 bg-white text-sm rounded-lg shadow">
        <thead class="bg-gray-100">
          <tr>
            <!--<th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">ID</th> -->
            <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Name</th>
            <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Cost</th>
            <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Buying price</th>
            <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Category</th>
            <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Quantity</th>
            <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Status</th>
            <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Supplier</th>
            <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Buying Date</th>
            <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(item, index) in filteredProducts" :key="index">
          <!--  <td class="px-4 py-2 text-gray-800 whitespace-nowrap">{{ item.productID }}</td> -->
            <td class="px-4 py-2 text-gray-800 whitespace-nowrap">{{ item.productName }}</td>
            <td class="px-4 py-2 text-gray-800 whitespace-nowrap">{{ item.sellingPrice }}</td>
            <td class="px-4 py-2 text-gray-800 whitespace-nowrap">{{ item.buyingPrice }}</td>
            <td class="px-4 py-2 text-gray-800 whitespace-nowrap">{{ item.productType }}</td>
            <td class="px-4 py-2 text-gray-800 whitespace-nowrap">{{ item.quantity }}</td>
            <td class="px-4 py-2 text-gray-800 whitespace-nowrap">{{ item.status }}</td>
            <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"> {{item.supplierId}} </th>
            <td class="px-4 py-2 text-gray-800 whitespace-nowrap">{{ item.createdOn }}</td>
            <td class="px-4 py-2 text-gray-800 whitespace-nowrap">...</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-screen overflow-y-auto">
        <div class="relative text-center mb-4">
          <p class="text-lg font-semibold uppercase text-gray-700">Add New Product</p>
          <button @click="closeModal" class="absolute right-0 top-0 bg-black text-white px-2 rounded">x</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Form Inputs -->
          <div>
            <label class="text-sm text-gray-700">Product Name</label>
            <input v-model="pname" type="text" class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          </div>

          <div>
            <label class="text-sm text-gray-700">Product Category</label>
            <select v-model="pcategory" class="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white">
              <option v-for="option in categ" :key="option.categoryID" :value="option.categoryID">{{ option.categoryName }}</option>
            </select>
          </div>

          <div>
            <label class="text-sm text-gray-700">No of Items</label>
            <input v-model="PNoItems" type="text" class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          </div>

          <div>
            <label class="text-sm text-gray-700">Weight/Volume</label>
            <input v-model="punit" type="text" class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          </div>

          <div>
            <label class="text-sm text-gray-700">VAT %</label>
            <input v-model="Pvat" type="text" class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          </div>

          <div>
            <label class="text-sm text-gray-700">Product Cost</label>
            <input v-model="pcost" type="text" class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          </div>

          <div>
            <label class="text-sm text-gray-700">Product Buying Price</label>
            <input v-model="pbuyingprice" type="text" class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          </div>

          <div>
            <label class="text-sm text-gray-700">Product Buying Date</label>
            <input v-model="pbuyingdate" type="date" class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          </div>

          <div class="col-span-1 md:col-span-2">
            <label class="text-sm text-gray-700">Description</label>
            <textarea v-model="pdescription" rows="3" class="w-full border border-gray-300 rounded-lg p-2 text-sm"
              placeholder="Max 500 characters"></textarea>
          </div>
        </div>

        <div class="text-center mt-4">
          <button @click="addinventory" class="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-semibold">
            Add Product
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

    
    <script>
    import {UseInventoryStore} from '../store/InventoryStore'
    import {useCategoryStore} from '../store/categoryStore'
    import Swal from 'sweetalert2';
    import axios from '../axios';
    import { ref,onMounted, watch,computed } from 'vue';
    
    export default {
      setup() {
  

        //properties 
        // const pname   = ref('');
        // const pcost   = ref('');
        const Pvat = ref('');
        const punit = ref('');
        const pname   = ref('');
        const pcost   = ref('');
        const pbuyingprice  = ref('');
        const pbuyingdate  = ref('');
        const pdescription  = ref('');
        const pcategory = ref('');
        const submitSuccess = ref('');
        const PNoItems = ref('');
        const isModalOpen = ref(false); 
        const token = ref('your-auth-token'); 
       
        //store  properties
        const inventorystore  = UseInventoryStore();
        const CategoryStore  = useCategoryStore();

        const data = computed(() => inventorystore.getData);
        const categ = computed(() => CategoryStore.getData);
        const filteredProducts = computed(() => inventorystore.filterProducts);

        const productSearch = (e) => {
        inventorystore.setSearchProduct(e.target.value);
        }; 

        //add product modal
        const openModal = () => { 
          console.log("open")
          isModalOpen.value = true;
        };
        
        const closeModal = () => {
          isModalOpen.value = false;
        };

        //fetch all records on load from the store
        onMounted(()=>{
          inventorystore.getallproducts();
          CategoryStore.fetchCategories();

          });
    

      //add new product to inventory
       const addinventory = () => {
        const part1 = pname.value.substring(0, 3);
        const part2 = pname.value.slice(-3);

         try{  
          if(!Validation()){
          return false;
        }
            const postData = {
                //productID:"PR_"+part1+part2+"000"+pcategory.value,
                productName: pname.value,
                productDescription: pdescription.value,
                Weight_Volume :punit.value,
                categoryID: pcategory.value,
                buyingPrice: pbuyingprice.value,
                sellingPrice: pcost.value,
                quantity: PNoItems.value,
                supplier: "0197b829-6d97-7540-9ab2-89913ebf9742"
                // createdBy: "chee",//localStorage.getItem('name'),
                // updatedBy: "",
                // createdOn: "2014_10_12",
                // updatedOn: ""
              };
            
              inventorystore.AddnewProduct(postData);
                setTimeout(() => {
                  DisplayMessage("success", inventorystore.successmsg)
               }, 2000); 

         } catch(error){
          DisplayMessage("success", error);
        }
      }

      const DisplayMessage=(icon,message) => {
             closeModal();
          inventorystore.getallproducts();
               pname.value= "";
               pdescription.value= "";
               punit.value= "";
               pcategory.value= "";
               pbuyingprice.value= "";
               pcost.value= "";
               PNoItems.value= "";

        Swal.fire({
            position: "top-end",
            icon: icon,
            title: message,
            showConfirmButton: false,
            timer: 1500
          });
       }

      const Validation = () => { 

        let isNumeric = /^\d+$/;
          if( pname.value.trim() === "" && pdescription.value.trim() === "" && punit.value.trim() === "" &&  pcategory.value.trim() === "" &&  pbuyingprice.value.trim() === ""   &&  pcost.value.trim() === ""   &&  PNoItems.value.trim() === "" ) {
            DisplayMessage("error", "!!error please fill all the fields");
            return false;     
          }
          else if (!isNumeric.test(pbuyingprice.value) ) {
            DisplayMessage("error", "!!error buying price should be numeric");
          return false;  
         }
       
         else if (!isNumeric.test(pcost.value)) {
           DisplayMessage("error", "!!error product cost should be numeric");
           return false;  
          }

         else if(!isNumeric.test(PNoItems.value) ) {
           DisplayMessage("error", "!!error No of items should be numeric");
          return false;  
          }  

        //else{
          return true;
        // }

        }


    
   
       
        
        return {
      
        pname,
        pcost,
        pbuyingprice,
        pbuyingdate,
        pdescription,
        PNoItems,
        pcategory,
        data,
        Pvat,
        punit,
        addinventory,
        openModal,
        closeModal,
        isModalOpen,
        CategoryStore,
        categ,
        productSearch,
        filteredProducts
        // filtereddata
        };
      }
    };
    </script>