
<template>
  <main class="p-4">
    <!-- Top Buttons and Search -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
      <div class="flex flex-wrap gap-2">
        <a @click="openModal" class="rounded-md border bg-green-400 px-3 py-1 text-sm text-black shadow-sm focus:outline-none">
          ADD NEW CONTACT
        </a>
        <a @click="OpenExcel" class="rounded-md border bg-blue-400 px-3 py-1 text-sm text-white shadow-sm focus:outline-none">
          ADD EXCEL
        </a>
      </div>
      <input type="text" @input="updateSearch" placeholder="Search for...anything" class="w-full sm:w-1/3 rounded-md border-gray-300 py-2 px-4 shadow-sm sm:mt-0 mt-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
    </div>

   
      <div class="text-lg font-medium text-center md:text-left mb-2 md:mb-0">CONTACTS LIST</div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Table Section -->
      <div class="lg:col-span-2 bg-white rounded shadow overflow-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-400 text-gray-900">
            <tr>
              <th class="py-2 px-3 text-left">#</th>
              <th class="px-3 text-left">NAME</th>
              <th class="px-3 text-left">EMAIL</th>
              <th class="px-3 text-left">PHONE NO</th>
              <th class="px-3 text-left">CREATED-BY</th>
              <th class="px-3 text-left">CREATED-AT</th>
              <th class="px-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(contact, index) in filteredItems" :key="contact.id"
                @click="openModalEdit('editmode', contact.name, contact.email, contact.phoneno,contact.status)"
                :class="{
                  'bg-blue-100': selectedRow === index,
                  'hover:bg-gray-100': selectedRow !== index
                }" class="border-b">
              <td class="py-2 px-3">{{ index + 1 }}</td>
              <td class="px-3">{{ contact.username }}</td>
              <td class="px-3">{{ contact.email }}</td>
              <td class="px-3">{{ contact.phoneNumber }}</td>
              <td class="px-3">{{ contact.createdBy }}</td>
              <td class="px-3">{{ contact.createdOn }}</td>
              <td class="px-3"><span class="text-green-500">...</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Sidebar -->

   
  
         <div class="col-span-1 bg-gray-100 h-auto rounded-lg">

              <!-- Header Row -->
    <div class="flex flex-col md:flex-row items-center justify-between bg-gray-100 py-2 px-4 rounded mb-3">
      <div class="flex items-center gap-3">
        <span class="text-lg">MESSAGE TEMPLATES</span>
        <a @click="AddTemplate" class="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-semibold">
          ADD TEMPLATE
        </a>
      </div>
    </div>
    
       <article class="rounded-xl border  border-gray-400">
        <ul>
            <!-- <li v-for="(item, index) in recent.data" :key="index"> -->
        <li>
            <a href="#" class="block h-full rounded-lg border border-gray-900 p-1 hover:border-pink-600">
            <span class="font-medium text-gray-700"></span>
            <p class="mt-1 text-m text-gray-800">  </p>
          </a>
        </li>
      </ul>
      </article>
     </div>
      
    </div>

    <!-- Template Modal -->
    <div v-if="isModalTempOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div class="bg-white w-full max-w-lg p-4 rounded shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center w-full">
            {{ Mode === 'addmode' ? 'ADD NEW MESSAGE TEMPLATE' : 'EDIT MESSAGE TEMPLATE' }}
          </h2>
          <button @click="closeModal" class="bg-black text-white px-2 rounded">x</button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-black">Text Header</label>
            <input type="text" v-model="templateHeader" class="w-full rounded-lg p-2 text-sm border border-gray-300 shadow-sm focus:ring focus:ring-black focus:border-black" />
          </div>
          <div>
            <label class="block text-sm text-black">Enter Body</label>
            <textarea rows="4" v-model="templateBody" class="w-full rounded-lg p-2 text-sm border border-gray-300 shadow-sm focus:ring focus:ring-black focus:border-black" placeholder="Type your message here (max 2000 chars)"></textarea>
          </div>
        </div>

        <div class="mt-4 flex justify-end gap-2">
          <a v-if="Mode === 'addmode'" @click="Submittemplate"
             class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Submit</a>
          <div v-else class="flex gap-2">
            <a @click="Edittemplate" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Edit</a>
            <a @click="DisableTemplate" class="bg-gray-600 text-white px-4 py-2 rounded">Delete</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Excel Upload Modal -->
    <div v-if="isEXCELOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div class="bg-white w-full max-w-md p-4 rounded shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center w-full">UPLOAD EXCEL FILE</h2>
          <button @click="CloseExcel" class="bg-black text-white px-2 rounded">x</button>
        </div>
        <div class="space-y-4">
          <input type="file" @change="handleFileUpload"
                 class="w-full border border-gray-300 rounded px-4 py-2 text-gray-600 focus:outline-none focus:ring focus:ring-gray-400" />
          <button @click="submitExceldata"
                  class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
            Process File
          </button>
        </div>
      </div>
    </div>

    <!-- Add Contact Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div class="bg-white w-full max-w-md p-4 rounded shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center w-full">ADD NEW CONTACT</h2>
          <button @click="closeModal" class="bg-black text-white px-2 rounded">x</button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-black">NAME</label>
            <input type="text" v-model="Name"
                   class="w-full rounded-lg p-2 text-sm border border-gray-300 shadow-sm focus:ring focus:ring-black focus:border-black" />
          </div>
          <div>
            <label class="block text-sm text-black">PHONE NUMBER</label>
            <input type="text" v-model="phone"
                   class="w-full rounded-lg p-2 text-sm border border-gray-300 shadow-sm focus:ring focus:ring-black focus:border-black" />
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
 import { errorState } from '../store/ErrorState';
 export default { 
 
  
   setup() {
    //  const Token = ref(localStorage.getItem('token'));
     const isModalOpen = ref(false);
     const Mode = ref('addmode');
     const isEXCELOpen   = ref(false);
     const isModalTempOpen = ref(false);
     const ContactsExcel  =  ref([]);
     const validationErrors = ref([]);
     const contactgroup = ref('');
     const contactstatus = ref('');
     const Name = ref('');
     const phone = ref('');
     const Email = ref('');
     let currentPage = ref(1);
     const itemsPerPage = 18; 
     const templateHeader = ref('');
     const templateBody = ref('');


     const contactStore = usecontactstore();
   //   const groupstore = useContactGroupstore(); 
     
   //   const contGroup = computed(() => groupstore.getData);
     const contactsStr = computed(() => contactStore.getData);
     const filteredItems = computed(() => contactStore.filteredContacts);
     const Tresponse = computed(()=>contactStore. getsucces);
     //const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));


     watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   ErrorMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		 });
  

   onMounted(() => {
     contactStore.fetchContacts();
   //   groupstore.fetchContactGroup();
    });


    const AddTemplate = () => {
      isModalTempOpen.value= true;
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


    const Submittemplate = () => {

      if(templateHeader.value == " " || templateHeader.value == undefined){
       showalertdialog("error", "header is required");
       return;
      } 
     else if(templateBody.value == " " || templateBody.value == undefined){
       showalertdialog("error", "body no is required");
       return;
     } 
  
     else{



         const data = {
           contacts:[{
               header: templateHeader.value,
               body: templateBody.value,
               status: 1,
           }]
         }
       try{
         contactStore.AddNewTemplate(data);
           contactStore.fetchTemplate(); //reload dataS
       }
       catch(error){
         console.log(error);
       }
      }
     


    }
    // const isModalTempOpen
     // paginate filtered items
  //  const paginatedContacts = computed(() => {
  //    const start = (currentPage.value - 1) * itemsPerPage;
  //    return contactStore.filteredContacts.slice(start, start + itemsPerPage);
  //  });



    //  const nextPage = () => { 
    //    if (currentPage.value < totalPages.value) currentPage.value++;
    //  };

    //  const prevPage = () => {
    //    if (currentPage.value > 1) currentPage.value--;
    //  };

     
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
       isModalTempOpen,
      //  contGroup ,
       openModalEdit,
       Mode,
       showalertdialog,
       Tresponse,
       contactstatus,
       Submittemplate,
       DisplayMessage,

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
       AddTemplate,


     
      //  paginatedContacts,
    //  currentPage,
    //  totalPages,
    //  nextPage,
    //  prevPage,


     };
   },
 };
 </script> 



 