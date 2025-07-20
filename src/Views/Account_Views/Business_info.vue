<template>
  <section class="flex-1 p-2 sm:p-6 md:p-7 w-full md:w-3/4">
    <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-2">
        <h1 class="text-xl md:text-2xl font-semibold">Business Details</h1>
        <button @click="openModal()" class="bg-orange-500 text-white px-2 py-2 rounded-lg w-1/2 md:w-auto text-center">
            Update Details
        </button>
        </div>


    <!-- Subtext -->
    <p class="text-gray-500 mt-2 text-sm sm:text-base">
      Manage your Business information, here
    </p>


    <!-- Info Cards -->
    <div v-for="biz in data" :key="biz.businessID" class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Business Name</p>
        <p class="text-base sm:text-lg font-semibold">{{ biz.businessName }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Industry/Nature of Business</p>
        <p class="text-base sm:text-lg font-semibold">{{ biz.industry }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Physical Address</p>
        <p class="text-base sm:text-lg font-semibold">{{ biz.physicalAddress }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Phone Number</p>
        <p class="text-base sm:text-lg font-semibold">{{ biz.phoneNumber }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">KRA PIN</p>
        <p class="text-base sm:text-lg font-semibold">{{ biz.krapin }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Number of Employees</p>
        <p class="text-base sm:text-lg font-semibold">{{ biz.numberOfEmployees }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Mpesa Till</p>
        <p class="text-base sm:text-lg font-semibold">{{ biz.mpesaTill }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Bank Account No</p>
        <p class="text-base sm:text-lg font-semibold">{{ biz.bankAccountNumber }}</p>
      </div>
      <div class="col-span-1 sm:col-span-2 bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Business Email</p>
        <p class="text-base sm:text-lg font-semibold">{{ biz.businessEmail }}</p>
      </div>
    </div>



<!-- edit business details -->
<div v-if="isModalOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeModal">

      <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Edit Business Details</h3>
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
            <label class="block text-sm font-medium text-gray-700">Business Name <span class="text-red-500">*</span></label>
            <input 
              v-model="businessName" 
              type="text" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
            />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Industry/Nature of Business <span class="text-red-500">*</span></label>
            <input 
              v-model="bIndustry" 
              type="text" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
            />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Physical Address</label>
            <input 
              v-model="businessAddress" 
              type="text" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
            />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input 
              v-model="businessMobile" 
              type="number" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
            />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">KRA PIN <span class="text-red-500">*</span></label>
            <input 
              v-model="businessKraPin" 
              type="text" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
            />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Number of Employees <span class="text-red-500">*</span></label>
            <input 
              v-model="businessNoEmployess" 
              type="number" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
            />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Mpesa Till <span class="text-red-500">*</span></label>
            <input 
              v-model="businessMpesatill" 
              type="test" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
            />
          </div>

         

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Bank Account No<span class="text-red-500">*</span></label>
            <input 
              v-model="businessBankAccountNo" 
              type="number" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
            />
          </div>

            <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Business Email<span class="text-red-500">*</span></label>
            <input 
              v-model="businessEmail" 
              type="text" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
            />
          </div>

        

       
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button  @click="closeModal" 
            class="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
            > Cancel
          </button>
          <button 
            @click="EditBusinessDetails"
            class="px-4 py-2.5 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
            > Edit Business Details
          </button>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { onMounted, computed, watch, ref,reactive } from 'vue';
import { useAccountStore } from '../../store/AccountStore';
import Swal from 'sweetalert2'; 
import {useRouter } from 'vue-router'
import { errorState } from '../../store/ErrorState';
export default {
  setup() { 
    const isModalOpen = ref(false); 
    const	businessName = ref('');
		const	bIndustry  = ref('');
		const	businessAddress  = ref('');
		const	businessMobile  = ref('');
		const	businessKraPin  = ref('');
		const	businessNoEmployess  = ref('');
		const	businessMpesatill  = ref('');
		const	businessBankAccountNo  = ref('');
    const businessEmail = ref('');
    const errors = reactive({})
    const router = useRouter(); 
    const acountStore  = useAccountStore();


    const data = computed(() => acountStore.getBusinessDetails);  

      onMounted(()=>{ 
        let token = localStorage.getItem('token');
        acountStore.fetchBusinessDetails(token);
      }); 

        const openModal = () => { 
          BindDetails();
          isModalOpen.value = true;
        };
        
        const closeModal = () => {
          isModalOpen.value = false;
         }; 

        const BindDetails = () => {

          data.value.forEach(item => {
            
            businessName.value = item.businessName
            bIndustry.value =  item.industry
            businessAddress.value = item.physicalAddress
            businessMobile.value = item.phoneNumber
            businessKraPin.value = item.krapin
            businessNoEmployess.value = item.numberOfEmployees
            businessMpesatill.value = item.mpesaTill
            businessBankAccountNo.value = item.bankAccountNumber
            businessEmail.value = item.businessEmail
          });

        }

         const validateForm = () => {
            errors.businessName = businessName.value ? '' : 'Business name is required'
            errors.bIndustry = bIndustry.value ? '' : 'Industry is required'
            errors.businessAddress = businessAddress.value ? '' : 'Address is required'
            errors.businessMobile = businessMobile.value ? '' : 'Mobile number is required'
            errors.businessKraPin = businessKraPin.value ? '' : 'KRA PIN is required'
            errors.businessNoEmployess = businessNoEmployess.value ? '' : 'Number of employees is required'
            errors.businessMpesatill = businessMpesatill.value ? '' : 'Mpesa till is required'
            errors.businessBankAccountNo = businessBankAccountNo.value ? '' : 'Bank account number is required'
            errors.businessEmail = businessEmail.value ? '' : 'Email is required'

            if (businessEmail.value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(businessEmail.value)) {
              errors.businessEmail = 'Invalid email format'
            }

            // Check if all fields are valid 
            return Object.values(errors).every((err) => err === '')
          }

       const EditBusinessDetails = () => {
         if (validateForm()) {

        const postData = { 
          businessName: businessName.value,
          industry: bIndustry.value,
          physicalAddress: businessAddress.value,
          phoneNumber: businessMobile.value,
          krapin: businessKraPin.value,
          numberOfEmployees: businessNoEmployess.value,
          mpesaTill: businessMpesatill.value,
          bankAccountNumber: businessBankAccountNo.value,
          businessEmail :businessEmail.value
        };
          let token = localStorage.getItem('token');
          acountStore.EditBusinessDetails(postData,token);


      }
    }


       watch(() => errorState.message, (newVal) => {
        if (newVal) {
      if(errorState.code === 401){
        router.push('/login');
          ErrorMessage(`Errork: 'Session expired logn again'`);
      }
          ErrorMessage(`Errork: ${errorState.code} - ${newVal}`);
        }
     });

      const ErrorMessage = (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        confirmButtonColor: '#3b82f6',
      })
    }
    
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

    return {

      data,
      acountStore,
      DisplayMessage,
      ErrorMessage,
      openModal,
      closeModal,
      isModalOpen,
      businessName,
			bIndustry,
			businessAddress,
			businessMobile,
			businessKraPin,
			businessNoEmployess,
			businessMpesatill,
			businessBankAccountNo,
      businessEmail,
      validateForm,
      EditBusinessDetails,
      BindDetails,
      errors,
      router 
    };
  }
};
</script>
