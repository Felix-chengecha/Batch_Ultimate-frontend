


    <template>
  <div class="rounded-lg border border-gray-200 bg-gray-300 h-full p-2">
    <div class="overflow-x-auto rounded-t-lg py-1 px-1 space-y-2 mt-2">
 

    <div class="relative mb-3 flex flex-col md:flex-row md:items-center md:space-x-4">
     <span class="text-xl sm:text-2xl mb-2 md:mb-0">
       Product Catalogue
     </span>      
    <input 
    type="text"  
    id="Search"  
    placeholder="Search for...anything" 
    class="w-full md:w-1/2 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm text-sm"
  />
</div>



      
      <!-- Make table horizontally scrollable -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-100 text-sm rounded">
          <thead class="text-left">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">SKU</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <!-- <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th> -->
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Buying Price</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Selling Price</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">In stock</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, index) in data" :key="index">
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.sku }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.productName }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.productCost }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.buyingPrice }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.sellingPrice }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.availability }}</td>
              <!-- <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.supplier }}</td> -->
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                <button class="text-blue-600 hover:underline text-xs">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="rounded-b-lg border-t border-gray-200 px-4 py-2">
      <ol class="flex flex-wrap justify-center sm:justify-end gap-1 text-xs font-medium">
        <li>
          <a href="#" class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900">
            <span class="sr-only">Prev Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
          </a>
        </li>
        <li><a href="#" class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900">1</a></li>
        <li class="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">2</li>
        <li><a href="#" class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900">3</a></li>
        <li><a href="#" class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900">4</a></li>
        <li>
          <a href="#" class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900">
            <span class="sr-only">Next Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd" />
            </svg>
          </a>
        </li>
      </ol>
    </div>
  </div>
</template>

    
    
    
    <script>
    import {useCatalogueStore} from '../store/catalogueStore'
    import Swal from 'sweetalert2';
    import { computed,ref,onMounted,watch } from 'vue';
    import { errorState } from '../store/ErrorState';

    
    export default {
      setup() { 
         const CatalogStore  = useCatalogueStore();

         const filtereddata = CatalogStore .filteredData;

         const data = computed(() => CatalogStore.getData);  
         
    watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   ErrorMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		    }) 

      onMounted(()=>{
        CatalogStore.fetchCatalogue();
        });

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

    const ErrorMessage = (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        confirmButtonColor: '#3b82f6',
      })
    }


        return {
          CatalogStore,
          data,  
          DisplayMessage,
          ErrorMessage
           }        
      }
    };
    </script>