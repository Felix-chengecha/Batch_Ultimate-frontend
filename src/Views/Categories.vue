
   <template>
  <div class="rounded-lg border border-gray-200 bg-gray-300 min-h-screen p-4">
    <!-- Header -->


      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
       <div>
        <h1 class="text-2xl font-bold text-gray-800">Categories</h1>
        <p class="text-sm text-gray-500 mt-1">Manage your Categories</p>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <input 
          v-model="searchQuery" 
          id="Search" 
          @input="productSearch" 
          type="text"
          placeholder="Search Category..."
          class="w-full sm:w-64 rounded-lg border border-gray-200 py-2 px-4 shadow-sm text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
        />
        <button @click="openModal(null)"
          class="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Category
        </button>
      </div>
    </div>





      <!-- Search bar placeholder -->
      <div class="relative mb-2">
        <label for="Search" class="sr-only"> Search </label>
        <!-- Optional search input could go here -->
      </div>

      <!-- Table Wrapper -->
    <div class="overflow-hidden rounded-xl border border-gray-200 shadow-xs">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Code</th>
              <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No of Items</th> -->
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created on</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No of Products</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              class="bg-white border-4 border-gray-200 hover:bg-gray-50 transition-colors"
              v-for="(item, index) in data"
              :key="item.categoryID"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
               <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {{ item.categoryName }} 
               </span> </td>
             <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500 max-w-xs truncate">{{ item.categoryCode }}</div> </td> 
               <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                  'bg-green-100 text-green-800': item.status  = true,
                  'bg-red-100 text-red-800': item.availability = false
                }">
                  {{ item.availability }} in stock
                </span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 max-w-xs truncate">{{ item.createdOn }} </div> </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 max-w-xs truncate">{{ 20}} </div> </td>
              <td class="px-6 py-4 whitespace-nowrap">.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4" >
      <div class="bg-white w-full max-w-md rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <div class="p-4">
           <div class="relative text-center mb-4">
          <p class="text-lg font-semibold uppercase text-gray-700">Add New Category</p>
          <button @click="closeModal" class="absolute right-0 top-0 bg-black text-white px-2 rounded">x</button>
        </div>

          <div class="mt-4">
            <label class="block text-sm text-gray-700 mb-1">Category Name</label>
            <input
              type="text"
              v-model="Cname"
              class="w-full rounded-lg p-2 text-sm border border-gray-400 focus:border-gray-500 focus:ring-gray-500"
            />
          </div>

          <div class="mt-4">
            <label class="block text-sm text-gray-700 mb-1">Category Code</label>
            <input type="text" v-model="Ccode" class="w-full rounded-lg p-2 text-sm border border-gray-400 focus:border-gray-500 focus:ring-gray-500" />
          </div>


          <div class="mt-4">
            <label class="block text-sm text-gray-700 mb-1">Description</label>
            <textarea
              v-model="Cdescription"
              rows="3"
              class="w-full rounded-lg p-2 text-sm border border-gray-400 focus:border-gray-500 focus:ring-gray-500"
              placeholder="Type your product description (max 500 characters)"
            ></textarea>
          </div>

      
          <div class="mt-6 text-center">
            <a @click="AddCategory" class="block w-full bg-blue-500 rounded-md py-3 text-sm font-bold uppercase text-white tracking-widest">
              Submit
            </a>
      
          </div>
        </div>
      </div>
    </div>
    </div>

</template>

   <script>
   import {useCategoryStore} from '../store/categoryStore'
   import Swal from 'sweetalert2';
   import { computed,ref,onMounted,watch } from 'vue';
   
   export default {
     setup() {
 
       //properties
       const Cname   = ref('');
       const Ccode   = ref('');
       const CNoItems  = ref('');
       const Cdescription  = ref('');

       const isModalOpen = ref(false); 
     
       //store  properties
      const CategoryStore  = useCategoryStore();
      const filtereddata = CategoryStore .filteredData;
      const data = computed(() => CategoryStore.getData);
         
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

  


       //add product modal
       const openModal = () => {
         isModalOpen.value = true;
       };
       
       const closeModal = () => {
         isModalOpen.value = false;
       }

       //fetch all records on load from the store
       onMounted(()=>{
         CategoryStore.fetchCategories();
         })

       
         
     //add new product to inventory
      const AddCategory = () => {
        
        if(!Validation()){
          return false;
        }
   
      const postData = {
            categoryName: Cname.value,
            categoryCode:  Ccode.value,
            noOfItems: 1,
            categoryDescription: Cdescription.value,
            status: "active",
        };

        try {  
        CategoryStore.AddnewCategory(postData);
          setTimeout(() => {
            DisplayMessage("success", CategoryStore.successmsg)
         }, 3000); 
       } catch(error){
        DisplayMessage("error", error);
       }

    } 


  

     const Validation = () => { 

      let isNumeric = /^\d+$/;
        if( Cname.value.trim() === "" && Ccode.value.trim() === "" &&   Cdescription.value.trim() ==="") {
          DisplayMessage("error", "!!error please fill all the fields");
          return false;     
        }

    
        return true;

    }
      
       
       return {
   
      Cname,
      Ccode,
      CNoItems,
      Cdescription,

      data,
      AddCategory,
      openModal,
      closeModal,
      isModalOpen,
      filtereddata,
      Validation,
      DisplayMessage
       };
     }
   };
   </script>