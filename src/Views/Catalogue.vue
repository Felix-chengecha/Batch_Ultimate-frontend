<template>

    <div class="rounded-lg border border-gray-200  bg-gray-300 h-full">
      <div class="overflow-x-auto rounded-t-lg py-1 px-1 space-y-2 mt-2">
    
    
    <div class="relative mb-3">
       <span class="text-2xl">Product Catalogue</span>
      <label for="Search" class="sr-only"> Search </label>
    
      <input type="text" id="Search" placeholder="Search for...anything" class="w-1/2 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm absolute right-0"/>
    
      <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="button" class="text-gray-600 hover:text-gray-700">
          <svg    xmlns="http://www.w3.org/2000/svg"  fill="none"  viewBox="0 0 24 24"  stroke-width="1.5"  stroke="currentColor"  class="size-4">
          <path   stroke-linecap="round"       stroke-linejoin="round"   d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
    
        </button>
      </span>
    </div>
    
    
    
        <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-100 mt-4 text-sm rounded">
          <thead class="ltr:text-left rtl:text-right">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ProductID</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Cost</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">In stock</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Supplier</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
    
    
    
            </tr>
          </thead>
    
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, index) in data" :key="index">
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">1</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">1</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">1</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">a</td>
            </tr>
    
      
          </tbody>
        </table>
      </div>
    
      <div class="rounded-b-lg border-t border-gray-200 px-4 py-2">
        <ol class="flex justify-end gap-1 text-xs font-medium">
          <li>
            <a
              href="#"
              class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span class="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>
    
          <li>
            <a
              href="#"
              class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
            >
              1
            </a>
          </li>
    
          <li class="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
            2
          </li>
    
          <li>
            <a
              href="#"
              class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
            >
              3
            </a>
          </li>
    
          <li>
            <a
              href="#"
              class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
            >
              4
            </a>
          </li>
    
          <li>
            <a
              href="#"
              class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span class="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ol>
      </div>
    </div>

  


    
    
    
    </template>  
    
    <script>
    // import { usehistorystore } from '../store/historystore';
    // import {ref} from 'vue';
    
    export default {
      setup() {
        // const historystore = usehistorystore();
        // const isModalOpen = ref(false); 
    
        // function openModal() {
        //     this.isModalOpen = true;
        // }
    
        // function closeModal() {
        //    this.isModalOpen = false;
        // }
    
       
        
        // return {
        // //   data: historystore.getData,
        // //   isLoading: historystore.isLoading,
        // //   error: historystore.getError,
        //   openModal,
        //   closeModal,
        // //   fetchData: historystore.fetchData
        // };
      }
    };
    </script>