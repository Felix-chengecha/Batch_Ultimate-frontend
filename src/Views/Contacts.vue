<template>
   <main>


 <div class="relative flex flex-col sm:flex-row items-start w-full">
    <div class="flex flex-wrap items-center mt-2 sm:mb-0">
      <span class="text-xl mx-3">CONTACTS</span>

   <a @click="openModal" class="inline-block rounded-md border border-gray-700 bg-green-400 px-2 py-1 text-sm text-white shadow-sm focus:outline-none m-1">
     ADD NEW
   </a>
   <a @click="OpenExcel" class="inline-block rounded-md border border-gray-700 bg-blue-400 px-2 py-1 text-sm text-white shadow-sm focus:outline-none m-1">
     ADD EXCEL
   </a>

 </div>
 <label for="Search" class="sr-only">Search</label>
 <input type="text"  id="Search" @input="updateSearch" placeholder="Search for...anything" class="w-1/3 sm:w-1/3 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm  lg:absolute right-1 mt-2 sm:text-sm"/>
</div> 





 
     <div>
   
     </div>
 
     <!-- <table class="min-w-full table-auto rounded mt-3">
       <thead class="justify-between"> -->
         <div class="overflow-x-auto mt-3">
           <table class="min-w-full table-auto rounded">
             <thead class="justify-between">
         <tr class="bg-gray-400 text-gray-900">
           <th class="py-1 px-2"><span class="text-sm">#</span></th>
           <th class="px-3"><span class="text-sm">NAME</span></th>
           <th class="px-2"><span class="text-sm">EMAIL</span></th>
           <th class="px-4"><span class="text-sm">PHONE NO</span></th>
           <th class="px-2"><span class="text-sm">CONTACT-GROUP</span></th>
           <th class="px-3"><span class="text-sm">STATUS</span></th>
           <th class="px-2"><span class="text-sm">CREATED-AT</span></th>
           <th class="px-1"><span class="text-sm">Action</span></th>
         </tr>
       </thead>
 
       <tbody class="bg-gray-200">
         <tr class="bg-white border-4 border-gray-200" v-for="(contact, index) in paginatedContacts" :key="contact.id"
                                            @click="openModalEdit('editmode', contact.name, contact.email, contact.phoneno,contact.status, contact.group)"  
                                            :class="{'bg-blue-100': selectedRow === index, 'hover:bg-gray-200': selectedRow !== index}"  >
           <td class="py-2">{{ index + 1 }}.</td>
           <td class="px-2">{{ contact.name }}</td>
           <td class="px-2">{{ contact.email }}</td>
           <td class="px-4">{{ contact.mobile }}</td>
           <td class="px-2">{{ contact.groupName }}</td>
           <td class="px-2">{{ contact.status }}</td>
           <td class="px-3">{{ contact.createdon }}</td>
           <td class="px-2">
             <span class="text-green-500">..</span>
           </td>
         </tr>
       </tbody>
     </table>
     </div>

       <!-- Pagination Controls -->
    <div class="flex justify-between mt-4">
     <button @click="prevPage" class="px-4 py-2 bg-gray-300 rounded" :disabled="currentPage === 1">Previous</button>
     <span>Page {{ currentPage }} of {{ totalPages }}</span>
     <button @click="nextPage" class="px-4 py-2 bg-gray-300 rounded" :disabled="currentPage === totalPages">Next</button>
   </div>
   
   
     <!-- excel upload modal -->
     <div v-if="isEXCELOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
     <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full">
       <div class="relative flex items-center justify-center">
         <p class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center">UPLOAD EXCEL FILE</p>
         <button @click="CloseExcel" class="absolute right-0 bg-black text-white px-1 rounded">x</button>
       </div>
    <div class="flex flex-col space-y-2 mt-10">
     <input  type="file" @change="handleFileUpload"  class="border border-gray-300 rounded-md px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"/>
     <button @click="submitExceldata" class="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 w-1/2 justify-center items-center ml-20 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
       Process File
     </button>
    </div>
     </div>
   </div>  

  
 
     <!-- Modal code here -->
     <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
   <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full">
     <div class="relative flex items-center justify-center">
       <p class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center">ADD NEW CONTACT</p>
       <button @click="closeModal" class="bg-black text-white px-2 ml-10 rounded">x</button>
       </div>


       <div class="p-2 sm:p-6 md:col-span-2 lg:p-8">
           <label for="email" class="w-full text-sm text-black">NAME</label>
           <div class="relative">
               <input
                   type="text"
                   v-model="Name"
                   class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-black focus:ring-black border border-gray-700"
               />
           </div>
       </div>

       <div class="p-2 sm:p-6 md:col-span-2 lg:p-8">
           <label for="email" class="w-full text-sm text-black">PHONE NUMBER</label>
           <div class="relative">
               <input
                   type="text"
                   v-model="phone"
                   class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-black focus:ring-black border border-gray-700"
               />
           </div>
       </div>

       <div class="p-2 sm:p-6 md:col-span-2 lg:p-8">
           <label for="email" class="w-full text-sm text-black">EMAIL ADDRESS</label>
           <div class="relative">
               <input
                   type="text"
                   v-model="Email"
                   class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-black focus:ring-black border border-gray-700"
               />
           </div>
       </div>

        <div v-if="Mode === 'editmode'" class="flex items-center mt-3">
           <label for="checkbox" class="ml-2 text-gray-700">Status</label>
           <input type="checkbox" v-model="contactstatus" id="checkbox" class="w-4 h-4 ml-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
         </div>

       <!-- Button container -->
       <div class="flex justify-end space-x-2 ">
           <a @click="AddContact" class="inline-block bg-blue-500 rounded-md py-2 px-4 text-sm font-bold uppercase tracking-widest text-white">SUBMIT</a>

           <div v-if="Mode === 'editmode'" class="flex items-center space-x-2">
               <!-- <a @click="DeleteTemplate" class="bg-red-800 rounded-md py-2 px-4 text-sm"></a> -->
               <a @click="DisableTemplate" class="bg-gray-700 rounded-md py-2 px-4 text-white text-sm">DELETE</a>
           </div>

       </div>
   </div>
</div>

 
   </main>
 </template>
 
 <script>
 import { usecontactstore } from '../store/contactstore';
//  import { useContactGroupstore } from '../store/ContactGroupstore';
 import { ref, computed, onMounted, watch } from 'vue';
 import Swal from 'sweetalert2';
//  import * as XLSX from 'xlsx';
 
 export default {
  
   setup() {
     const Token = ref(localStorage.getItem('token'));
     const isModalOpen = ref(false);
     const Mode = ref('addmode');
     const isEXCELOpen   = ref(false);
     const ContactsExcel  =  ref([]);
     const validationErrors = ref([]);
     const contactgroup = ref('');
     const contactstatus = ref('');
     const Name = ref('');
     const phone = ref('');
     const Email = ref('');
     let currentPage = ref(1);
     const itemsPerPage = 18; 


     const contactStore = usecontactstore();
   //   const groupstore = useContactGroupstore(); 
     
   //   const contGroup = computed(() => groupstore.getData);
     const contactsStr = computed(() => contactStore.getData);
     const filteredItems = computed(() => contactStore.filteredContacts);
     const Tresponse = computed(()=>contactStore. getsucces);
     const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));



  

   onMounted(() => {
     contactStore.fetchContacts();
   //   groupstore.fetchContactGroup();
    });

     // paginate filtered items
   const paginatedContacts = computed(() => {
     const start = (currentPage.value - 1) * itemsPerPage;
     return contactStore.filteredContacts.slice(start, start + itemsPerPage);
   });


     const nextPage = () => { 
       if (currentPage.value < totalPages.value) currentPage.value++;
     };

     const prevPage = () => {
       if (currentPage.value > 1) currentPage.value--;
     };

     
       // Watch the Tresponse and trigger SweetAlert when the response changes
   watch(Tresponse, (newValue) => {
     if (newValue && typeof newValue === 'object') {
     // SweetAlert for success
       if (newValue.success) {
         Swal.fire({
           position: 'top-end',
           icon: 'success',
           // title: 'Contact Group added by successfully',
           title: newValue.msg,
           showConfirmButton: false,
           timer: 2500,
         });
       }
         // SweetAlert for failure
       else {
         Swal.fire({
           position: 'top-end',
           icon: 'error',
           title: newValue.msg,
           // title: 'Failed to add Contact Group',
           showConfirmButton: false,
           timer: 2500,
         });
       }
     }
   });
   
    //function to handle contact list search
   const updateSearch = (e) => { 
     currentPage.value = 1;
       contactStore.setSearchTerm(e.target.value);
   };

     //function to handle file upload
   const handleFileUpload = (event) => {
       const file = event.target.files[0];
       const reader = new FileReader();
       reader.onload = (e) => {
         const data = new Uint8Array(e.target.result);
         const workbook = XLSX.read(data, { type: 'array' });
         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
         const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

         // Extract the headers from the first row of the file
       //  headers = json[0];
         // Validate headers
   
       // Convert the 2D array to an array of objects
       ContactsExcel.value = json.slice(1).map(row => ({
         name: row[0],
         client: row[1],
         phoneno: row[2],
         email: row[3],
         status:row[4],
         group: row[5],
         }));
      };
      reader.readAsArrayBuffer(file);
    };

   // functiom to validate excel data for errors
   const validateExcel = () => {
     validationErrors.value = []; // Reset errors
     ContactsExcel.value.forEach((contact, index) => { 

       if (!contact.name) {
         validationErrors.value.push(`Row ${index + 1}: Name is required.`);
         console.log(1);
       }

       if (!contact.email) {
         validationErrors.value.push(`Row ${index + 1}: Email is required.`);
         console.log(1);
         // showErrorAlert();
       }
       if (!contact.phoneno) {
         validationErrors.value.push(`Row ${index + 1}: Phone is required.`);
         // showErrorAlert();
         console.log(2);
       }

       if (!contact.status) {
         validationErrors.value.push(`Row ${index + 1}: status is required.`);
         // showErrorAlert();
         console.log(2);
       }

       // Add more validation as needed
     });
   }; 

   // submit  or save contact list in excel file
   const submitExceldata = async () => {
     validateExcel(); // Validate before submission

         if (validationErrors.value.length) {
           message.value = 'Please fix the validation errors.';
           // showErrorAlert();
           return; // Stop submission if there are errors
         } 

         try{
         contactStore.AddNewContacts({contacts: ContactsExcel.value});
            closeModal(); 
            contactStore.fetchContacts(); //reload dataS
        }
       catch(error){
         console.log(error);
         // showErrorAlert();
       }
   } 

     // Function to add a single contact 
     const AddContact = () => {   

      if(Name.value == " " || Name.value == undefined){
       showalertdialog("error", "name is required");
       return;
      } 
     else if(phone.value == " " || phone.value == undefined){
       showalertdialog("error", "phone no is required");
       return;
     } 
     else if(Email.value == " " || Email.value == undefined){
       showalertdialog("error", "Email is required");
       return;
     }
     else{



         const data = {
           contacts:[{
             clientid: generateUnique6DigitCode(),
               groupName: contactgroup.value,
               name: Name.value,
               mobile: phone.value,
               email: Email.value,
               status: 1,
           }]
         }
       try{
         contactStore.AddNewContacts(data);
           closeModal(); 
           contactStore.fetchContacts(); //reload dataS
       }
       catch(error){
         console.log(error);
       }
      }
     }

 
     
 
     const openModal = () => { 
       Mode.value = "addmode";
       Name.value = " ",
       phone.value = " ";
       contactgroup.value =" ",
       Email.value  = " ";
       isModalOpen.value = true;
     };

     const closeModal = () => {
       isModalOpen.value = false;
     };

     //close excel upload modal
     const CloseExcel = () => {
        isEXCELOpen.value = false;
     }

     //open excel upload modal 
     const OpenExcel = () => {
        isEXCELOpen.value = true;
    }
     

       //open modal for editing contacts
     const openModalEdit = (mode, name, email,phoneno, status, group) => { 
       const stat = status;
       const statusBoolean = stat === 'A  ctive'; 

       isModalOpen.value = true;
       Mode.value = mode;
       Name.value = name,
       phone.value =phoneno;
       contactgroup.value =group,
       Email.value  = email;
       contactstatus.value =statusBoolean
       console.log(statusBoolean);
       }

    const  generateUnique6DigitCode =()=>{

     const timestamp = Date.now().toString();
     const uniqueNumber = timestamp.slice(-6); // Get the last 6 digits
     const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Generate a random letter A-Z
     return randomLetter + uniqueNumber; 
    }



     const showalertdialog = (icon,resp) => {
         Swal.fire({
           position: "top-end",
           icon:  icon,
           title: resp,
           showConfirmButton: false,
           timer: 1500
         });
   };
 
     return {
       filteredItems,
       updateSearch,
       AddContact,
       generateUnique6DigitCode,
       openModal,
       closeModal,
       isModalOpen,
       contactgroup,
       contactsStr,
      //  contGroup ,
       openModalEdit,
       Mode,
       showalertdialog,
       Tresponse,
       contactstatus,
   
       

       Name,
       phone,
       Email,
       validationErrors,

       isEXCELOpen,
       OpenExcel,
       CloseExcel,
       handleFileUpload,
       validateExcel,
       submitExceldata,
       ContactsExcel,
       paginatedContacts,
     currentPage,
     totalPages,
     nextPage,
     prevPage,


     };
   },
 };
 </script>
 