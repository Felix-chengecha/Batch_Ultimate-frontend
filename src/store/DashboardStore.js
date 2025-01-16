// stores/sidebar.js
import { defineStore } from 'pinia';
import axios from '../axios'


export const useDashboardStore = defineStore('DashboardStore', {

  state: () => ({
    graph: [], 
    averages:[],
    recentSales:[],
    loading: false, 
    isSidebarVisible: false,
    error: null
  }),
  getters:{
    getGraph: (state) => state.graph,
    getAverages: (state) => state.averages,
    getRecentsalesData: (state) => state.recentSales,

    isLoading: (state) => state.loading,
    getError: (state) => state.error,

    filterSidebar: (state) => {
        return state.isSidebarVisible;
  },


  },
  actions: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    getDashboardAverages(){     
      axios.getDashboardAverages()
        .then(response => {
            this.averages = response;
            this.loading = false;
        })
        .catch(error => {
            this.error=error;
            this.loading = false;
            // console.log(error);
        });
    },

    getGraphData(){     
      axios.getGraphData()
        .then(response => {
            this.graph = response;            
            this.loading = false;
        })
        .catch(error => {
            this.error=error;
            this.loading = false;
            // console.log(error);
        });
    },

    getRecentSales(){     
      axios.getRecentSalesData()
        .then(response => {
            this.recentSales = response;            
            this.loading = false;
        })
        .catch(error => {
            this.error=error;
            this.loading = false;
            // console.log(error);
        });
    },

  }
});
