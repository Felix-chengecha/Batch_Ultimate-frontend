<template>

      
  <div class="rounded-lg border border-gray-200  bg-gray-300 h-full">
  
    <div class="overflow-x-auto rounded-t-lg py-1 px-1 ">

    <div class="rounded-lg border border-gray-200  bg-gray-300 h-full">
      <div class="overflow-x-auto rounded-t-lg py-1 px-1 space-y-1 ">
        <a @click="openModal" class="inline-block rounded bg-blue-600 px-2 py-2  mr-2 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring focus:ring-yellow-400"> 
           Add new Product
        </a> 
    
      <input v-model="searchQuery" id="Search" @input="productSearch" type="text"  placeholder="Search your...inventory" 
      class="w-1/4 rounded-md border-gray-200 py-2.5 mr-2 shadow-sm sm:text-sm absolute right-0"/>
  

    
    
    
  <h2 class="text-3xl font-bold sm:text-2xl text-center text-gray-700 mt-1">My Inventory</h2>

  
        <table class="min-w-full divide-y-1 divide-gray-200 bg-gray-100 mt-1 text-sm rounded">
          <thead class="ltr:text-left rtl:text-right">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Cost</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Buying price</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantity</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Buying Date</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>

            </tr>
          </thead>
    
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, index) in filteredProducts" :key="index">
              <td class="whitespace-nowrap px-4 py-2  font-medium text-gray-900 ml-5">{{ item .productID}}</td>
              <td class="whitespace-nowrap px-4 py-2  font-medium text-gray-700 ml-5">{{ item.productName}}</td>
              <td class="whitespace-nowrap px-4 py-2  font-medium text-gray-700 ml-5">{{ item.sellingPrice }}</td>
              <td class="whitespace-nowrap px-4 py-2  font-medium text-gray-700 ml-5">{{ item.buyingPrice }}</td>
              <td class="whitespace-nowrap px-4 py-2  font-medium text-gray-700 ml-5">{{ item.productType }}</td>
              <td class="whitespace-nowrap px-4 py-2  font-medium text-gray-700 ml-5">{{ item.quantity }}</td>
              <td class="whitespace-nowrap px-4 py-2  font-medium text-gray-700 ml-5">{{ item.status }}</td>
              <td class="whitespace-nowrap px-4 py-2  font-medium text-gray-700 ml-5">{{ item.createdOn }}</td>
              <td class="ml-5">  ..</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>

     <!-- Modal backdrop  to add a new product-->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center w-full justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">

      <div class="relative flex items-center justify-center">
          <p class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center">ADD NEW PRODUCT</p>
          <button @click="closeModal" class="absolute right-0 bg-black text-white px-1 rounded">x</button>
        </div>

      <div class="grid grid-cols-2 gap-4 mt-2">
        <div>
          <label for="pname" class="text-sm text-black">Product name</label>
          <input type="text" v-model="pname" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
        </div>

        <div>

          <label for="pcategory" class="text-sm text-black">Product Category</label>
          <select v-model="pcategory" id="category" class="w-full rounded-lg border border-gray-400 p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 text-black bg-white">
            <option v-for="option in categ" :key="option.categoryID" :value="option.categoryID">{{ option.categoryName }}</option>
          </select>
        </div>

        <div>
          <label for="PNoItems" class="text-sm text-gray-700">No Of Items</label>
          <input type="text" v-model="PNoItems" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
        </div>

        <div>
          <label for="pcost" class="text-sm text-gray-700">weight/volume</label>
          <input type="text" v-model="punit" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
        </div>


        <div>
          <label for="PNoItems" class="text-sm text-gray-700">VAT %</label>
          <input type="text" v-model="Pvat" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
        </div>

        <div>
          <label for="pcost" class="text-sm text-gray-700">Product Cost</label>
          <input type="text" v-model="pcost" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
        </div>


        <div>
          <label for="pbuyingprice" class="text-sm text-gray-700">Product Buying Price</label>
          <input type="text" v-model="pbuyingprice" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
        </div>

        <div>
          <label for="pbuyingdate" class="text-sm text-gray-700">Product Buying Date</label>
          <input type="date" v-model="pbuyingdate" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
        </div>

        <div class="col-span-2">
          <label for="pdescription" class="text-sm text-gray-700">Description</label>
          <textarea id="pdescription" rows="4" v-model="pdescription" class="w-full rounded-lg p-2 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-400 border border-gray-400" placeholder="Type your product description, maximum 500 characters"></textarea>
        </div>
      </div>

        <div class="text-center mt-6"> 
           <a @click="addinventory" class="inline-block bg-blue-500 rounded-md px-4 py-3 text-sm font-bold uppercase tracking-widest text-white">Add product</a>
        </div>
      </div>
    </div> 
  </div>
<!-- Modal backdrop  to add a new template-->

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
              products: [{
                productID:"PR_"+part1+part2+"000"+pcategory.value,
                productName: pname.value,
                productDescription: pdescription.value,
                Weight_Volume :punit.value,
                categoryID: pcategory.value,
                buyingPrice: pbuyingprice.value,
                sellingPrice: pcost.value,
                quantity: PNoItems.value,
                createdBy: "chee",//localStorage.getItem('name'),
                updatedBy: "",
                createdOn: "2014_10_12",
                updatedOn: ""
              }]
            }
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