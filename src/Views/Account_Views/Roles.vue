<template>
  <section class="w-full p-1 sm:p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
      <h1 class="text-xl sm:text-2xl font-bold">Roles</h1>
    </div>

    <!-- Roles Section -->
    <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <!-- Title + Search -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div class="relative w-full sm:w-auto">
          <input
            type="text"
              v-model="search" 
            placeholder="Search roles..."
            class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <svg
            class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <!-- New Role -->
      <!-- <div class="mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
              v-model="RoleName" 
            placeholder="New role name"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <button @click="CreateRole" 
             class="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
            >Create Role
          </button>
        </div>
      </div> -->
      <!-- Roles Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-gray-50 border-b text-xs uppercase text-gray-500">
              <th class="px-4 py-3 text-left font-medium tracking-wider">Role Name</th>
              <th class="px-4 py-3 text-left font-medium tracking-wider">Accesslevel</th>
              <th class="px-4 py-3 text-left font-medium tracking-wider">Created On</th>
              <th class="px-4 py-3 text-left font-medium tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="role in data" :key="role.roleid">
              <td class="px-4 py-4 whitespace-nowrap">{{ role.roleName }}</td>
              <td class="px-4 py-4 whitespace-nowrap">{{ role.accessLevel }}</td>
              <td class="px-4 py-4 whitespace-nowrap">{{ formatDate(role.createdOn) }}</td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex space-x-3">
                  <button class="text-blue-600 hover:text-blue-800">Edit</button>
                  <button class="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </td>
            </tr>
            <!-- <tr>
              <td class="px-4 py-4 whitespace-nowrap">Editor</td>
              <td class="px-4 py-4 whitespace-nowrap">8 permissions</td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex space-x-3">
                  <button class="text-blue-600 hover:text-blue-800">Edit</button>
                  <button class="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </td>
            </tr> -->
          </tbody>
        </table>
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
    const RoleName = ref('');

    const data = computed(() => acountStore.getRoles);  

      onMounted(()=>{ 
        let token = localStorage.getItem('token');
        acountStore.fetchRoles(token);
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
      RoleName,
      router
    };
  }
};
</script>
