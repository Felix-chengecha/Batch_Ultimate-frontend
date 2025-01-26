<template>

   <div class="bg-gray-200 rounded-lg shadow-md h-full w-full">  
     <div class="mx-auto max-w-screen-xl px-1 py-1 sm:px-6 lg:px-1 h-full ">
   
      
   
       <div class="mx-auto h-auto max-w-full sm:h-full">
     <form action="#" class="mb-0 space-y-4 space-x-0 sm:space-x-16 sm:mr-16 rounded-lg sm:p-6 lg:p-1">
       
       <div class="flex flex-col w-full relative">
         <h3 class="font-medium text-1xl text-gray-700 ml-12 ">SEND SMS</h3>
         <div class="absolute right-0 space-x-2 sm:space-x-4">   
           <a @click="OpenContacts" class="inline-block rounded-md border border-gray-400 bg-green-500 px-3 py-1 text-sm text-white hover:text-gray-700 focus:outline-none">CONTACTS</a>
           <!-- <a @click="OpenTemplates" class="inline-block rounded-md border border-gray-700 bg-blue-500 px-3 py-1 text-sm text-white hover:text-gray-700 focus:outline-none">TEMPLATE</a>          -->
         </div>
       </div>
   
       <div class="border border-gray-200 rounded-xl px-4 py-2 h-full bg-white"> 
         
         <div class="flex flex-col space-y-4 ">
           <div class="flex flex-col sm:flex-row sm:space-x-4">
             <div class="flex-1">
               <label for="email" class="text-sm ml-3">TEXT HEADER</label>
               <input type="text" v-model="textheader" class="border border-gray-200 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-black" />
             </div>
   
             <!-- <div class="flex-1">
               <label for="options" class="text-lg ml-3">SENDER ID</label>
               <select v-model="senderid" id="category" class="w-full rounded-lg border border-gray-700 p-3 text-sm shadow-sm focus:border-black focus:ring-black text-black bg-white mt-2">          
                 <option v-for="option in senderids" :key="option.value" :value="option.value">{{ option.value }}</option>
               </select> 
             </div> -->
           </div>  
   
      
           <div class="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-1">
             <div class="flex-1">
               <label for="date" class="text-sm text-center w-full">SCHEDULE DATE</label>
               <input type="date" v-model="senddate" class="w-full rounded-lg p-3 border border-gray-200 text-sm shadow-sm focus:border-black focus:ring-black text-black bg-white" />
             </div>
   
             <div class="flex-1">
               <label for="time" class="text-sm text-center w-full">SCHEDULE TIME</label>
               <input type="time" v-model="sendtime" class="w-full rounded-lg p-3 border border-gray-200 text-sm shadow-sm focus:border-black focus:ring-black text-black bg-white" />
             </div>
           </div>
   
           <div class="mt-4" v-if="hideonecontact">
             <label for="contacts" class="text-sm ml-3">ENTER CONTACTS</label>
             <!-- <textarea v-model="phonenumber" rows="2" class="w-full rounded-lg border border-gray-700 p-3 text-sm shadow-sm focus:border-black focus:ring-black" placeholder="Contacts comma separated"></textarea> -->
             <input type="number" v-model="phonenumber" class="w-full rounded-lg p-3 border border-gray-200 text-sm shadow-sm focus:border-black focus:ring-black text-black bg-white" />
           </div>
   
           <div class="mt-3">
             <label for="message" class="text-sm ml-3">WRITE MESSAGE</label>
       
               
               <QuillEditor v-model="textmessage"   id="richEditor"   
               class="w-full h-164 bg-white border border-gray-300 rounded-lg shadow-sm"   
               :options="editorOptions"
               @input="handleInput"   />
            </div> 
   
   
   
           <div class="mt-5 mb-4 text-center">
             <a @click="SendSms" class="inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring focus:ring-yellow-400">SUBMIT</a>
           </div>
         </div>
       </div>
     </form>
   </div>
   
   
   
   
    
   
   
   
   
       <!--Choose contacts dialog start-->
   
     <!-- Choose contacts  dialog end -->
   
     
   
   
   
       <!--Contact dialog start-->
       <!-- <div v-if="isModalContactsOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-y-auto">
       <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full">
         <p class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center">Contacts, Contact Group</p>  
         <ul>
         <li class="border rounded-md p-4"  v-for="(cont, index) in contactGroup" :key="index">
           <div  @click="UseContactGroup(cont.name, cont.description)" >  
               <div>
                 <span class="text-2xl">{{ index + 1 }}.</span>
                 <span class=" text-2xl">  {{ cont.name }}  </span> 
               </div>
                <span>{{ cont.description }}  </span> 
           </div>  
         </li>
        </ul>
   
        <button @click="CloseModalContacts" class="bg-black text-white px-1 mt-3 rounded">x</button>
     </div>
       </div> -->
     <!-- Contact dialog end -->
     <div v-if="isModalContactsOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-y-auto">
     <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full max-h-screen h-screen overflow-y-auto">
       <!-- <p class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center">Contacts, Contact Group</p>   -->
   
       <div class="relative flex items-center justify-center">
             <p class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center">SELECT CONTACTS </p>
             <button @click="CloseModalContacts" class="absolute right-0 bg-black text-white px-1 rounded">x</button>
           </div>
   
   
       <ul class="space-y-2 mt-2">
         <li class="border rounded-md p-4" v-for="(cont, index) in contacts" :key="index">
           <div @click="UseContactGroup(cont.username, cont.phoneNumber)">  
             <div>
               <span class="text-2xl">{{ index + 1 }}.</span>
               <span class="text-2xl"> {{ cont.username }} </span> 
             </div>
             <span>{{ cont.phoneNumber }}</span> 
           </div>  
         </li>
       </ul>
   
       <!-- <button @click="CloseModalContacts" class="bg-black text-white px-3 py-1 mt-3 rounded">Close</button> -->
     </div>
   </div>
   
   
   
     </div>
   </div>
   </template>
   
   <script>
   import { usecontactstore } from '../store/contactstore';
   import { useMessageStore } from  '../store/MessageStore';
   import Swal from 'sweetalert2';
   import { computed ,watch, onMounted,ref } from 'vue';
   import axios from '../axios';
   import { QuillEditor } from '@vueup/vue-quill';
   import '@vueup/vue-quill/dist/vue-quill.snow.css';
  //  import { Vue3Quill } from 'vue3-quill';
  //  import Quill from 'quill'; 
   //fetchContacts  <QuillEditor v-model="content" :options="editorOptions" />


   
   export default { 
    components: {
    QuillEditor,
  },
     setup() { 
   
   
       const Token = ref(localStorage.getItem('token')); 
       const isModalContactsOpen = ref(false);
       const contactgrouselected = ref(false);
       const hideonecontact = ref(true)
      //  const senderid = ref('');
       const textheader = ref('');
       const textmessage = ref('');
       const sendtime = ref('');
       const senddate = ref(''); 
       const selectAllpeople = ref(false);
       const phonenumber = ref('');  
       const contactlist = ref([]);
       const sendmsg = ref([]);
       const filteredNumbers = ref([]);
      //  const isModalPickContactsOpen = ref(false);

       const contactstore = usecontactstore();
       const messageStore = useMessageStore();

      //  const senderids = computed(() => senderstore.getData);
       const contacts = computed(() => contactstore.filteredContacts);
   
   
   
       onMounted(() => {
         // groupstore.fetchContactGroup();
         // templatestore.fetchSmsTemplate();
         // groupstore.fetchContactList();
         // senderstore.fetchSenderID();
         contactstore.fetchContacts();
         });
   
   
   
       const Usetemplate = (name,body) => {
         textheader.value = name;
         textmessage .value=body;
         closeModalTemplate();
       }
   
       const UseContactGroup = (name,phone) =>{
     
        filteredNumbers.value = phone;

        phonenumber.value = phone;

        //  contactgrouselected.value = true;
        //  hideonecontact.value = false;
        //  filteredNumbers.value = contacts.value
        //  .filter(item => item[1].includes(name)) // Filter items based on name
        //  .map(item => ({
        //    phoneNumber: item[0],
        //    name: item[1],
        //    isChecked: true
        //  })); 


   
        //  isModalPickContactsOpen.value = true;
         isModalContactsOpen.value = false;
     }
              
   
       const SendSms = () => { 
   
   
        
       if(textheader.value == "" || textheader.value == undefined){
           showalertdialog("error", "text header is required");
           return;
          } 
         else if(phonenumber.value == "" || phonenumber.value == undefined){
           showalertdialog("error", "phone no is required");
           return;
         } 
         else if(textmessage.value == "" || textmessage.value == undefined){
           showalertdialog("error", "text body  is required");
           return;
         }
         else{
         // Split the input by commas, trim spaces, and filter out empty values
         // const phoneNumbersArray = phonenumber.value
         //   .split(',')
         //   .map(number => number.trim())
         //   .filter(number => number !== '');
   
    
      //  const phoneNumbersObject = phoneNumbersArray.join(",");

       const smspayload = {
            username: 'sandbox',
            to: filteredNumbers.value,  //phonenumber.value,
            header: textheader.value, 
            message: textmessage.value,
            date: senddate.value,
            time: sendtime.value,
       };
         messageStore.SendSms(smspayload);
      } };

       const OpenContacts=()=>{ 
         // groupstore.fetchContactList();
         contactstore.fetchContacts();
         isModalContactsOpen.value = true;
       };
   
       const CloseModalContacts =()=>{
         isModalContactsOpen.value = false;
       };
   
       const showalertdialog = (icon,resp) => {
         Swal.fire({
           position: "top-end",
           icon:  icon,
           title: resp,
           showConfirmButton: false,
           timer: 1500
         });
       };
   
      //  const closeModalPickContact =() =>{
      //    isModalPickContactsOpen.value = false;
      //  };
   
      //  const SubmitContacts =()=>{
      //    isModalPickContactsOpen.value = false;
   
   
      //  }
   
      // Function to toggle all checkboxes
     const toggleSelectAll = () => { 
     let chck = filteredNumbers.value;
   
     chck.forEach(item => {
       // chck.isChecked = selectAllpeople.value;
       filteredusers.isChecked = selectAllpeople.value;
         });
       };
   
       const checkSelectAllState = () => {
         selectAll.value = items.value.every(item => item.isChecked);
       };

       const handleInput = (value) => {
        textmessage.value = value.explicitOriginalTarget.innerText;
      };

       const editorOptions = ref({ 

        theme: 'snow',
        // placeholder: 'Write something amazing...',
        modules: {
          toolbar: [
            // Toolbar rows
            [{ font: [] }], // Font family dropdown
            [{ size: ['small', false, 'large', 'huge'] }], // Font size dropdown
            ['bold', 'italic', 'underline', 'strike'], // Text styles
            [{ color: [] }, { background: [] }], // Text and background colors
            [{ script: 'sub' }, { script: 'super' }], // Subscript/Superscript
            [{ header: 1 }, { header: 2 }], // Header styles
            [{ list: 'ordered' }, { list: 'bullet' }], // Lists
            [{ align: [] }], // Text alignment
            ['link', 'image', 'video'], // Links, images, videos
            ['blockquote', 'code-block'], // Blockquote and code block
            ['clean'], // Clear formatting
          ],
        },
      });
   
    
   
       // Return reactive state and functions
       return {
         isModalContactsOpen,
         OpenContacts,
         CloseModalContacts,
         textheader, 
         textmessage,
         sendtime,
         senddate,
         phonenumber,
         SendSms,
         contacts,
         // senderids,
      
         Usetemplate,
         contactlist,
         showalertdialog,
         filteredNumbers,
         contactgrouselected,
         toggleSelectAll,
         selectAllpeople,
         checkSelectAllState,
         hideonecontact,
        //  isModalPickContactsOpen,
        //  closeModalPickContact,
         UseContactGroup, 
        //  SubmitContacts
        editorOptions,
        handleInput
       };
     }
   }
   </script>
   
   <style>
    @import "quill/dist/quill.snow.css";
   </style>
   
  
   