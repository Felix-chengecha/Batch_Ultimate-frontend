<template>
  <section class="w-full p-1 sm:p-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
      <h1 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">Teller Management</h1>
      <span class="px-2 sm:px-4 font-semibold text-sm sm:text-base">Date: 12/05/2025</span>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-2 sm:p-4 mt-1">
      <!-- Responsive grid: 1 col on mobile, 2 cols on sm+ -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-1">
        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
         <div class="flex items-center space-x-2">
            <i class="fas fa-users"></i>
            <h3 class="text-gray-600 font-bold text-xs sm:text-lg">No of Cashiers: </h3>
          </div>
          <p class="text-lg items-center ml-5 font-semibold">{{ MoreDetails.count }}</p>
        </div>
        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <div class="flex items-center space-x-2">
          <i class="fas fa-user-check"></i>
          <p class="text-gray-600 font-bold text-xs sm:text-lg">Active Cashiers</p>
          </div>

          <p class="text-lg  ml-5 font-semibold">{{ MoreDetails.openAccountCount }}</p>
        </div>
        <div class="bg-white p-3 sm:p-6 shadow-md rounded-lg">
          <div class="flex items-center space-x-2">
          <i class="fas fa-cash-register"></i>
          <p class="text-gray-600 font-bold text-xs sm:text-lg">Total Income Today</p>
          </div>
          <div class="p-1">
            <p class="text-gray-500 text-xs sm:text-sm">Mpesa : <span class="text-gray-900 font-bold">{{ 0 }}  </span></p>
            <p class="text-gray-500 text-xs sm:text-sm">Cash :<span class="text-gray-900 font-bold">{{ 0 }}  </span> </p>
            <!-- <p class="text-gray-900 font-bold text-xs sm:text-sm">Total : {{ MoreDetails.clearBala }}</p> -->

          </div>
        </div>
        <div class="bg-white p-3 sm:p-6 shadow-md rounded-lg">
          <div class="flex items-center space-x-2">
          <i class="fas fa-money-bill-wave"></i>
          <p class="text-gray-600 font-bold text-xs sm:text-lg">Total Income</p>
          </div>
          <div class="p-2 ">
            <p class="text-gray-500 text-xs sm:text-sm">Clear Balance : <span class="text-gray-900 font-bold">{{ MoreDetails.clearBala }}</span>  </p>
            <p class="text-gray-500 text-xs sm:text-sm">Opening Balance : <span class="text-gray-900 font-bold">{{ MoreDetails.openBal }}</span> </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Make table container scrollable horizontally on small screens -->
    <div class="overflow-x-auto mt-3 rounded-sm">
      <p class="text-gray-700 mt-2 font-semibold p-1 text-sm sm:text-base">Cashier List</p>
      <table class="min-w-full divide-y divide-gray-200  table-auto">
        <thead class="sticky top-0 bg-gray-50">
          <tr class="bg-gray-500 border-white rounded-lg">
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-100 uppercase tracking-wider">AccountID</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-100 uppercase tracking-wider">User Name</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-100 uppercase tracking-wider">Account Status</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-100 uppercase tracking-wider">Opening Balance</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-100 uppercase tracking-wider">Clear Balance</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-100 uppercase tracking-wider">Total</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-100 uppercase tracking-wider">Last update</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-100 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="acc in data" :key="acc.accountId">
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">{{  acc.accountId }}</td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">{{ acc.userName}}</td>
            <!-- <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">{{  acc.accountStatus ? 'Open' : 'Closed'}}</td> -->
             <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base" :class="acc.accountStatus ? 'text-green-600' : 'text-red-600'">
                    {{ acc.accountStatus ? 'Open' : 'Closed' }}</td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">{{  acc.openingBalance}}</td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">{{ acc.clearBalance }}</td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base"> {{ (acc.openingBalance || 0) + (acc.clearBalance || 0) }} </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">{{ extractTime(acc.updatedOn) }}</td>

            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">
              <div class="flex space-x-3">
              <i @click="OpeningBalanceModal(acc)" class="fas fa-money-bill-wave" style="font-size: 1em; color: orange;"></i>
              <i @click="openModalAccountStatusModal(acc)" class="fas fa-check-circle" style="color: blue;"></i>

                <!-- Loading
                <p>Status: <i class="fas fa-spinner fa-spin" style="font-size: 2em;"></i> Loading...</p> -->

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

<!-- modal to upddate account opening balance -->
  <div v-if="isModalOpenOpeningBalance"
      class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <p class="text-lg font-semibold uppercase text-gray-700">Update Account Opening Balance </p>
          <button @click="closeModal" class="bg-black text-white px-2 py-1 rounded">x</button>
        </div>
        <form class="space-y-4">

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-900">Cashier</label>
                <span class="px-4 py-4 border rounded-md w-full inline-block  text-gray-700">
                {{ cashier }}
               </span>
           </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-900">Opening Balance</label>
            <input v-model="OpeningBalance" type="number" placeholder="update opening Balance"
              class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" required />
          </div>
         <div class="flex justify-center items-center">
            <button type="button" @click="UpdateAccountOpeningBalance()"
                    class="w-3/4 items-center bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700">
              Update Opening Balance
            </button>
          </div>
        </form>
      </div>
    </div>


    <!-- modal to update account status -->
<div v-if="isModalOpenAccountStatus"
          class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <p class="text-lg font-semibold uppercase text-gray-700">Update Account Status </p>
          <button @click="closeModalAccountStatus" class="bg-black text-white px-2 py-1 rounded">x</button>
        </div>
        <form class="space-y-4">

             <div>
              <label class="block mb-1 text-sm font-medium text-gray-900">Cashier</label>
                <span class="px-4 py-4 border rounded-md w-full inline-block  text-gray-700">
                {{ cashier }}
               </span>
           </div>

            <div>
            <label class="block mb-1 text-sm font-medium text-gray-900">Account Status</label>
             <select  v-model="AccountStatus" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all">
              <option value="true">Open Account</option>
              <option value="false">Close Account</option>
    
            </select>
            </div>

          <div class="flex justify-center items-center">
            <button type="button" @click="UpdateAccountStatus"  
              class="w-3/4 bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700">
              Update Account Status
            </button>
          </div>
        </form>
      </div>
    </div>


  </section>
</template>


<script>
import { onMounted, computed, watch, ref } from 'vue';
import { useAccountStore } from '../../store/AccountStore';
import Swal from 'sweetalert2'; 
    import {useRouter } from 'vue-router'
import { errorState } from '../../store/ErrorState';
export default {
  setup() { 
    const acountStore  = useAccountStore();
    const isModalOpenOpeningBalance = ref(false); 
    const isModalOpenAccountStatus = ref(false);
    const AccountStatus = ref();
    const OpeningBalance = ref(false);
    const cashier = ref('');
    const AccountID = ref('');


    const router = useRouter(); 
    const data = computed(() => acountStore.getAccountDetails);  

    //get other details
   const MoreDetails = computed(() => {
       let clearBala = 0;
       let openBal = 0;
       let openAccountCount = 0;
       let count = data.value.length;
       const openAccounts = data.value.filter(details => details.accountStatus === true); 
       openAccountCount = openAccounts.length;

       data.value.forEach(details => {
          clearBala += +details.clearBalance; // Increment the total sum
          openBal += +details.openingBalance;
        });
     return { count,clearBala,openAccountCount,openBal }; 
    });


      onMounted(()=>{ 
        let token = localStorage.getItem('token');
        acountStore.fetchAccountDetails(token);
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
      
      watch(() =>  acountStore.getResponse, (newval) => {
        if (newval.status == 200) { 
            DisplayMessage("success", newval.statusMessage);
            closeModalAccountStatus();
            closeModal();
                  let token = localStorage.getItem('token');
                  acountStore.fetchAccountDetails(token);
        } 
        else{
          DisplayMessage("error", newval.statusMessage);
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

      const formatDate =(dateString)=> {
            const cleanDateString = dateString.replace(/(\.\d{3})\d+/, '$1');
            const date = new Date(cleanDateString);
            return date.toISOString().split('T')[0];
          }

      const extractTime = (dateString) => {
        const cleanDateString = dateString.replace(/(\.\d{3})\d+/, '$1'); 
        const date = new Date(cleanDateString);
        const time = date.toISOString().split('T')[1].split('.')[0]; 
        return time; // Return only the time part
      };


      const openModal = () => { 
          isModalOpenOpeningBalance.value = true;
        };
        
      const closeModal = () => {
          isModalOpenOpeningBalance.value = false;
          OpeningBalance.value= "";
          AccountStatus.value = "";
          cashier.value ="";
      }; 

      const openModalAccountStatusModal = (acc) => { 
        isModalOpenAccountStatus.value = true;
            AccountID.value = acc.accountId;
            AccountStatus.value =acc.accountStatus;
            cashier.value = acc.userName;
      };
        
      const closeModalAccountStatus = () => {
        isModalOpenAccountStatus.value = false;
        OpeningBalance.value= "";
        AccountStatus.value = "";
        cashier.value ="";
        }; 

         


    
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
        `  })
      } 

      const OpeningBalanceModal = (acc) =>{
        openModal();
        OpeningBalance.value= acc.openingBalance;
        AccountID.value = acc.accountId;
        cashier.value = acc.userName;
      }

      const UpdateAccountOpeningBalance = () =>{
          const payload = {
             AccountID: AccountID.value,
              Amount:  OpeningBalance.value
          };
           let token = localStorage.getItem('token');
          acountStore.UpdateOpeningBalance(token,payload)
      }

      const UpdateAccountStatus = () =>{ 
        const isAccountActive = AccountStatus.value === "true";
        const payload = {
             AccountID: AccountID.value,
             AccountStatus: isAccountActive
          };
          let token = localStorage.getItem('token');
          acountStore.OpenCloseAccount(token,payload)
      }
      
 
    return {

      data,
      acountStore,
      DisplayMessage,
      ErrorMessage,
      formatDate,
      extractTime,
      MoreDetails,
      isModalOpenOpeningBalance,
      isModalOpenAccountStatus,
      openModal,
      closeModal,
      router,
      cashier,
      openModalAccountStatusModal,
      closeModalAccountStatus,
      OpeningBalanceModal,
      OpeningBalanceModal,
      OpeningBalance,
      AccountStatus,
      UpdateAccountOpeningBalance,
      UpdateAccountStatus
    };
  }
};
</script>

  <style scoped>
   /* Add additional styles if necessary */
   @import 'node_modules/@fortawesome/fontawesome-free/css/all.css';
   </style>