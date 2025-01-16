<template>

  <div class="rounded-lg border border-gray-200  bg-gray-300 h-full">
      <div class="overflow-x-auto rounded-t-lg py-1 px-1 space-y-2 mt-2">
    
    
    <div class="relative mb-3">
      <a @click="openModal" class="inline-block rounded  bg-blue-600 px-2 py-2  mr-2 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring focus:ring-yellow-400"> 
          Add new Supplier
        </a> 
      <span class="text-2xl ml-8">My Suppliers</span>
      <label for="Search" class="sr-only"> Search </label>
    
      <!-- <input type="text" id="Search" placeholder="Search for...anything" class="w-1/33 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm absolute right-0"/> -->
      <input v-model="searchQuery" id="Search" @input="supplierSearch" type="text"  placeholder="Search your...suppliers" class="w-1/4 rounded-md border-gray-200 py-2.5 mr-2 shadow-sm sm:text-sm absolute right-0"/>
      <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="button" class="text-gray-600 hover:text-gray-700">
          <svg    xmlns="http://www.w3.org/2000/svg"  fill="none"  viewBox="0 0 24 24"  stroke-width="1.5"  stroke="currentColor"  class="size-4">
          <path   stroke-linecap="round"       stroke-linejoin="round"   d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </span>
     
    </div>



    <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-100 mt-4 text-sm rounded">
      <thead class="divide-y divide-gray-400">
        <tr>
          <th class="whitespace-nowrap px-2 py-1 font-medium text-gray-900">Supplier ID</th>
          <th class="whitespace-nowrap px-4 py-1 font-medium text-gray-900">Supplier Name</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Suplier type</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Contact</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Contract start date</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Contract End date<</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Contract Status</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>



        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200 ml-5">
        

        <tr v-for="(item, index) in supplierdata" :key="index" >  
        <!-- @click="openSupplies(item.supplierId)"> -->
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.supplierId	 }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.supplierName	 }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.supplierType	 }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.phone	}}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.contractStartDate	 }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.contractEndDate		 }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item. supplierStatus}}</td>
          <td>
          <router-link :to="{path : `/supplies/${item.supplierId}`}">
            ..
         </router-link> 
        </td>
        </tr>

  
      </tbody>
    </table>
  </div>

  <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-y-auto">
   <div class="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full max-h-screen h-screen overflow-y-auto  ">
   <div class="relative flex items-center justify-center">
      <p class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center">ADD NEW SUPPLIER</p>
      <button @click="closeModal" class="absolute right-0 bg-black text-white px-1 rounded">x</button>
    </div>

    <div class="py-6 space-y-6 rounded-md border border-gray-300 px-6">
  <section>
    <h3 class="text-lg font-semibold">Supplier Information</h3>
    <div class="grid grid-cols-3 gap-4 ">
      <div>
        <label class="block text-sm">Supplier Name</label>
        <input v-model="supplierName" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">Supplier Type</label>
        <input v-model="supplierType" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">Industry</label>
        <input v-model="industry" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">KRA PIN</label>
        <input v-model="krapin" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">Business License Number</label>
        <input v-model="businessLicenseNumber" class="w-full border rounded p-2" type="text">
      </div>
      
      <div>
        <label class="block text-sm">Supplier Status</label>
        <select id="select" v-model="supplierStatus" name="options" class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option>True</option>
          <option>False</option>
        </select>
      </div>
    </div>
  </section>  

  <!-- Product Information -->
  <!-- <section>
    <h3 class="text-lg font-semibold mb-2">Product Information</h3>
    <div class="grid grid-cols-3 gap-4 ">
      <div>
        <label class="block text-sm">Product Name</label>
        <input v-model="productname" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">Category</label>
        <input v-model="productcategory" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">SKU</label>
        <input v-model="sku" class="w-full border rounded p-2" type="text">
      </div>
    </div>
  </section> -->

  <!-- Contact Details -->
  <section>
    <h3 class="text-lg font-semibold mb-2">Contact Details</h3>
    <div class="grid grid-cols-3 gap-4">
      <div>
        <label class="block text-sm">Name</label>
        <input v-model="fullname" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">Email</label>
        <input v-model="email" class="w-full border rounded p-2" type="email">
      </div>
      <div>
        <label class="block text-sm">Phone</label>
        <input v-model="phone" class="w-full border rounded p-2" type="tel">
      </div>
    </div>
  </section>

  <!-- Address Details -->
  <section>
    <h3 class="text-lg font-semibold mb-2">Address Details</h3>
    <div  class="grid grid-cols-3 gap-4">
      <div>
        <label class="block text-sm">Location Name</label>
        <input v-model="locationName" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">Town</label>
        <input v-model="town" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">Postal</label>
        <input v-model="postal" class="w-full border rounded p-2" type="text">
      </div>
    </div>
  </section>

     <!-- Contract Details -->
  <section>
    <h3 class="text-lg font-semibold mb-2">Contract Details</h3>
    <div class="grid grid-cols-3 gap-4">
      <div>
        <label class="block text-sm">Contract Start Date</label>
        <input v-model="contractStartDate" class="w-full border rounded p-2" type="date">
      </div>
      <div>
        <label class="block text-sm">Contract End Date</label>
        <input v-model="contractEndDate" class="w-full border rounded p-2" type="date">
      </div>
      <div>
        <label class="block text-sm">Terms</label>
        <textarea v-model="contractterms" class="w-full border rounded p-2"></textarea>
      </div>
    </div>
  </section>

  <!-- Payment Details -->
  <section>
    <h3 class="text-lg font-semibold mb-2">Payment Details</h3>
    <!-- <div class="space-y-4"> -->
      <div  class="grid grid-cols-3 gap-2">
      <div>
        <label class="block text-sm">Bank Name</label>
        <input  v-model="BankName" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">Bank Branch</label>
        <input  v-model="BankBrach" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">Bank Account Number</label>
        <input v-model="BankaccountNumber" class="w-full border rounded p-2" type="text">
      </div>
    </div>  

    <div  class="grid grid-cols-2 gap-2 mt-3">
      <div>
        <label class="block text-sm">Mpesa paybill</label>
        <input v-model="paybill" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">Account Number</label>
        <input v-model="paybillaccountNumber" class="w-full border rounded p-2" type="text">
      </div>
    </div>

    <div  class="grid grid-cols-2 gap-2 mt-3">
      <div>
        <label class="block text-sm">Mpesa TillNo</label>
        <input v-model="TillNo" class="w-full border rounded p-2" type="text">
      </div>
      <div>
        <label class="block text-sm">Pochi la Biashara</label>
        <input v-model="pochilaiashara" class="w-full border rounded p-2" type="text">
      </div>
    </div>

  </section>


</div>

<!-- Modal Footer -->
<div class="flex justify-end border-t pt-4">
  <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancel</button>
  <button @click="AddSupplier" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
</div>
</div>
 </div>
  <!-- modal to add supplier end -->

 
  </div>
</template>  

<script>
import { useRoute } from 'vue-router';
import { useSuppliersStore } from '../store/SuppliersStore';
import {computed, onMounted, ref} from 'vue';

export default {
  setup() {
    const router = useRoute();
    const suppliersstore = useSuppliersStore();
    const isModalOpen = ref(false); 
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

   
    return {
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