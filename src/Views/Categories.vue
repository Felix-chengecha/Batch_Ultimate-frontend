<template>

   <div class="rounded-lg border border-gray-200  bg-gray-300 h-full">
     <div class="overflow-x-auto rounded-t-lg py-1 px-1 ">


       <div class="flex items-center justify-center w-full relative ">
 <h2 class="text-3xl font-bold sm:text-2xl text-gray-700 ">Product Categories</h2>
 <a @click="openModal" class="inline-block rounded bg-blue-600 px-2 py-2 mt-4 mr-2 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring focus:ring-yellow-400 absolute right-0">
   Add new Category
 </a>
</div>
   
   
   <div class="relative">
     <label for="Search" class="sr-only"> Search </label>
   </div>
   
   
   
       <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-100 mt-4 text-sm rounded">
         <thead class="ltr:text-left rtl:text-right">
           <tr>
             <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category Name</th>
             <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Code</th>
             <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No of Items</th>
             <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
             <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created on </th>
             <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
           </tr>
         </thead>
   
         <tbody class="divide-y divide-gray-200">
            <tr class="bg-white border-4 border-gray-200" v-for="(item, index) in data" :key="item.categoryID">
             <!-- <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item .categoryID}}</td> -->
             <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.categoryName}}</td>
             <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.categoryCode }}</td>
             <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.noOfItems }}</td>
             <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.status }}</td>
             <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.createdOn }}</td>
              <!-- <p>felo</p> -->
              <td>..</td>
           </tr>

      
         </tbody>
       </table>
     </div>
   
   
   </div>

    <!-- Modal backdrop  to add a new template-->


    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
   <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full">
     <p class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center">ADD NEW CATEGORY</p>


      <div class="px-4 mt-3 sm:px-6 md:col-span-2 lg:px-8">
           <label for="email" class="w-full text-sm text-black">Category Name</label>
           <div class="relative">
           <input type="text" v-model="Cname" class="w-full rounded-lg p-2 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400"  /> <!-- Changed border color to black -->
           </div>
        </div>

        <div class="px-4 mt-3 sm:px-6 md:col-span-2 lg:px-8">
           <label for="email" class="w-full text-sm text-gray-700">Category Code</label>
           <div class="relative">
           <input type="text"  v-model="Ccode" class="w-full rounded-lg p-2 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400"  /> <!-- Changed border color to black -->
           </div>
        </div>


        <div class="px-4 mt-3 sm:px-6 md:col-span-2 lg:px-8">
           <label for="email" class="w-full text-sm text-gray-700">No Of Items</label>
           <div class="relative">
           <input type="text" v-model="CNoItems" class="w-full rounded-lg p-2 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400"  /> <!-- Changed border color to black -->              
           </div>
        </div>

      


       <div class="px-4 text-center sm:px-6 md:col-span-2 lg:px-8">
         <div class="mt-2">
             <label for="message" class="w-full text-sm text-gray-700">Description</label>
             <textarea id="message" rows="3" v-model="Cdescription"
             class="w-full rounded-lg p-2 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-400 border border-gray-400"
             placeholder="Type your product descrition maximum 500 characters"></textarea>    
         </div>



    <a  @click="AddCategory" class="mt-8 inline-block w-full bg-blue-500 rounded-md py-4 text-sm font-bold uppercase tracking-widest text-white"> SUBMIT </a>
  
    <button @click="closeModal" class="bg-black text-white px-1 mt-3 rounded">x</button>

 </div>
 </div>
 </div>
   
   
   </template>  
   
   <script>
   import {useCategoryStore} from '../store/categoryStore'
   import Swal from 'sweetalert2';
   import { computed,ref,onMounted,watch } from 'vue';
   
   export default {
     setup() {
 
       //properties
       const Cname   = ref('');
       const Ccode   = ref('');
       const CNoItems  = ref('');
       const Cdescription  = ref('');

       const isModalOpen = ref(false); 
       const token = ref('your-auth-token'); 
       const submitSuccess = ref('');
      
       //store  properties
         const CategoryStore  = useCategoryStore();
         const filtereddata = CategoryStore .filteredData;
         const data = computed(() => CategoryStore.getData);
         
        //  const isLoading = CategoryStore.loading;
        //  const error = CategoryStore.error;
        //  const hasdata = CategoryStore.hasData;
        //  const searchquery = ref(CategoryStore.searchquery);


       //add product modal
       const openModal = () => {
         isModalOpen.value = true;
       };
       
       const closeModal = () => {
         isModalOpen.value = false;
       }

       //fetch all records on load from the store
       onMounted(()=>{
         CategoryStore.fetchCategories();
         })

       
         
     //add new product to inventory
      const AddCategory = () => {
        
        if(!Validation()){
          return false;
        }
        // else{
   
      const postData = {
        categ: [
          {
            categoryName: Cname.value,
            categoryCode:  Ccode.value,
            noOfItems: CNoItems.value,
            categoryDescription: Cdescription.value,
            status: "1",
            CreatedOn	: "2024-09-15T00:00:00",  
            createdBy: "admin",  
            updatedOn: "",  
            updatedBy: "" 
          }
         ] };

        try {  
        CategoryStore.AddnewCategory(postData);
          setTimeout(() => {
            DisplayMessage("success", CategoryStore.successmsg)
         }, 3000); 
       } catch(error){
        console.log(error);
       }

    } 


     const DisplayMessage=(icon,message) => {
      closeModal();
            Cname.value = "";
            Ccode.value= "";
            CNoItems.value="";
            Cdescription.value= "";

      Swal.fire({
            position: "top-end",
            icon: icon,
            title: message,
            showConfirmButton: false,
            timer: 1500
          });
     }

     const Validation = () => { 

      let isNumeric = /^\d+$/;
        if( Cname.value.trim() === "" && Ccode.value.trim() === "" && CNoItems.value.trim() ==="" &&  Cdescription.value.trim() ==="") {
          DisplayMessage("error", "!!error please fill all the fields");
          return false;     
        }

       else if (!isNumeric.test(CNoItems.value)) {
        DisplayMessage("error", "!!error no of item should be numeric");
        return false;  
      }
      // else{
        return true;
      // }

    }
      
       
       return {
   
      Cname,
      Ccode,
      CNoItems,
      Cdescription,

      data,
      AddCategory,
      openModal,
      closeModal,
      isModalOpen,
      filtereddata,
      Validation,
      DisplayMessage
       };
     }
   };
   </script>