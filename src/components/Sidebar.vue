
<template>
<!-- SMALL MENU START  -->
 <!-- <div v-if = "IsSmallmenu" class="flex h-full flex-col justify-between  bg-slate-800 w-16">
    <div class="px-6 py-1">
      <i @click="fullmenuclick" class="fas fa-arrow-right text-text-gray-500 text-1xl"></i>
        <ul class="space-y-4">
         <li class="flex flex-col space-y-4">
            <router-link to="/">
            <i class="fas fa-home text-white text-1xl"></i>
          </router-link>
          <router-link to="/inventory">
            <i class="fas fa-warehouse text-white text-1xl"></i>
          </router-link>
          <router-link to="/catalogue">
            <i class="fas fa-book-open text-white text-1xl"></i>
          </router-link>
          <router-link to="/categories">
            <i class="fas fa-th-list text-white text-1xl"></i>
          </router-link>
          <router-link to="/sell">
            <i class="fas fa-shopping-cart text-white text-1xl"></i>
          </router-link>
          <router-link to="/transactions">
            <i class="fas fa-file-alt text-white text-1xl"></i>
          </router-link>
          <i class="fas fa-phone text-white text-1xl"></i>
          <i class="fas fa-comments text-white text-1xl"></i>
          <i class="fas fa-sms text-white text-1xl"></i>
          <router-link to="/Supplier" >
            <i class="fas fa-truck text-white text-1xl"></i>
          </router-link>
          <router-link to="/supplies">
            <i class="fas fa-chart-line text-white text-1xl"></i>
           </router-link> 
            <i class="fas fa-address-book text-white text-1xl"></i>
          </li>
        </ul>
      </div>
   </div>  -->


<!-- FULL MENU START   v-if="Isfullmenu"  -->  

<div   v-if="showSidebar"  class="flex h-full flex-col justify-between border-e bg-slate-800   w-64">
    <div class="px-6 py-1">
     
    <ul class="space-y-1">

    <!-- <i @click="toggleSidebar" class="fa-solid fa-bars text-gray-600 text-sm"></i> -->


      <li>
      <details class="group [&_summary::-webkit-details-marker]:hidden ">
        <summary
          class="flex cursor-pointer items-center justify-between rounded-lg  text-gray-500">
          <i class="fas fa-home text-white text-1xl"></i>
          <router-link to="/" class="text-1xl font-semibold mr-20  rounded-lg   hover:bg-gray-100 hover:text-gray-700  ">DASHBOARD</router-link>
        </summary>
      </details>
      </li>

      <!-- PRODUCTS SECTION -->
      <li class="group">
      <details class="group [&_summary::-webkit-details-marker]:hidden mt-10">
        <summary class="flex cursor-pointer items-center justify-between rounded-lg text-gray-500">
          <i class="fas fa-box-open text-white text-1xl"></i>
          <span class="text-1xl font-semibold  mr-5 rounded-lg hover:bg-gray-100 hover:text-gray-700"> 
          Products
          </span>
          <span class="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </span>
        </summary>

    <ul class="mt-2 space-y-1 px-4 hidden group-hover:block">
      <li>
        <router-link to="/inventory" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"> 
       Inventory
        </router-link>
      </li>
      <li>
        <router-link to="/catalogue" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"> 
        catalogue
        </router-link>
      </li>
      <li>
        <router-link to="/categories" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"> 
        categories
        </router-link>
      </li>
    </ul>
  </details>
      </li>
  
     <!--TRANSACTION SECTION  -->
     <li>
      <details class="group [&_summary::-webkit-details-marker]:hidden mt-10">
        <summary
          class="flex cursor-pointer items-center justify-between rounded-lg  text-gray-500 ">
          <i class="fas fa-paper-plane text-white text-1xl"></i>
          <span class="text-1xl font-semibold hover:bg-gray-100 rounded-lg  hover:text-gray-700">Transactions </span>

          <span class="shrink-0 transition duration-300 group-open:-rotate-180">
            <span class="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor">
              <path  fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"   clip-rule="evenodd"/>
            </svg>
          </span>
          </span>
        </summary>

        <ul class="mt-2 space-y-1 px-4">
        
          <li>
            <router-link to ='/sell' class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
        Sell
            </router-link>
          </li>

          <li>
            <router-link to = '/transactions' class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
        Transaction list
      </router-link>
          </li>


        </ul>
      </details>
     </li>
  
    <!-- Documents Section -->
     <li>
    <details class="group [&_summary::-webkit-details-marker]:hidden mt-10">
      <summary
        class="flex cursor-pointer items-center justify-between rounded-lg  text-gray-500 ">
        <i class="fas fa-file-alt text-white text-1xl"></i>
        <span class="text-1xl font-semibold mr-5 hover:bg-gray-100 hover:text-gray-700 rounded-lg "> Documents </span>

        <span class="shrink-0 transition duration-300 group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor">
            <path  fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"   clip-rule="evenodd"/>
          </svg>
        </span>
      </summary>

      <ul class="mt-2 space-y-1 px-4"> 

        <li>
          <a  href="#" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          Receipts
          </a>
        </li>

        <li>
          <a  href="#" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
        Invoices
          </a>
        </li>

        <li>
          <a  href="#" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
         Other Documents
          </a>
        </li>

      
        
    
      </ul>
    </details>
     </li>

     <!-- NOTIFICATION SECTION -->
     <li>
        <details class="group [&_summary::-webkit-details-marker]:hidden mt-10">
          <summary
            class="flex cursor-pointer items-center justify-between rounded-lg  text-gray-500 ">
            <i class="fas fa-bell text-white text-1xl"></i>
            <span class="text-1xl font-semibold  hover:bg-gray-100 hover:text-gray-700 rounded-lg ">Notifications </span>

            <span class="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor">
                <path  fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"   clip-rule="evenodd"/>
              </svg>
            </span>
          </summary>

          <ul class="mt-2 space-y-1 px-4"> 

            <li>
              <router-link to="/contacts" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                Contacts </router-link>
            </li>

            <li>
              <router-link to="/SendSms" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                Send sms </router-link>
            </li>

            <li>
              <router-link to="/SentMessages" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                Sent Messages </router-link>
            </li>
        
          
          </ul>
        </details>
     </li>

     <!-- SUPPLIES SECTION -->   
     <!-- <li>
        <details class="group [&_summary::-webkit-details-marker]:hidden mt-10">
          <summary
            class="flex cursor-pointer items-center justify-between rounded-lg  text-gray-500">
            <i class="fas fa-truck text-white text-1xl"></i>
            <router-link to="/supplies" class="text-1xl font-semibold mr-20  rounded-lg   hover:bg-gray-100 hover:text-gray-700 ">Supplies</router-link>
          </summary>
        </details>
     </li> -->

     <!-- SUPPLIERS SECTION -->
     <li>
        <details class="group [&_summary::-webkit-details-marker]:hidden mt-10">
          <summary
            class="flex cursor-pointer items-center justify-between rounded-lg  text-gray-500">
            <i class="fas fa-truck text-white text-1xl"></i>

            <router-link to="/Supplier" class="text-1xl font-semibold mr-20  rounded-lg   hover:bg-gray-100 hover:text-gray-700 ">Suppliers</router-link>
          </summary>
        </details>
     </li> 



     <!-- REPORTS SECTION -->
     <li>
      <details class="group [&_summary::-webkit-details-marker]:hidden mt-10">
        <summary
          class="flex cursor-pointer items-center justify-between rounded-lg  text-gray-500">
          <i class="fas fa-chart-line text-white text-1xl"></i>
          <span class="text-1xl font-semibold mr-24  rounded-lg   hover:bg-gray-100 hover:text-gray-700 ">Reports</span>
        </summary>

        <ul class="mt-2 space-y-1 px-4"> 

          <li>
            <router-link to="/reports" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              Reports </router-link>
          </li>

          <li>
        <router-link to="/reports" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            my reports </router-link>
        </li>
          </ul>
      </details>
     </li>  



      <!-- MYACCOUNT SECTION -->
     <li>
      <details class="group [&_summary::-webkit-details-marker]:hidden mt-10">
        <summary
          class="flex cursor-pointer items-center justify-between rounded-lg  text-gray-500">
          <i class="fas fa-address-book text-white text-1xl"></i>
          <span class="text-1xl font-semibold mr-20  rounded-lg   hover:bg-gray-100 hover:text-gray-700 ">My Account</span>
        </summary>
      </details>
     </li>
         
  </ul>
  
</div>
  
  


  </div> 
  
  
   </template>
   
   <script> 
  //  import {ref} from 'vue'
   import { useDashboardStore } from '../store/DashboardStore';
   import { ref,onMounted, onUpdated, computed } from 'vue';
   export default {
     name: 'Sidebar',
  
     setup(){

      const dashboardstore = useDashboardStore();
      const showSidebar = computed(() => dashboardstore.filterSidebar);

   
        // const Isfullmenu = ref(false);
        // const IsSmallmenu = ref(true);

        // const fullmenuclick = () => {

        //   Isfullmenu.value = true;
        //   IsSmallmenu.value =false;
        // } 

        // const smallmenuclick = () => {
        //   Isfullmenu.value = false;
        //   IsSmallmenu.value = true;
        // }

      
        return{

          isSidebarVisible: dashboardstore.isSidebarVisible,
          showSidebar
          // IsSmallmenu,
          // Isfullmenu,
          // fullmenuclick,
          // smallmenuclick
        }

     }

   }
   </script>
   
   <style scoped>
   /* Add additional styles if necessary */
   @import 'node_modules/@fortawesome/fontawesome-free/css/all.css';
   </style>
   