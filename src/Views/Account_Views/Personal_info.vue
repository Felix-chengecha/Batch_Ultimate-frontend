<template>
  <section class="flex-1 p-1 w-full md:w-3/4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 class="text-xl sm:text-2xl font-semibold">Personal information</h1>
      </div>

      <!-- Subtext -->
      <p class="text-gray-500 mt-2 text-sm sm:text-base">
        Manage your personal information, including phone numbers and email address.
      </p>
      <!-- Info Cards -->
      <div v-for="user in data" :key="user.userId" class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">

        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 text-sm">Full Name</p>
          <p class="text-base sm:text-lg font-semibold">{{ user.userName }}</p>
        </div>
        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 text-sm">Phone Number</p>
          <p class="text-base sm:text-lg font-semibold">{{ user.phoneNumber }}</p>
        </div>
        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          
          <p class="text-gray-500 text-sm">Created On</p>
          <p class="text-base sm:text-lg font-semibold">{{ formatDate(user.createdOn) }} </p>

        </div>
        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 text-sm">Role</p>
          <p class="text-base sm:text-lg font-semibold">{{ user.roleName }}</p>
        </div>
        <div class="col-span-1 md:col-span-2 bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Email Address</p>
          <p class="text-base sm:text-lg font-semibold">{{ user.email }}</p>

        </div>
        
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
    const router = useRouter(); 

    const data = computed(() => acountStore.getPersonalDetails);  

      onMounted(()=>{ 
        let token = localStorage.getItem('token');
        let userid = localStorage.getItem('userid');
        let username = localStorage.getItem('username');
        acountStore.fetchPersonalDetails(token,userid);
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
      formatDate,
      router
    };
  }
};
</script>
