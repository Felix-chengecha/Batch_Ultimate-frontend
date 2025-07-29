import { defineStore } from 'pinia';
import axios from '../axios';


export const Useuserstore = defineStore('userstore', {
  state: () => ({ 
    AllDetails:[],  
   
    name: '',
    status:'',
    token:'',
    userId:'',
    // role:'',
    statusMessage:'',
    IsLoggedIn: false,
    
  }),

  getters: { 
    getAllDetails: (state) => state.AllDetails,
    getname:(state) => state.name,
    getuserId:(state) => state.userId,
    getStatus:(state) => state.status,
    getIsLoggedIn:(state) => state.IsLoggedIn,
    getToken:(state) => state.token,
  },

  actions: {  

    async LoginUser(ldata) {
      try { 
        const response = await axios.ulogin(ldata);
          this.AllDetails = response; 
           if (this.AllDetails) {
            this.name = response.name;
            this.token = response.token;
            this.status = response.status;
            this.role = response.role;
            this.userId = response.userId;
            this.IsLoggedIn = true
           }
      } catch (error) {
        this.error = error;
      }
    },  

    async refreshToken(){
      try {
        const response = await axios.refreshToken();
          this.AllDetails = response; 
          console.log("ehee", response);
           if (this.AllDetails) { 
            this.token = response.token.result;
            console.log("refresh",this.token);
          }
      } catch (error){
        this.error = error;
      }
    } 
   
  }
})

