import { defineStore } from 'pinia';
import {useCategoryStore} from '../store/categoryStore';
 import {UseInventoryStore} from '../store/InventoryStore';
 import { useSuppliersStore } from '../store/SuppliersStore';
//  import { useSuppliesStore } from '../store/SuppliesStore';
 import {useTransactionStore} from '../store/TransactionsStore'



export const useReportStore = defineStore('ReportStore', {
state: () => ({
    categories: [], // Array to store API data
    products:[],
    suppliers:[],
    suplies:[],
    transctions:[],
    successmsg:null,
    success: false,
    error: null,
    searchquery : '',
    searchableFields : [],
    token : localStorage.getItem('token')
  }),



getters: {
    // Add any getters if needed
    // getData: (state) => state.data,
     
    getcategories:(state) => state.categories,
    getproducts:(state) => state.products,
    getsuppliers:(state) => state.suppliers,
    getsuplies:(state) => state.suplies,
    gettransctions:(state)=>state.transctions,
    getsuccess: (state) => state.success,
    getError: (state) => state.error,

    // filterTransactions: (state) => {
    //     if (!state.searchquery) { 
    //     // console.log("data is:",state.data);
    //       return state.data;
    //     }
  
    //     return state.data.filter(item =>
    //       item.productName.toLowerCase().includes(state.searchquery.toLowerCase()) ||
    //       item.productDescription.toLowerCase().includes(state.searchquery.toLowerCase()) ||
    //       item.productType.toLowerCase().includes(state.searchquery.toLowerCase()) 
       
    //     );
    //   } 


      filterTransactions: (state) => {
        if (!state.searchquery) {
          return state.data;
        }
      
        const query = state.searchquery.toLowerCase();
        //const searchableFields = ['productName', 'productType', 'productDescription'];
      
        const results = state.data.filter((item) => {
          return state.searchableFields.some((field) =>
            item[field] && item[field].toLowerCase().includes(query)
          );
        });
      
        return results;
      }
      

  }, 



   actions: {  

      fetchCategories(){      
             const categStore = useCategoryStore();
              this.categories  = categStore.fetchCategories();
            },

        fetchProducts(){
          const productStore = UseInventoryStore();
          this.products = productStore.getallproducts();
        },   

        fetchSuppliers(){
            const supplierStore = useSuppliersStore();
          this.suplies = supplierStore.getallSupliers(); 
        },

        fetchSupplies(){
          const supplieStore = useSuppliesStore();
        this.suppliers = supplieStore.getallSuplies(); 
       },

       fetchTransactions(){
        const transactionstore = useTransactionStore();
      this.transctions = transactionstore.fetchTransactions(); 
     },

       

        setSearchTrasaction(term) {
          this.searchprod = term;
          // console.log(term);
        },

        setSearchCategory(term) {
          this.searchCateg = term;
          // console.log(term);
        },
        
        setSearchproduct(term) {
          this.searchCateg = term;
          // console.log(term);
        },

        setSearchSupplies(term) {
          this.searchCateg = term;
          // console.log(term);
        },

        setSearchSupplier(term) {
          this.searchCateg = term;
          // console.log(term);
        },


      }

});