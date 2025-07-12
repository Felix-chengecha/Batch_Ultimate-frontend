import { defineStore } from 'pinia';
import axios from '../axios';

export const useReportStore = defineStore('ReportStore', {
  state: () => ({
    reportData: [],
    success: false,
    error: null,
    token: localStorage.getItem('token')
  }),

  actions: {  
    async FetchReportData(postData) {
      try {
        this.success = false;
        this.error = null;
        
        const response = await axios.getReportData(postData);
        
        // Ensure we have an array of data
        this.reportData = Array.isArray(response.data) ? response.data : [response.data];
        this.success = true;
        
        return this.reportData;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      }
    },

    clearReportData() {
      this.reportData = [];
      this.success = false;
      this.error = null;
    }
  }
});