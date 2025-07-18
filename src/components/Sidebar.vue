<template>
<div   v-if="showSidebar"  class="flex h-full flex-col justify-between border-e bg-slate-800   w-64">
    <div class="px-6 py-1">

    <ul class="space-y-1 mt-3">
        <li>
            <router-link to="/" class="flex items-center text-white text-1xl font-semibold rounded-lg hover:text-white">
              <i class="fas fa-home text-white text-1xl mr-2"></i>
              DASHBOARD
            </router-link>
          </li>

      <!-- PRODUCTS SECTION -->
      <li class="group">
        <div @click="toggleMenu('Products')" class="flex cursor-pointer  rounded-lg text-white mt-10">
            <i class="fas fa-box-open text-white text-1xl mr-3"></i>
              <span class="text-1xl font-semibold mr-12  rounded-lg   hover:bg-gray-100 hover:text-gray-700 ">Products</span>
            <span :class="{ 'rotate-180': openMenu === 'Products' }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </span>
          </div>

    <ul  v-show="openMenu === 'Products'" class="mt-2 space-y-1 px-4">
      <li>
        <router-link to="/inventory" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"> Inventory</router-link>
      </li>
      <li>
        <router-link to="/catalogue" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"> catalogue</router-link>
      </li>
      <li>
        <router-link to="/categories" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">  categories</router-link>
      </li>
    </ul>
      </li>
  
     <!--TRANSACTION SECTION  -->
     <li>
         <div @click="toggleMenu('Transactions')" class="flex cursor-pointer  rounded-lg text-white mt-10">
           <i class="fas fa-paper-plane text-white text-1xl mr-3"></i>
              <span class="text-1xl font-semibold mr-12  rounded-lg   hover:bg-gray-100 hover:text-gray-700 ">Transactions</span>
            <span :class="{ 'rotate-180': openMenu === 'Transactions' }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </span>
          </div>

         <ul v-show="openMenu === 'Transactions'" class="mt-2 space-y-1 px-4">
          <li>
            <router-link to ='/sell' class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">Sell</router-link>
          </li>
          <li>
            <router-link to = '/transactions' class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"> Transaction list</router-link>
          </li>
        </ul>
     </li>
  
    <!-- Documents Section -->
     <li>
       <div @click="toggleMenu('Documents')" class="flex cursor-pointer  rounded-lg text-white mt-10">
           <i class="fas fa-file-alt text-white text-1xl mr-3"></i>
              <span class="text-1xl font-semibold mr-20  rounded-lg   hover:bg-gray-100 hover:text-gray-700 ">Documents</span>
            <span :class="{ 'rotate-180': openMenu === 'Documents' }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </span>
          </div>

      <ul v-show="openMenu === 'Documents'"  class="mt-2 space-y-1 px-4"> 
       
        <li>
          <router-link to ="/Documents"  href="#" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"> All Documents </router-link>
        </li>
      </ul>
     </li>

     <!-- NOTIFICATION SECTION -->
     <li>
            <div @click="toggleMenu('Notifications')" class="flex cursor-pointer  rounded-lg text-white mt-10">
            <i class="fas fa-bell text-white text-1xl mr-3"></i>
              <span class="text-1xl font-semibold mr-12  rounded-lg   hover:bg-gray-100 hover:text-gray-700 ">Notifications</span>
            <span :class="{ 'rotate-180': openMenu === 'Notifications' }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </span>
          </div>

          <ul v-show="openMenu === 'Notifications'"  class="mt-2 space-y-1 px-4"> 
            <li>
              <router-link to="/contacts" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">Contacts </router-link>
            </li>
            <li>
              <router-link to="/SendSms" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">Send sms </router-link>
            </li>
            <li>
              <router-link to="/SentMessages" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">Sent Messages </router-link>
            </li>
        
          
          </ul>
     </li>

   
     <!-- REPORTS SECTION -->
    <li>
        <details class="group [&_summary::-webkit-details-marker]:hidden mt-10">
          <summary class="flex cursor-pointer items-center justify-between rounded-lg  text-white">
            <i class="fas fa-file-alt text-1xl mr-3"></i>

             <router-link to="/reports"class="text-1xl font-semibold mr-24  rounded-lg   hover:bg-gray-100 hover:text-gray-700 ">Reports</router-link>

      </summary>
      </details>
     </li>

    




 <!-- SUPPLIERS SECTION -->
     <li>
        <details class="group [&_summary::-webkit-details-marker]:hidden mt-10">
          <summary
            class="flex cursor-pointer items-center justify-between rounded-lg  text-white">
            <i class="fas fa-truck text-white text-1xl"></i>

            <router-link to="/Supplier" class="text-1xl font-semibold mr-20  rounded-lg   hover:bg-gray-100 hover:text-gray-700 ">Suppliers</router-link>
          </summary>
        </details>
     </li> 

      <!-- MYACCOUNT SECTION -->
     <li>
      <details class="group [&_summary::-webkit-details-marker]:hidden mt-10">
        <summary
          class="flex cursor-pointer items-center justify-between rounded-lg  text-white">
          <i class="fas fa-address-book text-white text-1xl"></i>
          <router-link to="/account" class="text-1xl font-semibold mr-20  rounded-lg  
           hover:bg-gray-100 hover:text-gray-700 ">My Account</router-link>
        </summary>
      </details>
     </li>


     
         
  </ul>
  
</div>
  
  


  </div> 
  
  
   </template>
   
   <script setup>
   import { useDashboardStore } from '../store/DashboardStore';
   import { ref,computed,watch } from 'vue';
  
      const dashboardstore = useDashboardStore();
      const showSidebar = computed(() => dashboardstore.filterLargeScreen);
      const openMenu = ref(null);

      const toggleMenu = (menu) => {
        openMenu.value = openMenu.value === menu ? null : menu;
      };
      
     watch(showSidebar, (newVal, oldVal) => {
        if (newVal) {
          console.log(newVal, "sidebar")
         }
        });
  
   </script>
   
   <style scoped>
   /* Add additional styles if necessary */
   @import 'node_modules/@fortawesome/fontawesome-free/css/all.css';
   </style>
   

