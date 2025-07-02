<template>
  <main class="flex-1 bg-gray-50 px-4 py-6">
    <div class="container mx-auto max-w-7xl">
      <div class="mb-6">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Welcome back, Felix</h1>
        <p class="text-gray-500 mt-1">Here's what's happening with your store today</p>
      </div>
      
      <!-- Stats Cards Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <!-- Card 1: Total Sales -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Sales</p>
              <div class="flex items-baseline mt-2">
                <h3 class="text-2xl font-semibold text-gray-900">{{noTransactions}}</h3>
                <span class="ml-2 text-sm font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded-full">+4.4%</span>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-blue-50 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Card 2: Users -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Products</p>
              <div class="flex items-baseline mt-2">
                <h3 class="text-2xl font-semibold text-gray-900">{{ availableProducts }}</h3>
                <span class="ml-2 text-sm font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded-full">+2.6%</span>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-purple-50 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Card 3: Orders -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Orders</p>
              <div class="flex items-baseline mt-2">
                <h3 class="text-2xl font-semibold text-gray-900">{{totalSales}}</h3>
                <span class="ml-2 text-sm font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded-full">+3.1%</span>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-orange-50 text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Card 4: Total Cash -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Cash</p>
              <div class="flex items-baseline mt-2">
                <h3 class="text-2xl font-semibold text-gray-900">{{ totalCash }} ksh</h3>
                <span class="ml-2 text-sm font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded-full">+3.1%</span>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-green-50 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart and Recent Sales Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Chart Section -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-800">Sales Overview</h2>
            <div class="flex space-x-2">
              <button class="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Week</button>
              <button class="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">Month</button>
              <button class="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Year</button>
            </div>
          </div>
          <div class="h-80">
            <canvas id="salesChart" class="w-full h-full"></canvas>
          </div>
        </div>

        <!-- Recent Sales Section -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-800">Recent Transactions</h2>
            <button class="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          
          <div class="space-y-4">
            <div v-for="(item, index) in recent.data" :key="index" class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="flex-shrink-0 p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-900">Order #{{ item.transactionID }}</p>
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{{ item.quantity }} items</span>
                  <span>{{ item.timeOfDay }}</span>
                </div>
                <p class="text-sm font-semibold text-gray-800 mt-1">{{ item.totalCost }} KSH</p>
              </div>
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
    const totalCash = computed(() => average.value.data?.totalCash ?? 0);

    watch(graph, () => {
      const labels = graph.value.data.map(item => new Date(item.date).toLocaleDateString());
      const dataPoints = graph.value.data.map(item => item.totalSales);
      if (salesChart) {
        salesChart.destroy();
      }
      renderChart(dataPoints,labels,chartOptions);
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          backgroundColor: '#1F2937',
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 12
          },
          padding: 12,
          cornerRadius: 8,
          displayColors: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#6B7280'
          }
        },
        y: {
          grid: {
            color: '#E5E7EB'
          },
          ticks: {
            color: '#6B7280'
          },
          beginAtZero: true,
        },
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 4,
          hoverRadius: 6,
          backgroundColor: '#3B82F6',
          borderColor: '#fff',
          borderWidth: 2
        }
      }
    };

    const renderChart =(dataPoints,labels,chartOptions) => {
      if (salesChart) {
        salesChart.destroy();
      }
      const ctx = document.getElementById('salesChart').getContext('2d');

      if (!Array.isArray(dataPoints)) {
        console.warn('Graph data is empty or invalid');
        return;
      }

      salesChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Sales',
              data: dataPoints,
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: chartOptions,
      });
    };
 
    return {
      dashStore,
      graph,
      recent,
      noTransactions,
      availableProducts,
      totalSales,
      totalCash
    }
  }
};
</script>

<style scoped>
/* Smooth transitions for interactive elements */
button, a {
  transition: all 0.2s ease;
}

/* Custom scrollbar for the recent transactions */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>