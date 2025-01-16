<template>

   <main class="bg-white">        
          <div class="relative">
            <span class="text-2xl">Sent Messages</span>
            <label for="Search" class="sr-only"> Search </label>
 
            <input type="text" id="Search"  @input="updateSearch"  placeholder="Search for...anything" class="w-1/3 rounded-md border border-gray-600 py-2.5 pe-10 sm:text-sm absolute right-0"/>
 
          </div>
 
   
       <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-300 mt-4 text-sm rounded">
       <thead class="ltr:text-left rtl:text-right">
         <tr>
          <th class="whitespace-nowrap px-1 py-2 font-medium text-gray-900">#</th>
          <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Text Header</th>
          <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Sender ID</th>
          <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Phone no</th>
          <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Status</th>
          <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Message ID</th>
          <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Date</th>
          <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Time</th>
        </tr>
      </thead>
 
      <tbody class="divide-y divide-gray-200 bg-white"> 
        <tr class="bg-white border-4 border-gray-200" v-for="(sms, index) in paginatedSentMessages" :key="sms.id" 
                       @click="viewMessage(sms.header, sms.messageId, sms.message, sms.number, sms.cost)">
           <td class="px-1 py-2">{{ index + 1 }}</td>
          <td class="whitespace-nowrap px-2 py-2 text-gray-700">{{ sms.header }}</td>
          <td class="whitespace-nowrap px-2 py-2 text-gray-700">{{ sms.senderid }} </td>
          <td class="whitespace-nowrap px-2 py-2 text-gray-700">{{ sms.number }}</td>
          <td class="whitespace-nowrap px-2 py-2 text-gray-700">{{ sms.status }}</td>
          <td class="whitespace-nowrap px-2 py-2 text-gray-700">{{ sms.messageId }}</td>
          <td class="whitespace-nowrap px-2 py-2 text-gray-700">{{ sms.date }}</td>
          <td class="whitespace-nowrap px-2 py-2 text-gray-700">{{ sms.time }}</td>
          <!-- <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ sms.cost }} </td> -->
          <!-- <td class="whitespace-nowrap px-4 py-2 text-gray-700">..</td> -->
          </tr>
        </tbody>
        </table>
 
           <!-- Pagination Controls -->
      <div class="flex justify-between mt-4">
       <button @click="prevPage" class="px-4 py-2 bg-gray-300 rounded" :disabled="currentPage === 1">Previous</button>
       <span>Page {{ currentPage }} of {{ totalPages }}</span>
       <button @click="nextPage" class="px-4 py-2 bg-gray-300 rounded" :disabled="currentPage === totalPages">Next</button>
     </div>
   
   <!-- <p>  {{ data }}</p> -->
          <!-- Modal backdrop  to add a new template-->
   
   
       <!-- <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
       <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full"> -->
 
         <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-y-auto">
           <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full max-h-screen h-content overflow-y-auto">
         <p class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center">MESSAGE DETAILS</p>
         <button @click="closeModal" class=" px-1 bg-black text-white  rounded text-left">x</button>
   
         <div class="p-2 text-center sm:p-6 md:col-span-2 lg:p-8">
           <label for="email" class="w-full text-sm text-black">PHONE NUMBER</label>
           <div class="relative">
           <input type="text" v-model="phone" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-black focus:ring-black border border-gray-700" placeholder="Text Header" /> <!-- Changed border color to black -->
           </div>
         </div>
 
         <div class="p-2 text-center sm:p-6 md:col-span-2 lg:p-8">
           <div class="relative">
           <label for="email" class="w-1/2 text-sm text-black">MESSAGE ID</label>
           <input type="text" v-model="messageid" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-black focus:ring-black border border-gray-700" placeholder="Text Header" /> <!-- Changed border color to black -->
           </div>
         </div>
 
         <div class="p-2 text-center sm:p-6 md:col-span-2 lg:p-8">
           <label for="email" class="w-full text-sm text-black">TEXT HEADER</label>
           <div class="relative">
           <input type="text" v-model="Textheader" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-black focus:ring-black border border-gray-700" placeholder="Text Header" /> <!-- Changed border color to black -->
           </div>
         </div>
 
         <div class="p-2 text-center sm:p-6 md:col-span-2 lg:p-8">
           <label for="email" class="w-full text-sm text-black">TEXT COST</label>
           <div class="relative">
           <input type="text" v-model="TextCost" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-black focus:ring-black border border-gray-700" placeholder="Text Header" /> <!-- Changed border color to black -->
           </div>
         </div>
 
   
     <div class="p-2 text-center sm:p-6 md:col-span-2 lg:p-8">
      <div>
         <label for="message" class="w-full text-sm text-black">TEXT MESSAGE</label>
         <textarea id="message" rows="3" v-model="Textmessage"
         class="w-full rounded-lg p-2 text-sm shadow-sm focus:border-black focus:ring-black border border-gray-700"
         placeholder="Type your message here maximum 2000 characters"></textarea>    
           </div>
   
        <!-- <a class="mt-8 inline-block w-full bg-blue-500 rounded-md py-4 text-sm font-bold uppercase tracking-widest text-white" href="#">SUBMIT</a> -->
      
        <!-- <button @click="closeModal" class="bg-black text-white px-1 mt-3 rounded">x</button> -->
   
     </div>
     </div>
     </div>
   
   
      </main>
      
      </template>  
      
     
   
   
   
   <script>
   import { useMessageStore } from  '../store/MessageStore';
   import {ref, computed , onMounted} from 'vue';
   
   export default {
     setup() {
    const sentmessagestore = useMessageStore();      
    const isModalOpen = ref(false); 
    const phone =ref('');
    const messageid = ref('');
    const Textheader = ref('');
    const Textmessage = ref('');
    const TextCost = ref('');
    let currentPage = ref(1);
    const itemsPerPage = 12;
 
      // Make gpinia etters reactive using computed
    const data = computed(() => sentmessagestore.getData);
    const filteredItems = computed(() => sentmessagestore.filteredMessage);
    const isLoading = computed(() => sentmessagestore.isLoading);
    const error = computed(() => sentmessagestore.getError);
    const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));
 
 
   onMounted(()=>{
     sentmessagestore.fetchMessages();
   })
 
      // paginate filtered items
      const paginatedSentMessages = computed(() => {
       const start = (currentPage.value - 1) * itemsPerPage;
       return sentmessagestore.filteredMessage.slice(start, start + itemsPerPage);
     });
 
 
       const nextPage = () => { 
         if (currentPage.value < totalPages.value) currentPage.value++;
       };
 
       const prevPage = () => {
         if (currentPage.value > 1) currentPage.value--;
       };
 
   const viewMessage = ( header, messageId, message, number, cost) =>{
         openModal();
        phone.value = number;
        messageid.value = messageId;
        Textheader.value = header;
        Textmessage.value = message;
        TextCost.value = cost;
   }
 
 
   const updateSearch = (e) => { 
     currentPage.value = 1;
         sentmessagestore.setSearchTerm(e.target.value);
       };
   
   const openModal = () => {
     isModalOpen.value = true;
   };
   
   const closeModal = () => {
     isModalOpen.value = false;
   };
       
       return {
         data,
         isLoading,
         error,
         openModal,
         closeModal,
         isModalOpen,
         sentmessagestore,
         updateSearch,
         filteredItems,
         viewMessage,
        phone ,
        messageid,
        Textheader,
        Textmessage,
        TextCost,
        paginatedSentMessages,
        currentPage,
       totalPages,
       nextPage,
       prevPage,
 
       };
     }
   };
   </script>