import { defineStore } from 'pinia';
import axios from '../axios';


export const useAccountStore = defineStore('AccountStore', {
state: () => ({
    PersonalDetails: [], // Array to store API data
    BusinessDetails:[],
    AccountDetails:[],
    LogDetails:[],
    Users:[],
    Roles:[],
    Permissions:[],

    Response:null,
    token : localStorage.getItem('token')
  }),



getters: {
    // Add any getters if needed 
    getPersonalDetails: (state) => state.PersonalDetails,
    getBusinessDetails: (state)  =>  state.BusinessDetails,  
    getAccountDetails: (state) =>state.AccountDetails,
    getLogDetails: (state) =>state.LogDetails,
    getUsers: (state) => state.Users,
    getRoles:(state) => state.Roles,
    getPermissions: (state) => state.Permissions,

    getResponse: (state)=> state.Response,
  },

   actions: { 

    fetchPersonalDetails(token,userid){     
          axios.getPersonalDet(token,userid)
            .then(response => {
                this.PersonalDetails = response;
            })
            .catch(error => {
                this.error=error;
            });
        }, 

      fetchBusinessDetails(token){     
             axios.getBusinessDet(token)
            .then(response => {
                this.BusinessDetails = response;
            })
            .catch(error => {
                this.error=error;
            });
        }, 

      EditBusinessDetails(postdata,token){     
             axios.EditBusinessDet(postdata,token)
            .then(response => {
                this.Response = response;
            })
            .catch(error => {
                this.error=error;
            });
        }, 

      fetchAccountDetails(token){     
             axios.getAccountDet(token)
            .then(response => {
                this.AccountDetails = response;
            })
            .catch(error => {
                this.error=error;
            });
        }, 

      fetchLogDetails(token){     
             axios.getLogDet(token)
            .then(response => {
                this.LogDetails = response.data;
            })
            .catch(error => {
                this.error=error;
            });
        },

      fetchUsers(token){     
             axios.getUsers(token)
            .then(response => {
                this.Users = response;
            })
            .catch(error => {
                this.error=error;
            });
        }, 

      fetchRoles(token){     
             axios.getRoles(token)
            .then(response => {
                this.Roles = response;
            })
            .catch(error => {
                this.error=error;
            });
        },

      fetchPermissions(Roleid,token){     
             axios.getPermissions(Roleid,token)
            .then(response => {
                this.Permissions = response;
            })
            .catch(error => {
                this.error=error;
            });
        },



      AddnewUser(postData,token){
          axios.register( postData)
            .then(response => {
              this.Response = response;
            })
            .catch(error=>{ 
              this.error=error;
            })
        }, 

      DeleteUserAsync(Userid,token){
          axios.register( postData)
            .then(response => {
              this.Response = response;
            })
            .catch(error=>{ 
              this.error=error;
            })
        },
    


      AddBusinessDetails(token,postData){
          axios.addBusinessDetails(token, postData)
            .then(response => {
              this.Response = response;
            })
            .catch(error=>{ 
              this.error=error;
            })
        },  

      AddEditPermissions(token,postData){
            axios.addEditPermissions(token, postData)
            .then(response => {
              this.Response = response.data;
            })
            .catch(error=>{ 
              this.error=error;
            })
        }, 

      AddRoles(token,postData){
            axios.addEditRoles(token, postData)
            .then(response => {
              this.Response = response;
            })
            .catch(error=>{ 
              this.error=error;
            })
        }, 

      UpdateOpeningBalance(token,postData){
        axios.UpdateOpeningBalanceAsync(token, postData)
        .then(response => {
          this.Response = response;
        })
        .catch(error=>{ 
          this.error=error;
        })
      }, 


      OpenCloseAccount(token,postData){
        axios.OpenCloseAccountAsync(token, postData)
        .then(response => {
          this.Response = response;
        })
        .catch(error=>{ 
          this.error=error;
        })
      }, 


 
      
       
      setSearchquery(query) {
          this.searchquery.push(query);
      }    
  },



});
