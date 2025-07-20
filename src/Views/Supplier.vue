<template>
  <div class="rounded-lg border border-gray-200 bg-gray-300 h-full">
    <div class="overflow-x-auto rounded-t-lg py-1 px-1 space-y-2 mt-2">

      <div class="relative mb-3 flex flex-wrap items-center gap-3 px-2">

        <span class="text-2xl font-semibold ml-2 flex-grow min-w-[150px]">My Suppliers</span>

        <a
          @click="openModal"
          class="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Add new Supplier
        </a>

        <div class="relative flex-grow min-w-[150px] max-w-xs ml-auto">
          <label for="Search" class="sr-only">Search</label>
          <input
            v-model="searchQuery"
            id="Search"
            @input="supplierSearch"
            type="text"
            placeholder="Search your...suppliers"
            class="w-full rounded-md border border-gray-300 py-2.5 pr-10 shadow-sm text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <span class="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-100 mt-4 text-sm rounded">
          <thead class="divide-y divide-gray-400">
            <tr>
              <th class="whitespace-nowrap px-2 py-1 font-medium text-gray-900">Supplier ID</th>
              <th class="whitespace-nowrap px-4 py-1 font-medium text-gray-900">Supplier Name</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Supplier type</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Contact</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 hidden sm:table-cell">
                Contract start date
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 hidden sm:table-cell">
                Contract End date
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 hidden md:table-cell">
                Contract Status
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 ml-0">
            <tr v-for="(item, index) in supplierdata" :key="index">
              <td class="whitespace-nowrap px-2 py-2 text-gray-700">{{ item.supplierId }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.supplierName }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.supplierType }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.phone }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700 hidden sm:table-cell">
                {{ item.contractStartDate }}
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700 hidden sm:table-cell">
                {{ item.contractEndDate }}
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700 hidden md:table-cell">
                {{ item.supplierStatus }}
              </td>
              <td>
                <router-link :to="{ path: `/supplies/${item.supplierId}` }">..</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-y-auto p-4"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto"
      >
        <div class="relative flex items-center justify-center mb-4">
          <p class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center">
            ADD NEW SUPPLIER
          </p>
          <button
            @click="closeModal"
            class="absolute right-0 top-0 bg-black text-white px-3 py-1 rounded hover:bg-gray-700 transition"
          >
            x
          </button>
        </div>

        <div class="py-6 space-y-6 rounded-md border border-gray-300 px-2 sm:px-6">
          <section>
            <h3 class="text-lg font-semibold mb-2">Supplier Information</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm mb-1">Supplier Name</label>
                <input v-model="supplierName" class="w-full border rounded p-2" type="text" />
              </div>
              <div>
                <label class="block text-sm mb-1">Supplier Type</label>
                <input v-model="supplierType" class="w-full border rounded p-2" type="text" />
              </div>
              <div>
                <label class="block text-sm mb-1">Industry</label>
                <input v-model="industry" class="w-full border rounded p-2" type="text" />
              </div>
              <div>
                <label class="block text-sm mb-1">KRA PIN</label>
                <input v-model="krapin" class="w-full border rounded p-2" type="text" />
              </div>
              <div>
                <label class="block text-sm mb-1">Business License Number</label>
                <input v-model="businessLicenseNumber" class="w-full border rounded p-2" type="text" />
              </div>
              <div>
                <label class="block text-sm mb-1">Supplier Status</label>
                <select
                  id="select"
                  v-model="supplierStatus"
                  name="options"
                  class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>True</option>
                  <option>False</option>
                </select>
              </div>
            </div>
          </section>

          <!-- Contact Details -->
          <section>
            <h3 class="text-lg font-semibold mb-2">Contact Details</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm mb-1">Name</label>
                <input v-model="fullname" class="w-full border rounded p-2" type="text" />
              </div>
              <div>
                <label class="block text-sm mb-1">Email</label>
                <input v-model="email" class="w-full border rounded p-2" type="email" />
              </div>
              <div>
                <label class="block text-sm mb-1">Phone</label>
                <input v-model="phone" class="w-full border rounded p-2" type="tel" />
              </div>
            </div>
          </section>

          <!-- Address Details -->
          <section>
            <h3 class="text-lg font-semibold mb-2">Address Details</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm mb-1">Location Name</label>
                <input v-model="locationName" class="w-full border rounded p-2" type="text" />
              </div>
              <div>
                <label class="block text-sm mb-1">Town</label>
                <input v-model="town" class="w-full border rounded p-2" type="text" />
              </div>
              <div>
                <label class="block text-sm mb-1">Postal</label>
                <input v-model="postal" class="w-full border rounded p-2" type="text" />
              </div>
            </div>
          </section>

          <!-- Contract Details -->
          <section>
            <h3 class="text-lg font-semibold mb-2">Contract Details</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm mb-1">Contract Start Date</label>
                <input v-model="contractStartDate" class="w-full border rounded p-2" type="date" />
              </div>
              <div>
                <label class="block text-sm mb-1">Contract End Date</label>
                <input v-model="contractEndDate" class="w-full border rounded p-2" type="date" />
              </div>
              <div>
                <label class="block text-sm mb-1">Supplier Status</label>
                <select
                  id="select"
                  v-model="supplierStatus"
                  name="options"
                  class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>True</option>
                  <option>False</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        <div class="mt-6 flex justify-center">
          <button
            @click="saveSupplier"
            class="rounded bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800"
          >
            Submit
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
    const inventorystore  = UseInventoryStore();

    const supplierdata  = computed(()=>suppliersstore.filterSuppliers);

   const   pochilaiashara = ref();
   const   TillNo= ref();
   const   paybillaccountNumber= ref();
   const   paybill= ref();
   const   BankaccountNumber= ref();
   const   BankBrach= ref();
   const   BankName= ref();
   const   contractStartDate= ref();
   const   contractEndDate= ref();
   const   contractterms= ref();
   const   locationName= ref();
   const   town= ref();
   const   postal= ref();
   const   phone= ref();
   const   email= ref();
   const   Cname= ref();
   const   category= ref();
   const   COname= ref();
   const   industry= ref();
   const   supplierType= ref();
   const   supplierStatus =ref();
   const   supplierName= ref();
   const   supplierId= ref();
   const  fullname = ref('');
   const productcategory = ref('');
   const  productname = ref('');
   const businessLicenseNumber = ref('');
   const krapin = ref('');
   const NewsupplierStatus = ref('');


   onMounted(()=> {
    suppliersstore.getallSupliers();
   });

  watch(() => errorState.message, (newVal) => {
					  if (newVal) {
  if(errorState.code === 401){
    router.push('/login');
      ErrorMessage(`Errork: 'Session expired logn again'`);
  }
      ErrorMessage(`Errork: ${errorState.code} - ${newVal}`);
    }
  });

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

      


  const openModal = () => { 
      isModalOpen.value = true;
    console.log(isModalOpen.value);

  }

  const closeModal = () => {
      isModalOpen.value = false;
  } 

  const openSupplies =(supplierid) => {
    // router.push('/supplies');
    console.log("hehehe");
    router.push({ name: 'supplies', params: { id: supplierid } });

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
      ErrorMessage,
      suppliersstore,
      isModalOpen,
      openModal,
      closeModal,
      AddSupplier,
      krapin,
      businessLicenseNumber,
      supplierSearch,
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
      Cname,
      category,
      COname,
      industry,
      supplierType,
      supplierName,
      supplierId,
      productcategory,
      productname,
      supplierdata,
      NewsupplierStatus,
      openSupplies
    }
  }
};
</script>