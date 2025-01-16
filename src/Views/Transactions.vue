<template>
       <main>
              <div class="overflow-x-auto rounded-t-lg py-1 px-1 ">
              <div class="relative flex flex-col sm:flex-row items-start w-full">
              <div class="flex flex-wrap items-center w-3/4 sm:mb-0">
              <h2 class="text-3xl block font-bold sm:text-2xl text-center justify-center text-gray-700 px-2 ml-10">Transactions</h2>
              </div>
              <label for="Search" class="sr-only">Search</label>
              <input type="text"  id="Search" @input="productSearch" placeholder="Search for...anything" class="w-1/3 sm:w-1/3 rounded-md border-gray-200 py-2 pe-10 shadow-sm  lg:absolute right-1  sm:text-sm"/> 
              </div> 
              </div>

             <table class="min-w-full divide-y-2 divide-gray-200  mt-4 text-sm rounded px-2 bg-gray-50">
              <thead class="ltr:text-left rtl:text-right border border-gray-300">

  
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">BatchID</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Item</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Code</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Cost</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Selling Price</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
    
    
    
            </tr>
          </thead>
    
          <tbody class="divide-y divide-gray-200">
            <!-- <tr v-for="(item, index) in filtereddata" :key="index">
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item .id}}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.name}}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.cost }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.buyingprice }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.buyingdate }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.expiredate }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.status }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.supplier }}</td>
            </tr> -->
  
          </tbody>
        </table>
    
    
           <!-- Modal backdrop  to add a new template-->
    
    
        <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full">
          <p class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center">ADD NEW CONTACT GROUP</p>
    
    
           <div class="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
                <label for="email" class="w-full text-sm text-black">Group Name*</label>
                <div class="relative">
                <input type="text" class="w-full rounded-lg p-2 text-sm shadow-sm  border-gray-700" placeholder="Text Header" /> <!-- Changed border color to black -->
                </div>
             </div>
    
    
      <div class="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
       <div>
          <label for="message" class="w-full text-sm text-black">Enter Description</label>
          <textarea id="message" rows="3"
          class="w-full rounded-lg p-2 text-sm shadow-sm focus:border-black focus:ring-black border border-gray-700"
          placeholder="Type your message here maximum 2000 characters"></textarea>    
            </div>
    
         <a class="mt-8 inline-block w-full bg-blue-500 rounded-md py-4 text-sm font-bold uppercase tracking-widest text-white" href="#">SUBMIT</a>
       
         <button @click="closeModal" class="bg-black text-white px-1 mt-3 rounded">x</button>
    
      </div>
      </div>
      </div>
    
    
       </main>
       
  </template>  
       
      
    
    
    
    <script>
    // import { usecontactstore } from '../store/contactstore';
    import {ref} from 'vue';
    
    export default {
      setup() {
        // const contactStore = usecontactstore();
        const isModalOpen = ref(false); 
    
    const openModal = () => {
      isModalOpen.value = true;
    };
    
    const closeModal = () => {
      isModalOpen.value = false;
    };
       
    
       
        
        return {
        //   data: contactStore.getData,
        //   isLoading: contactStore.isLoading,
        //   error: contactStore.getError,
          openModal,
          closeModal,
          isModalOpen,
        //   fetchData: contactStore.fetchData
        };
      }
    };
    </script>