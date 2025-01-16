<template>
  <!-- <div class="flex w-screen h-screen overflow-hidden"> -->
    <div class="h-screen w-screen flex flex-col">

    <Navbar class="h-16" />

    <div class="flex flex-1">
   
    <Sidebar class="h-full  bg-gray-800 text-white " />


      <!-- Main Content Area (Scrollable) -->
      <main class="flex-1 bg-gray-100  overflow-y-auto">
        <!-- RouterView will display the current route's content -->
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import { ref, watch, onMounted, computed } from 'vue'; 
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue'; 
import {useDashboardStore} from '../store/DashboardStore'

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    Sidebar,
  },

  setup() {
    // const dashStore = useDashboardStore();
    // const average = computed(() => dashStore.getAverages);
    // const graph = computed(() => dashStore.getGraph);



  // onMounted(() => {
    
  //    dashStore.getGraphData();
  //    dashStore.getDashboardAverages();
       


  // //   });
  // return{
  //   dashStore,
  //   average,
  //   graph
  // }

   },
};
</script>





<style scoped>
html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
</style>
