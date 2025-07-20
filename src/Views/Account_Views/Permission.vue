<template>
  <section class="w-full lg:w-full md:p-2 sm:p-4">
    <div class="flex flex-wrap justify-between items-center mb-2 sm:mb-6 gap-2">
      <h1 class="text-xl sm:text-2xl font-bold">Permissions</h1>
      <div>
        <span class="ml-2 font-semibold text-sm sm:text-base">My Role: ADMIN</span>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-3">
      <div class="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-2">
        <div class="relative w-full sm:w-auto">         
            <label class="mb-1 text-sm font-medium text-gray-900">Role</label>
               <select  v-model="RoleName"   @change="handleRoleChange"
                    class="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all">
              <option value="" disabled selected>Select a Supplier</option>
              <option v-for="option in roles" :key="option.roleId" :value="option.roleId">
                {{ option.roleName }}
              </option>
            </select>
        </div>
       <button @click="UpdatePermissions(section)" class="bg-orange-500 text-white px-2 py-2 rounded-lg">  Update Permissions </button>

      </div>


  <div class="space-y-6">
    <div>
      <div v-for="moduleGroup in groupedModules" :key="moduleGroup.moduleName" class="mb-6">
       <h2 class="text-xl font-bold mb-4 module-title">
        {{ moduleGroup.moduleName }}
      </h2>
      <hr class="mb-4" />

      <div v-for="section in moduleGroup.submodules" :key="section.roleBaseId"
        class="border rounded-lg p-4 mb-4 shadow-sm" >
        <div class="flex flex-wrap justify-between items-center mb-4">
          <h3 class="text-base sm:text-lg font-medium text-black">
            {{ section.submodules.replace(/"/g, '') }}
            </h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <label v-for="permission in section.permissions" :key="permission.PermissionID"
            class="flex items-center cursor-pointer" >
            <input type="checkbox" v-model="permission.AllowedAccess"
              class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
            <span class="ml-2 text-sm text-gray-700">{{ permission.Name }}</span>
          </label>
        </div>

        <!-- <label class="flex items-center mt-4 sm:mt-0 font-semibold cursor-pointer">
          <input
            type="checkbox"
            @click="selectAllPermissions(section)"
            class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span class="ml-2 text-sm text-black">Select All</span>
        </label> -->

      </div>
    </div>
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
    const prevModuleName = ref('');
    const RoleName = ref(false); 
    const errors = reactive({});
    const selectedRoleId = ref('');
    const router = useRouter(); 
    const acountStore  = useAccountStore();
    const data = computed(() => acountStore.getPermissions);  
    const roles = computed(() => acountStore.getRoles);  


    onMounted(()=>{ 
      let token = localStorage.getItem('token');
      let roleid = 1;
      acountStore.fetchRoles(token);
      acountStore.fetchPermissions(roleid,token);
    }); 

    watch(() =>  RoleName, (newval) => {
          const searchTerm = newval.toLowerCase();

          roles.filter(role =>
      role.rolename.toLowerCase().includes(searchTerm) );
    }); 

    watch(() =>  acountStore.getResponse, (newval) => {
        if (newval.status == 200) { 
            DisplayMessage("success", newval.statusMessage);
        } 
        else{
          DisplayMessage("error", newval.statusMessage);
        }
    }); 

    const handleRoleChange = () => {
        let token = localStorage.getItem('token');
        acountStore.fetchPermissions(RoleName.value,token);
    } 

    const selectAllPermissions = (section) => {
      const allSelected = JSON.parse(section.permissions).every(permission => permission.allowedAccess);
       section.permissions = JSON.stringify(
          JSON.parse(section.permissions).map(permission => ({
              ...permission,
              allowedAccess: !allSelected
          }))
       );
    }
        
      // 2. Computed property for grouping data according to module
    const groupedModules = computed(() => {
        const grouped = {};
        data.value.forEach((item) => {
          if (!grouped[item.moduleName]) {
            grouped[item.moduleName] = {
              moduleName: item.moduleName,
              submodules: [],
            };
          }
          grouped[item.moduleName].submodules.push({
            roleBaseId: item.roleBaseId,
            submodules: item.submodules,
            permissions: JSON.parse(item.permissions),
          });
        });
        return Object.values(grouped);
      });



      // The computed property now directly uses groupedModules.value as its source
      const restructuredPayload = computed(() => {
        if (!groupedModules.value || groupedModules.value.length === 0) {
          return {};
        }

        const firstModule = groupedModules.value[0]; 

        return {
          roleId: RoleName.value, 
          moduleName: firstModule.moduleName,
          submodules: firstModule.submodules.map(sub => {
            return {
              submoduleName: sub.submodules.replace(/"/g, ''), 
              permissions: sub.permissions.map(perm => {
                return {
                  permissionID: perm.PermissionID,
                  name: perm.Name,
                  allowedAccess: perm.AllowedAccess
                };
              })
            };
          })
        };
      });

     //method to allow user to (admin) to update already defined permissions
      const UpdatePermissions = () => {
          let token = localStorage.getItem('token');           
          acountStore.AddEditPermissions(token,restructuredPayload.value,);
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
      selectAllPermissions,
      prevModuleName,
      groupedModules,
      roles,
      removeUser,
      UpdatePermissions,
      errors,
      RoleName,
      handleRoleChange, 
      router
    };
  }
};
</script>

  