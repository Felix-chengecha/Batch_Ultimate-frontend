
   <template>
  <div class="rounded-lg border border-gray-200 bg-gray-300 min-h-screen p-4">
    <!-- Header -->
    <div class="overflow-x-auto rounded-t-lg">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 relative">
        <h2 class="text-xl sm:text-3xl font-bold text-gray-700 text-center sm:text-left">
          Product Categories
        </h2>
        <a
          @click="openModal"
          class="mt-2 sm:mt-0 inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring focus:ring-yellow-400 sm:absolute sm:right-0"
        >
          Add new Category
        </a>
      </div>

      <!-- Search bar placeholder -->
      <div class="relative mb-2">
        <label for="Search" class="sr-only"> Search </label>
        <!-- Optional search input could go here -->
      </div>

      <!-- Table Wrapper -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-100 text-sm rounded">
          <thead class="text-left">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category Name</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Code</th>
              <!-- <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No of Items</th> -->
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created on</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              class="bg-white border-4 border-gray-200"
              v-for="(item, index) in data"
              :key="item.categoryID"
            >
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.categoryName }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.categoryCode }}</td>
              <!-- <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.noOfItems }}</td> -->
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.status }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.createdOn }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">..</td>
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

          <!-- Input: Category Code -->
          <div class="mt-4">
            <label class="block text-sm text-gray-700 mb-1">Category Code</label>
            <input type="text" v-model="Ccode" class="w-full rounded-lg p-2 text-sm border border-gray-400 focus:border-gray-500 focus:ring-gray-500" />
          </div>

          <!-- Input: No of Items -->
          <!-- <div class="mt-4">
            <label class="block text-sm text-gray-700 mb-1">No Of Items</label>
            <input
              type="text"
              v-model="CNoItems"
              class="w-full rounded-lg p-2 text-sm border border-gray-400 focus:border-gray-500 focus:ring-gray-500"
            />
          </div> -->


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