<template>
   <div>
     <header class="bg-slate-800">

        <div class="relative flex h-16 max-w-screen-xl justify-start gap-x-4">


   <div class="relative flex items-center h-16 space-x-4">
    <img src="../assets/logo.jpeg" alt="Image Description" class="w-16 h-14" />
    <!-- <i @click="sendMessage" class="fa-solid fa-bars text-gray-600 text-sm"></i> -->
    <i @click="toggleSidebar" class="fa-solid fa-bars text-gray-600 text-sm"></i>

    <h1 class="text-2xl  font-semibold text-white">Ultimate POS</h1>

  </div>


  <div class="ml-1">

       </div>
         <div class="flex flex-1 items-center justify-end md:justify-between">
        
   
           <div class="relative ml-auto">
             <div @click="toggleDropdown" class="inline-flex items-center cursor-pointer overflow-hidden">
               <span class="text-md font-semibold text-white">felix</span>
               <span :class="{'rotate-180': isOpen}" class="shrink-0 transition-transform duration-300 text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                 </svg>
               </span>
             </div>
   
             <transition name="fade">
               <div v-if="isOpen" class="absolute right-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg" role="menu">
                 <div class="p-2">
                   <div class="flex items-center space-x-2">
                      <a @click="details" class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">Account Details </a>
                      <i class="fas fa-flag text-black text-1xl"></i>
                     </div>
                     <div class="flex items-center space-x-2">
                   <a @click="logout" class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">Logout</a>
                   <i class="fas fa-sign-out-alt text-black text-1xl"></i>
                   </div>
                 </div>
               </div>
             </transition>
           </div>
         </div>
       </div>
     </header>
   </div>
   
   </template>
   
   <script>
   import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
   import { useDashboardStore } from '../store/DashboardStore';
   import { ref,onMounted, watch,computed } from 'vue';
   export default {
    setup(){
  
      const isOpen =  ref(false);
      const dashboardstore = useDashboardStore();
     const route = useRoute();
       const router = useRouter();


      const toggleSidebar = ()=> {
       dashboardstore.toggleResponsiveSidebar();
      }

      const  toggleDropdown = () => {
         isOpen.value = !isOpen.value;
       }

       const closeDropdown = () => {
         isOpen.value = false;
       }

       const handleClickOutside = (event)=> {
         if (!this.$el.contains(event.target)) {
           closeDropdown();
         }
       }

      const logout= ()=> {
        // $router.push('/login');
              router.push('/login');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
    }
    
  


    return {

      isOpen,
      logout,
      handleClickOutside,
      closeDropdown,
      toggleDropdown,
      toggleSidebar

    }
   }
  }
   </script>
   
   <style scoped>
   @import 'node_modules/@fortawesome/fontawesome-free/css/all.css';

   .fade-enter-active, .fade-leave-active {
     transition: opacity 0.3s;
   }
   .fade-enter, .fade-leave-to {
     opacity: 0;
   }
   </style>
   

  
   