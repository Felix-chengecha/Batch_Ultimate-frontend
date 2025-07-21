<template>
  <div class="rounded-xl border border-gray-200 bg-white h-full p-4 shadow-sm">
    <!-- Header & Search Controls -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Inventory list</h1>
        <p class="text-sm text-gray-500 mt-1">A list of all inventory</p>
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <input 
          v-model="searchQuery" 
          id="Search" 
          @input="productSearch" 
          type="text"
          placeholder="Search inventory..."
          class="w-full sm:w-64 rounded-lg border border-gray-200 py-2 px-4 shadow-sm text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
        />
        <button @click="openModal(null)"
          class="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Product
        </button>
      </div>
    </div>

    <!-- Responsive Table Container -->
   <div class="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 bg-white text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-1/6">Product</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Stock</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr 
          v-for="(item, index) in filteredProducts" 
          :key="index"
          class="hover:bg-gray-50 transition-colors"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900 max-w-xs truncate">{{ item.productName }}</div>
            <div class="text-xs text-gray-800 max-w-xs truncate">{{ item.productDescription }}</div> 
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            ${{ formatCurrency(item.sellingPrice) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${{ formatCurrency(item.buyingPrice) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {{ item.productType }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
            {{ item.quantity }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
            <span :class="{
              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
              'bg-green-100 text-green-800': item.status === true && item.quantity > 10 ,
              'bg-yellow-100 text-yellow-800': item.status === true && item.quantity < 10,
              'bg-red-100 text-red-800': item.status === false
            }">
              {{ item.status === false ? 'Out Of Stock' : item.quantity < 10 ? 'LowStock' : "InStock" }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ item.supplier?.supplierName  }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex items-center space-x-2">
              <button 
                @click="openModal(item)"
                class="text-blue-600 hover:text-blue-900 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                </svg>
              </button>
              <button 
                @click="confirmDelete(item)"
                class="text-red-600 hover:text-red-900 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="filteredProducts.length === 0">
          <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">
            <div class="flex flex-col items-center justify-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p class="mt-2 text-sm font-medium text-gray-600">No products found</p>
              <p class="text-xs text-gray-500 mt-1">Try adjusting your search or add a new product</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    <!-- Modal -->
    <div 
      v-if="isModalOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeModal"
    >
      <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">{{ currentProduct ? 'Edit Product' : 'Add New Product' }}</h3>
          <button 
            @click="closeModal" 
            class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Form Inputs -->
          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Product Name <span class="text-red-500">*</span></label>
            <input 
              v-model="pname" 
              :ref="fieldRefs.pname"
              @input="validateForm"
              type="text"
               :class="[
                'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
                errors.pname ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
               ]"
            />
            <p v-if="errors.pname" class="text-sm text-red-600">{{ errors.pname }}</p>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Product Category <span class="text-red-500">*</span></label>
            <select 
              v-model="pcategory" 
               :ref="fieldRefs.pcategory"
              @change="validateForm"
              type="text"
               :class="[
                'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
                errors.pcategory ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
               ]"
            >
              <option value="" disabled selected>Select a category</option>
              <option v-for="option in categ" :key="option.categoryID" :value="option.categoryID">
                {{ option.categoryName }}
              </option>
            </select>

            <p v-if="errors.pcategory" class="text-sm text-red-600">{{ errors.pcategory }}</p>

          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">No of Items <span class="text-red-500">*</span></label>
            <input 
              v-model="PNoItems" 
              type="number" 
               :ref="fieldRefs.PNoItems"
              @input="validateForm"
               :class="[
                'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
                errors.PNoItems ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
               ]"
            />
            <p v-if="errors.PNoItems" class="text-sm text-red-600">{{ errors.PNoItems }}</p>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Weight/Volume</label>
            <input 
              v-model="punit" 
              type="text" 
              :ref="fieldRefs.punit"
              @input="validateForm"
               :class="[
                'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
                errors.punit ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
               ]"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">VAT %</label>
            <input 
              v-model="Pvat" 
              type="number" 
              :ref="fieldRefs.Pvat"
              @input="validateForm"
               :class="[
                'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
                errors.Pvat ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
               ]"
            />
            <p v-if="errors.Pvat" class="text-sm text-red-600">{{ errors.Pvat }}</p>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Product Cost <span class="text-red-500">*</span></label>
            <input 
              v-model="pcost" 
              type="number" 
              :ref="fieldRefs.pcost"
              @input="validateForm"
               :class="[
                'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
                errors.pcost ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
               ]"
            />
            <p v-if="errors.pcost" class="text-sm text-red-600">{{ errors.pcost }}</p>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Product Buying Price <span class="text-red-500">*</span></label>
            <input 
              v-model="pbuyingprice" 
              type="number" 
              :ref="fieldRefs.pbuyingprice"
              @input="validateForm"
               :class="[
                'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
                errors.pbuyingprice ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-100 focus:border-blue-100 '
               ]"
            />
            <p v-if="errors.pbuyingprice" class="text-sm text-red-600">{{ errors.pbuyingprice }}</p>
          </div>

          <!-- <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Product Buying Date</label>
            <input 
              v-model="pbuyingdate" 
              type="date" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
            />
          </div> -->
           <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Supplier <span class="text-red-500">*</span></label>
            <select 
              v-model="supplier" 
              :ref="fieldRefs.supplier"
              @change="validateForm"
               :class="[
                'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
                errors.supplier ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-100 focus:border-blue-100 '
               ]"
            >
              <option value="" disabled selected>Select a Supplier</option>
              <option v-for="option in supplierdata" :key="option.supplierId" :value="option.supplierId">
                {{ option.supplierName }}
              </option>
            </select>
            <p v-if="errors.supplier" class="text-sm text-red-600">{{ errors.supplier }}</p>
          </div>

          <div class="col-span-1 md:col-span-2 space-y-1">
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              v-model="pdescription" 
              rows="3" 
              :ref="fieldRefs.pdescription"
              @input="validateForm"
               :class="[
                'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
                errors.pdescription ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-100 focus:border-blue-100 '
               ]"
              placeholder="Max 500 characters"
              maxlength="500"
            ></textarea>

            <p v-if="errors.pdescription" class="text-sm text-red-600">{{ errors.pdescription }}</p>

            <div class="text-xs text-gray-500 text-right">
              {{ pdescription.length }}/500
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button 
            @click="closeModal" 
            class="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="currentProduct ? updateProduct() : addinventory()" 
            :disabled="!isFormValid"
            class="px-4 py-2.5 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
          >
            {{ currentProduct ? 'Update Product' : 'Add Product' }}
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
import { ref,onMounted, watch,computed,nextTick } from 'vue';
import { errorState } from '../store/ErrorState';
import { useSuppliersStore } from '../store/SuppliersStore';

export default {
  setup() {
    //properties 
    const Pvat = ref('');
    const punit = ref('');
    const pname = ref('');
    const pcost = ref('');
    const pbuyingprice = ref('');
    const pbuyingdate = ref('');
    const pdescription = ref('');
    const pcategory = ref('');
    const supplier = ref('');
    const submitSuccess = ref('');
    const PNoItems = ref('');
    const isModalOpen = ref(false); 
    const token = ref('your-auth-token'); 
    const suppliersstore = useSuppliersStore();
    const searchQuery = ref('');
    const currentProduct = ref(null);

    const errors = ref({});

    //store properties
    const inventorystore = UseInventoryStore();
    const CategoryStore = useCategoryStore();

    const data = computed(() => inventorystore.getData);
    const categ = computed(() => CategoryStore.getData);
    const filteredProducts = computed(() => inventorystore.filterProducts); 
    const supplierdata = computed(() => suppliersstore.filterSuppliers);

    const fieldRefs = {
      pname: ref(null),
      pdescription: ref(null),
      punit: ref(null),
      pcategory: ref(null),
      pbuyingprice: ref(null),
      pcost: ref(null),
      Pvat: ref(null),
      PNoItems: ref(null),
      supplier: ref(null)
    };

    watch(() => errorState.message, (newVal) => {
      if (newVal) {
        DisplayMessage(`Error: ${errorState.code} - ${newVal}`)
      }
    });

    watch(() => inventorystore.getResponse, (newval) => {
      if (newval.status == 200) { 
        DisplayMessage("success", newval.statusMessage);
      } 
      else {
        DisplayMessage("error", newval.statusMessage);
      }
    });

    const formatCurrency = (value) => {
      return parseFloat(value || 0).toFixed(2);
    };

    const productSearch = (e) => {
      inventorystore.setSearchProduct(e.target.value);
    }; 

    const openModal = (product) => { 
      currentProduct.value = product;
      if (product) {
        // Populate fields if editing
        pname.value = product.productName;
        pdescription.value = product.productDescription;
        punit.value = product.Weight_Volume;
        pcategory.value = product.categoryID;
        pbuyingprice.value = product.buyingPrice;
        pcost.value = product.sellingPrice;
        PNoItems.value = product.quantity;
        supplier.value = product.supplier?.supplierId;
      } else {
        // Reset fields if adding new
        pname.value = '';
        pdescription.value = '';
        punit.value = '';
        pcategory.value = '';
        pbuyingprice.value = '';
        pcost.value = '';
        PNoItems.value = '';
        supplier.value = '';
      }
      isModalOpen.value = true;
    };
    
    const closeModal = () => {
      isModalOpen.value = false;
    };

    const confirmDelete = (product) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          inventorystore.deleteProduct(product.productID);
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          )
        }
      })
    };

    //add new product to inventory
    const addinventory = () => {
      try {  
        if(!validateForm()) {
          return false;
        }
        const postData = {
          productName: pname.value,
          productDescription: pdescription.value,
          Weight_Volume: punit.value,
          categoryID: pcategory.value,
          buyingPrice: pbuyingprice.value,
          sellingPrice: pcost.value,
          quantity: PNoItems.value,
          supplier: supplier.value
        };
        
        inventorystore.AddnewProduct(postData); 
      } catch(error) {
        DisplayMessage("Error", error);
      }
    }

    const updateProduct = () => {
      try {  
        if(!validateForm()) {
          return false;
        }
        const postData = {
          productID: currentProduct.value.productID,
          productName: pname.value,
          productDescription: pdescription.value,
          Weight_Volume: punit.value,
          categoryID: pcategory.value,
          buyingPrice: pbuyingprice.value,
          sellingPrice: pcost.value,
          quantity: PNoItems.value,
          supplier: supplier.value
        };
        
        inventorystore.updateProduct(postData);
      } catch(error) {
        DisplayMessage("Error", error);
      }
    }

    const DisplayMessage = (icon, message) => {
      closeModal();
      inventorystore.getallproducts(token.value);
      pname.value = "";
      pdescription.value = "";
      punit.value = "";
      pcategory.value = "";
      pbuyingprice.value = "";
      pcost.value = "";
      PNoItems.value = "";

      Swal.fire({
        position: "top-end",
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
    }

    /*const Validation = () => { 
      let isNumeric = /^\d+$/;
      if(pname.value.trim() === "" || pdescription.value.trim() === "" || punit.value.trim() === "" || 
         pcategory.value.trim() === "" || supplier.value.trim() === "" || pbuyingprice.value.trim() === "" || 
         pcost.value.trim() === "" || PNoItems.value.trim() === "") {
        DisplayMessage("error", "!!error please fill all the fields");
        return false;     
      }
      else if(!isNumeric.test(pbuyingprice.value)) {
        DisplayMessage("error", "!!error buying price should be numeric");
        return false;  
      }
      else if(!isNumeric.test(pcost.value)) {
        DisplayMessage("error", "!!error product cost should be numeric");
        return false;  
      }
      else if(!isNumeric.test(PNoItems.value)) {
        DisplayMessage("error", "!!error No of items should be numeric");
        return false;  
      }  

      return true;
    }*/

    const validateForm = async () => {
  const isNumeric = /^\d+$/;
  const newErrors = {};

  if (!String(pname.value || '').trim()) newErrors.pname = "Product name is required";
  if (!String(pdescription.value || '').trim()) newErrors.pdescription = "Description is required";
  if (!String(punit.value || '').trim()) newErrors.punit = "Weight/Volume is required";
  if (!String(pcategory.value || '').trim()) newErrors.pcategory = "Category is required";
  if (!String(supplier.value || '').trim()) newErrors.supplier = "Supplier is required";
  if (!String(pbuyingprice.value || '').trim()) newErrors.pbuyingprice = "Buying price is required";
  if (!String(pcost.value || '').trim()) newErrors.pcost = "Selling price is required";
  if (!String(PNoItems.value || '').trim()) newErrors.PNoItems = "No of items is required";
  if (!String(Pvat.value || '').trim()) newErrors.Pvat = "please pass VAT";

  if (pbuyingprice.value && !isNumeric.test(String(pbuyingprice.value))) newErrors.pbuyingprice = "Buying price must be numeric";
  if (pcost.value && !isNumeric.test(String(pcost.value))) newErrors.pcost = "Selling price must be numeric";
  if (PNoItems.value && !isNumeric.test(String(PNoItems.value))) newErrors.PNoItems = "No of items must be numeric";
  if (PNoItems.value && !isNumeric.test(String(Pvat.value))) newErrors.Pvat = "VAT must be numeric";

  errors.value = newErrors;

  //check if there are errors present
  if(Object.keys(newErrors).length > 0){
    await nextTick();
    const firstKey = Object.keys(newErrors)[0]
    const el = fieldRefs[firstKey]?.value;
    if(el && typeof el.ScrollIntoView === 'function'){
      el.ScrollIntoView({behaviour : 'smooth',block : 'center'})
      el.focus;
    }
    return false;
  }

return true;
};

const isFormValid = computed(() => Object.keys(errors.value).length === 0);



    //fetch all records on load from the store
    onMounted(() => { 
      let token = localStorage.getItem('token'); 
      inventorystore.getallproducts(token);
      CategoryStore.fetchCategories(token);
      suppliersstore.getallSupliers();
    });

    return {
      pname,
      pcost,
      pbuyingprice,
      pbuyingdate,
      pdescription,
      PNoItems,
      pcategory,
      supplier,
      data,
      Pvat,
      punit,
      searchQuery,
      isModalOpen,
      currentProduct,
      addinventory,
      openModal,
      closeModal,
      confirmDelete,
      updateProduct,
      CategoryStore,
      categ,
      productSearch,
      filteredProducts,
      formatCurrency,
      supplierdata,
      fieldRefs,
      errors,
      validateForm,
      isFormValid
    };
  }
};
</script>


<style>
/* Custom scrollbar for modal */
.modal-content::-webkit-scrollbar {
  width: 8px;
}
.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.modal-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}
.modal-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>