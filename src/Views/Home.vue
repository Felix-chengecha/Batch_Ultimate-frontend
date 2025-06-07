

<template>

    <main class="flex-1 bg-gray-100 px-3">
       <div class="container mx-auto">
             <h1 class="text-1xl font-semibold text-gray-700">Welcome back felix</h1>
             <div class="mt-2">
                <!-- Add your content here -->
                <div class="bg-white py-7 rounded-lg shadow-md">  
 
 
              <!--Section one to contain cards with minimum details   -->
                <div class="grid grid-cols-1 gap-8 px-4 lg:grid-cols-2 xl:grid-cols-4">
            
                  <!-- card one -->
                 <div class="flex items-center justify-between p-4 bg-slate-400  rounded-md dark:bg-darker">
                   <div>
                     <h6 class="text-xs font-medium leading-none tracking-wider text-gray-800 uppercase dark:text-primary-light">Total sales</h6>
                     <span class="text-xl font-semibold">{{noTransactions}}</span>
                     <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md"> +4.4% </span>
                   </div>
                   <div>
                     <span>
                       <svg viewBox="0 0 24 24" class="w-12 h-12 text-gray-300 dark:text-primary-dark"  xmlns="http://www.w3.org/2000/svg"  fill="none" >
                         <path  stroke-linecap="round"    stroke-linejoin="round"    stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                       </svg>
                     </span>
                   </div>
                 </div>
 
                 <!-- card two-->
                 <div class="flex items-center justify-between p-4 bg-slate-400  rounded-md dark:bg-darker">
                   <div>
                     <h6 class="text-xs font-medium leading-none tracking-wider text-gray-800 uppercase dark:text-primary-light"> Users </h6>
                     <span class="text-xl font-semibold"> {{ availableProducts }}</span>
                     <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md"> +2.6% </span>
                   </div>
                   <div>
                     <span>
                       <svg class="w-12 h-12 text-gray-300 dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24"     stroke="currentColor">
                         <path stroke-linecap="round"  stroke-linejoin="round"   stroke-width="2"   d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                       </svg>
                     </span>
                   </div>
                 </div>
 
                 <!--Card THREE -->
                 <div class="flex items-center justify-between p-4 bg-slate-400 rounded-md dark:bg-darker">
                   <div>
                     <h6 class="text-xs font-medium leading-none tracking-wider text-gray-800 uppercase dark:text-primary-light"> Orders </h6>
                     <span class="text-xl font-semibold">{{totalSales}}</span>
                     <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md"> +3.1% </span>
                   </div>
                   <div>
                     <span>
                       <svg class="w-12 h-12 text-gray-300 dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg"   fill="none"   viewBox="0 0 24 24" stroke="currentColor">
                         <path  stroke-linecap="round"  stroke-linejoin="round"  stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                       </svg>
                     </span>
                   </div>
                 </div>
 
                 <!--Card Four -->
                 <div class="flex items-center justify-between p-4 bg-slate-400 rounded-md dark:bg-darker">
                   <div>
                     <h6 class="text-xs font-medium leading-none tracking-wider text-gray-800 uppercase dark:text-primary-light"> Total cash </h6>
                     <span class="text-xl font-semibold">{{ totalCash }} ksh</span>
                     <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">+3.1% </span>
                   </div>
 
                   <div>
                     <span>
                       <svg class="w-12 h-12 text-gray-300 dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round"  stroke-linejoin="round"  stroke-width="2"  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"  />
                       </svg>
                     </span>
                   </div>
                 </div>
               </div>
 
             <!-- section three contains a small table and a data table -->
             

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 h-auto mt-9 bg-gray-200 p-2 md:p-4 rounded shadow">
                  <!-- Chart Section: Full width on mobile, 2/3 on md+ -->
                  <div class="md:col-span-2 bg-gray-200 h-auto flex justify-center items-center"> 
                    <canvas id="salesChart" class="w-full max-w-full h-40 sm:h-56 md:h-64 lg:h-72"></canvas> 
                  </div>

                  <!-- Recent Sales Section: Full width on mobile, 1/3 on md+ -->
                  <div class="bg-gray-100 h-auto rounded-lg p-3">
                    <div class="flex items-center justify-center mb-3">                      
                      <h3 class="text-center font-semibold text-gray-700 text-lg">Recent Sales</h3>
                    </div>

                    <article class="rounded-xl border border-gray-300 p-2">
                      <ul>
                        <li v-for="(item, index) in recent.data" :key="index" class="mb-2">
                          <a href="#" class="block rounded-lg border border-gray-300 p-2 hover:border-pink-600 transition">
                            <span class="block font-medium text-gray-700">{{ item.transactionID }}</span>
                            <p class="text-sm text-gray-800">{{ item.totalCost }}</p>
                            <p class="text-sm text-gray-800">{{ item.quantity }}</p>
                            <p class="text-sm text-gray-800">{{ item.timeOfDay }}</p>
                          </a>
                        </li>
                      </ul>
                    </article>
                  </div>
                </div>



                   
             </div>
 
            </div>
 
         </div>
       </main>
  
 </template>
 
  
 
 
   <script>
 import Chart from 'chart.js/auto';
 import {useDashboardStore} from '../store/DashboardStore';
 import { ref, watch, onMounted, computed } from 'vue'; 
 export default {
   setup() { 
 
  let salesChart =null;
  const dashStore = useDashboardStore();    
    const graph = computed(() => dashStore.getGraph); 
    const average = computed(() => dashStore.getAverages);
    const recent = computed(()=> dashStore.getRecentsalesData);

    onMounted(() => { 
     dashStore.getGraphData();
     dashStore.getDashboardAverages();
     dashStore.getRecentSales();
     if (salesChart) {
        salesChart.destroy();
       }
     });
    
    const noTransactions = computed(() => average.value.data?.noTransactions ?? 0);
    const availableProducts = computed(() => average.value.data?.availableProducts ?? 0);
    const totalSales = computed(() => average.value.data?.totalSales ?? 0);
    const  totalCash = computed(() => average.value.data?.totalCash ?? 0);

  watch(graph, () => {
    const labels = graph.value.data.map(item => new Date(item.date).toLocaleDateString());
    const dataPoints = graph.value.data.map(item => item.totalSales);
    if (salesChart) {
        salesChart.destroy();
     }
    renderChart(dataPoints,labels,chartOptions);
  });



   const chartOptions =  {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Sales (in KSH)',
          },
          beginAtZero: true,
        },
      },
    };


  const renderChart =(dataPoints,labels,chartOptions) => {
    if (salesChart) {
        salesChart.destroy(); // Destroy the previous instance
    }
    const ctx = document.getElementById('salesChart').getContext('2d');

      // Fallback if data is empty or invalid
      if (!Array.isArray(dataPoints) ) {
        console.warn('Graph data is empty or invalid');
        return;
      }

      // Create chart instance
      salesChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Sales',
              data: dataPoints,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        },
        options: chartOptions,
      });
    };
 
  return{
    dashStore,
    graph,
    recent,
      noTransactions,
      availableProducts,
      totalSales,
      totalCash
      // dataPoints,
      // labels,
      // salesDatat
    // average,

  }

   }
 };
 </script>
 
 
 
 
 
  
  <style scoped>
 
  </style>
  