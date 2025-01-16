import { defineStore } from 'pinia';
import axios from '../axios'
// import { getInventory } from '../axios'

export const UseInventoryStore = defineStore('InventoryStore', {

state: () => ({
    data: [], 
    loading: false, 
    error: null,
    successmsg:null,
    searchquery : ''
   }),

    // Add any getters if needed
   getters: {  
    getData: (state) => state.data,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,

    // Filter based on the search Term in the store for multiple rows
    filterProducts: (state) => {
      if (!state.searchquery) { 
      // console.log("data is:",state.data);
        return state.data;
      }

      return state.data.filter(item =>
        item.productName.toLowerCase().includes(state.searchquery.toLowerCase()) ||
        item.productDescription.toLowerCase().includes(state.searchquery.toLowerCase()) ||
        item.productType.toLowerCase().includes(state.searchquery.toLowerCase()) 
        // item.productCategory.toString().includes(state.searchTerm.toLowerCase()) 
        // item.group.toString().includes(state.searchTerm.toLowerCase())
      );
    },
  
    //filter product on category selected
    filterProductCategory: (state) => {
      if (!state.searchCateg) {
        return state.data;
      }

      return state.data.filter(item =>
        item.categoryID === parseInt(state.searchCateg) // Compare both as integers
      ); },
  },

    actions: {  
//fetch all inventory recods
      getallproducts(){     
     
            axios.getproduct()
              .then(response => {
                  this.data = response.data;
                  this.loading = false;
              })
              .catch(error => {
                  this.error=error;
                  this.loading = false;
                  // console.log(error);
              });
          },
         
   
        setSearchProduct(term) {
          this.searchprod = term;
          // console.log(term);
        },

        setSearchCategory(term) {
          this.searchCateg = term;
          // console.log(term);
        },



        AddnewProduct(postData){
          axios.addproduct( postData)
            .then(response => {
              this.successmsg = response.data.statusMessage;
              this.error =false;
            })
            .catch(error=>{ 
              this.successmsg = response.statusMessage;
              this.error = true;
            })
        },
    



    },


});
