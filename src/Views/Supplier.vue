<template>
  <div class="rounded-xl border border-gray-200 bg-white h-full shadow-sm">
    <!-- Header Section -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">My Suppliers</h1>
          <p class="text-sm text-gray-500 mt-1">Manage your supplier relationships</p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div class="relative flex-grow">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              id="Search"
              @input="supplierSearch"
              type="text"
              placeholder="Search suppliers..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            @click="openModal(null)"
            class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Supplier
          </button>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Start Date</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">End Date</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in supplierdata" :key="index" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{{ item.supplierId }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.supplierName }}</div>
                <div class="text-xs text-gray-500">{{ item.industry }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.supplierType }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ item.phone }}</div>
                <div class="text-xs text-gray-500">{{ item.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                {{ formatDate(item.contractStartDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                {{ formatDate(item.contractEndDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <span :class="{
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                  'bg-green-100 text-green-800': item.supplierStatus === true,
                  'bg-red-100 text-red-800': item.supplierStatus === false
                }">
                  {{ item.supplierStatus ? 'Active' : 'Inactive' }}
                </span>
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
                  <router-link 
                    :to="{ path: `/supplies/${item.supplierId}` }"
                    class="text-gray-600 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-50 transition-colors"
                    title="View Details"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr v-if="supplierdata.length === 0">
              <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">
                <div class="flex flex-col items-center justify-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p class="mt-2 text-sm font-medium text-gray-600">No suppliers found</p>
                  <p class="text-xs text-gray-500 mt-1">Try adjusting your search or add new suppliers</p>
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
      <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ currentSupplier ? 'Edit Supplier' : 'Add New Supplier' }}
          </h3>
          <button 
            @click="closeModal" 
            class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <!-- Supplier Information -->
          <div class="rounded-lg border border-gray-200 p-4">
            <h4 class="text-md font-medium text-gray-700 mb-3">Supplier Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Supplier Name *</label>
                <input 
                  v-model="supplierName" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Supplier Type *</label>
                <input 
                  v-model="supplierType" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <input 
                  v-model="industry" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">KRA PIN</label>
                <input 
                  v-model="krapin" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Business License</label>
                <input 
                  v-model="businessLicenseNumber" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  v-model="supplierStatus"
                  class="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                >
                  <option :value="true">Active</option>
                  <option :value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Contact Details -->
          <div class="rounded-lg border border-gray-200 p-4">
            <h4 class="text-md font-medium text-gray-700 mb-3">Contact Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input 
                  v-model="fullname" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  v-model="email" 
                  type="email" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input 
                  v-model="phone" 
                  type="tel" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                  required
                />
              </div>
            </div>
          </div>

          <!-- Address Details -->
          <div class="rounded-lg border border-gray-200 p-4">
            <h4 class="text-md font-medium text-gray-700 mb-3">Address Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
                <input 
                  v-model="locationName" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Town</label>
                <input 
                  v-model="town" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input 
                  v-model="postal" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
            </div>
          </div>

          <!-- Contract Details -->
          <div class="rounded-lg border border-gray-200 p-4">
            <h4 class="text-md font-medium text-gray-700 mb-3">Contract Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input 
                  v-model="contractStartDate" 
                  type="date" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input 
                  v-model="contractEndDate" 
                  type="date" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contract Terms</label>
                <input 
                  v-model="contractterms" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
            </div>
          </div>

          <!-- Payment Details -->
          <div class="rounded-lg border border-gray-200 p-4">
            <h4 class="text-md font-medium text-gray-700 mb-3">Payment Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <input 
                  v-model="BankName" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <input 
                  v-model="BankaccountNumber" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <input 
                  v-model="BankBrach" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Paybill Number</label>
                <input 
                  v-model="paybill" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Paybill Account</label>
                <input 
                  v-model="paybillaccountNumber" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Till Number</label>
                <input 
                  v-model="TillNo" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button 
            @click="closeModal" 
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="currentSupplier ? updateSupplier() : AddSupplier()" 
            class="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
          >
            {{ currentSupplier ? 'Update Supplier' : 'Add Supplier' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useSuppliersStore } from '../store/SuppliersStore';
import {UseInventoryStore} from '../store/InventoryStore'
import {computed, onMounted, watch, ref} from 'vue';
import { errorState } from '../store/ErrorState';

export default {
  setup() {
    const router = useRoute();
    const suppliersstore = useSuppliersStore();
    const isModalOpen = ref(false); 
    const currentSupplier = ref(null);
    const searchQuery = ref('');

    // Form fields
    const pochilaiashara = ref('');
    const TillNo = ref('');
    const paybillaccountNumber = ref('');
    const paybill = ref('');
    const BankaccountNumber = ref('');
    const BankBrach = ref('');
    const BankName = ref('');
    const contractStartDate = ref('');
    const contractEndDate = ref('');
    const contractterms = ref('');
    const locationName = ref('');
    const town = ref('');
    const postal = ref('');
    const phone = ref('');
    const email = ref('');
    const fullname = ref('');
    const category = ref('');
    const COname = ref('');
    const industry = ref('');
    const supplierType = ref('');
    const supplierStatus = ref(true);
    const supplierName = ref('');
    const businessLicenseNumber = ref('');
    const krapin = ref('');
    const NewsupplierStatus = ref('');

    const supplierdata = computed(() => suppliersstore.filterSuppliers);

    onMounted(() => {
      suppliersstore.getallSupliers();
    });

    const formatDate = (dateString) => {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

   watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   DisplayMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		    }) 

   const AddSupplier =() => { 
    const now = new Date();

    // Extract date components
    const day = ref(now.getDate()); // Day of the month (1-31)
    const month = ref(now.getMonth() + 1); // Month (0-11, so +1 for 1-12)
    const year = ref(now.getFullYear()); // Year (e.g., 2024)

    // Extract time components
    const hour = ref(now.getHours()); // Hour (0-23)
    const minute = ref(now.getMinutes()); // Minute (0-59)
    const second = ref(now.getSeconds()); // Second (0-59)

    let SupId = "Sup"+"_"+ month.value + second.value + minute.value + hour.value ;




    const postdata = {
              supplier: [
                {
                  supplierId: SupId,
                  supplierName: supplierName.value,
                  supplierType: supplierType.value,
                  industry: industry.value,
                  krapin: krapin.value,
                  businessLicenseNumber: businessLicenseNumber.value,
                  supplierStatus: true,
                  remarks: "New supplier added",
                  createdBy: "chee",
                  updatedBy: "",
                  email: email.value,
                  phone: phone.value,
                  locationName: locationName.value,
                  town: town.value,
                  postal: postal.value,
                  contractStartDate: contractStartDate.value,
                  contractEndDate: contractEndDate.value,
                  contractTerms: contractterms.value,
                  contractStatus: true,
                  category: productcategory.value,
                  unitMeasure: "kg/ltr",
                  bankName: BankName.value,
                  bank_AccountNumber: BankaccountNumber.value,
                  till: TillNo.value,
                  pochi: pochilaiashara.value,
                  paybill_BusinessNumber: paybill.value,
                  paybill_Account: paybillaccountNumber.value
                }
            ]
    }
      suppliersstore.Addsuplier(postdata);
      NewsupplierStatus .value =  suppliersstore.success;
      console.log(NewsupplierStatus);
   }


     const supplierSearch = (e) => {
      suppliersstore.setSearchSupplier(e.target.value);
    }; 

    const openModal = (supplier) => {
      currentSupplier.value = supplier;
      if (supplier) {
        // Pre-fill form for editing
        supplierName.value = supplier.supplierName;
        supplierType.value = supplier.supplierType;
        industry.value = supplier.industry;
        krapin.value = supplier.krapin;
        businessLicenseNumber.value = supplier.businessLicenseNumber;
        supplierStatus.value = supplier.supplierStatus;
        email.value = supplier.email;
        phone.value = supplier.phone;
        locationName.value = supplier.locationName;
        town.value = supplier.town;
        postal.value = supplier.postal;
        contractStartDate.value = supplier.contractStartDate;
        contractEndDate.value = supplier.contractEndDate;
        contractterms.value = supplier.contractTerms;
        BankName.value = supplier.bankName;
        BankaccountNumber.value = supplier.bank_AccountNumber;
        TillNo.value = supplier.till;
        paybill.value = supplier.paybill_BusinessNumber;
        paybillaccountNumber.value = supplier.paybill_Account;
      } else {
        // Reset form for new supplier
        supplierName.value = '';
        supplierType.value = '';
        industry.value = '';
        krapin.value = '';
        businessLicenseNumber.value = '';
        supplierStatus.value = true;
        email.value = '';
        phone.value = '';
        locationName.value = '';
        town.value = '';
        postal.value = '';
        contractStartDate.value = '';
        contractEndDate.value = '';
        contractterms.value = '';
        BankName.value = '';
        BankaccountNumber.value = '';
        BankBrach.value = '';
        TillNo.value = '';
        paybill.value = '';
        paybillaccountNumber.value = '';
      }
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      currentSupplier.value = null;
    };

    const generateSupplierId = () => {
      const now = new Date();
      const month = now.getMonth() + 1;
      const second = now.getSeconds();
      const minute = now.getMinutes();
      const hour = now.getHours();
      return "Sup_" + month + second + minute + hour;
    };

    const AddSupplier = () => { 
      const supplierId = generateSupplierId();

      const postdata = {
        supplier: [{
          supplierId: supplierId,
          supplierName: supplierName.value,
          supplierType: supplierType.value,
          industry: industry.value,
          krapin: krapin.value,
          businessLicenseNumber: businessLicenseNumber.value,
          supplierStatus: supplierStatus.value,
          remarks: supplierStatus.value ? "New supplier added" : "Supplier added as inactive",
          createdBy: "chee",
          updatedBy: "",
          email: email.value,
          phone: phone.value,
          locationName: locationName.value,
          town: town.value,
          postal: postal.value,
          contractStartDate: contractStartDate.value,
          contractEndDate: contractEndDate.value,
          contractTerms: contractterms.value,
          contractStatus: supplierStatus.value,
          category: category.value,
          unitMeasure: "kg/ltr",
          bankName: BankName.value,
          bank_AccountNumber: BankaccountNumber.value,
          till: TillNo.value,
          pochi: pochilaiashara.value,
          paybill_BusinessNumber: paybill.value,
          paybill_Account: paybillaccountNumber.value
        }]
      };

      suppliersstore.Addsuplier(postdata);
      NewsupplierStatus.value = suppliersstore.success;
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Supplier added successfully',
        showConfirmButton: false,
        timer: 1500
      });

      closeModal();
      suppliersstore.getallSupliers();
    };

    const updateSupplier = () => {
      const postdata = {
        supplier: [{
          supplierId: currentSupplier.value.supplierId,
          supplierName: supplierName.value,
          supplierType: supplierType.value,
          industry: industry.value,
          krapin: krapin.value,
          businessLicenseNumber: businessLicenseNumber.value,
          supplierStatus: supplierStatus.value,
          remarks: "Supplier details updated",
          updatedBy: "chee",
          email: email.value,
          phone: phone.value,
          locationName: locationName.value,
          town: town.value,
          postal: postal.value,
          contractStartDate: contractStartDate.value,
          contractEndDate: contractEndDate.value,
          contractTerms: contractterms.value,
          contractStatus: supplierStatus.value,
          category: category.value,
          bankName: BankName.value,
          bank_AccountNumber: BankaccountNumber.value,
          till: TillNo.value,
          paybill_BusinessNumber: paybill.value,
          paybill_Account: paybillaccountNumber.value
        }]
      };

      suppliersstore.updateSupplier(postdata);
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Supplier updated successfully',
        showConfirmButton: false,
        timer: 1500
      });

      closeModal();
      suppliersstore.getallSupliers();
    };

    return {
      suppliersstore,
      isModalOpen,
      currentSupplier,
      searchQuery,
      openModal,
      closeModal,
      AddSupplier,
      updateSupplier,
      supplierSearch,
      formatDate,
      pochilaiashara,
      TillNo,
      paybillaccountNumber,
      paybill,
      BankaccountNumber,
      BankBrach,
      BankName,
      contractStartDate,
      contractEndDate,
      contractterms,
      locationName,
      town,
      postal,
      phone,
      fullname,
      email,
      category,
      COname,
      industry,
      supplierType,
      supplierStatus,
      supplierName,
      businessLicenseNumber,
      krapin,
      NewsupplierStatus,
      supplierdata
    };
  }
};
</script>

<style>
/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>