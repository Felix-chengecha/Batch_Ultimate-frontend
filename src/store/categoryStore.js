import { defineStore } from 'pinia';
import axios from '../axios';


export const useCategoryStore = defineStore('categoryStore', {
state: () => ({
    data: [], // Array to store API data

    loading: false,
    error: null,
    successmsg:null,
    token : localStorage.getItem('token')
  }),



getters: {
    // Add any getters if needed
    getData: (state) => state.data,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

   actions: { 

    fetchCategories(){     
      this.loading = true;
      this.error = null;   
          axios.getcategory()
            .then(response => {
                // this.data.push(response.products.data.data); 
                this.data = response.data;
                this.loading = false;
            })
            .catch(error => {
                this.error=error;
                this.loading = false;
            });
        },

        AddnewCategory(postData){
          axios.addcategories( postData)
            .then(response => {
              this.successmsg = response.statusMessage;
              this.error =false;
            })
            .catch(error=>{ 
              this.successmsg = response.statusMessage;
              this.error = true;
            })
        },
    
       
      setSearchquery(query) {
          this.searchquery.push(query);
      }    
  },



});
