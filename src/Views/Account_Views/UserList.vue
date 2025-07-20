<template>
  <section class="flex-1 w-full lg:p-2 md:p-1 rounded-lg shadow-lg relative">
      <span class="text-xl sm:text-2xl font-semibold sm:text-left px-1">Users</span>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <button class="bg-orange-500 text-white px-4 py-2 rounded-lg self-end sm:self-auto" @click="openUserModal">
            Add User
        </button>
        </div>
    <!-- User Details -->
    <div class="rounded-lg shadow-lg p-4 sm:p-6 bg-gray-200 ">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div class="relative w-full sm:w-auto">
          <input type="text" placeholder="Search user..." class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">User Name</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">Email</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">Role In</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">phone Number</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">Is loggedIn</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in data" :key="user.userid">
              <td class="px-4 py-3 whitespace-nowrap">{{ user.userName }}</td>
              <td class="px-4 py-3 whitespace-nowrap">{{ user.email }}</td>
              <td class="px-4 py-3 whitespace-nowrap">{{ user.roleName }}</td>
              <td class="px-4 py-3 whitespace-nowrap">{{ user.phoneNumber }}</td>
              <td class="px-4 py-3 whitespace-nowrap">{{ user.isLoggedIn }}</td>

              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex gap-2">
                  <button class="text-blue-600 hover:text-blue-800">Edit</button>
                  <button @click="removeUser(user.userid)" class="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="isModalOpen"
      class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <p class="text-lg font-semibold uppercase text-gray-700">Add User</p>
          <button @click="closeUserModal" class="bg-black text-white px-2 py-1 rounded">x</button>
        </div>

        <form class="space-y-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-900">Username</label>
            <input
              v-model="userName"
              type="text"
              placeholder="Enter username"
              class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-900">Email Address</label>
            <input
              v-model="email"
              type="email"
              placeholder="name@example.com"
              class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div> 

            <div>
            <label class="block mb-1 text-sm font-medium text-gray-900">Phone No</label>
            <input
              v-model="phoneNumber"
              type="number"
              placeholder=""
              class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              required  />
          </div>

           <div>
            <label class="block mb-1 text-sm font-medium text-gray-900">Role</label>
             <select  v-model="roleName" 
              class="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all">
              <option value="Cashier" >Cashier</option>
              <option value="Guest" >Guest</option>
    
            </select>
            </div>

          <!-- <div>
            <label class="block mb-1 text-sm font-medium text-gray-900">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div> -->

          <div class="pt-2">
            <button
              type="button"
              @click="AddNewUser"
              class="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>

      
    </div>



  </section>
</template>



<script>
import { onMounted, computed, watch, ref,reactive } from 'vue';
import { useAccountStore } from '../../store/AccountStore';
import Swal from 'sweetalert2'; 
import { errorState } from '../../store/ErrorState';
import {useRouter } from 'vue-router'
export default {
  setup() { 
    const isModalOpen = ref(false); 

    const	userName = ref('');
		const	email  = ref('');
		const	roleName  = ref('');
		const	phoneNumber  = ref('');
		// const	password  = ref('');
    const errors = reactive({})
    const router = useRouter(); 
    const acountStore  = useAccountStore();
    const data = computed(() => acountStore.getUsers);  

      onMounted(()=>{ 
        let token = localStorage.getItem('token');
        acountStore.fetchUsers(token);
      }); 

       watch(() =>  acountStore.getResponse, (newval) => {
            if (newval.status == 200) { 
               DisplayMessage("success", newval.statusMessage);
            } 
            else{
              DisplayMessage("error", newval.statusMessage);
            }

        }); 

        const openUserModal = () => { 
          // BindDetails();
          isModalOpen.value = true;
        };
        
        const closeUserModal = () => {
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
            // errors.password = password.value ? '' : 'Password is required'
            errors.phoneNumber = phoneNumber.value ? '' : 'Phone Number is required'
            errors.roleName = roleName.value ? '' : 'role is required'
            errors.userName = userName.value ? '' : 'Username is required'
            errors.email = email.value ? '' : 'Email is required'

            if (email.value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
              errors.email = 'Invalid email format'
            }

            // Check if all fields are valid
            return Object.values(errors).every((err) => err === '')
          }

       const AddNewUser = () => {
        if (validateForm()) {

        const postData = { 
            userName : userName.value,
            email : email.value,
            roleName : roleName.value,
            phoneNumber : phoneNumber.value.toString(),
            password : "pass123"//password.value
          };
          let token = localStorage.getItem('token');
          acountStore.AddnewUser(postData,token);
        } 
             ErrorMessage(`Error: ${Object.values(errors).join(', ')}`);
       }

       const removeUser = (userid) => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {  

                  DeleteUser(userid);
                }
              });
       } 

       const DeleteUser = (userid) => { 
          let token = localStorage.getItem('token');
          acountStore.DeleteUserAsync(userid,token)
              Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
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

      closeUserModal();
      userName.value= "";
      email.value= "";
      roleName.value= "";
      phoneNumber.value= "";
      let token = localStorage.getItem('token');
        acountStore.fetchUsers(token);

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
      openUserModal,
      closeUserModal,

      isModalOpen,
      userName,
      email,
      roleName,
      phoneNumber,
      // password,
router,
      validateForm,
      removeUser,
      AddNewUser,
      BindDetails,
      errors 
    };
  }
};
</script>
