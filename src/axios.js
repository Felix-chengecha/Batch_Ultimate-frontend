import axios from 'axios';
import { errorState } from '../src/store/ErrorState'
import {useRouter } from 'vue-router'


const router = useRouter(); 

let dynamicBaseURL = 'https://localhost:7231/api/' 

let token = localStorage.getItem('token');

const apiClient = axios.create({
  baseURL: dynamicBaseURL, //'http://localhost:5134/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    const errMsg = error.response?.data?.message || error.message
    const errCode = error.response?.status || null
    errorState.message = errMsg
    errorState.code = errCode 

    if (!error.response) {
       router.push('/login')
    }

    return Promise.reject(error)
  }
)



function setBaseURL(url) {
  dynamicBaseURL = url
  apiClient.defaults.baseURL = url 
}


export default { 

//-------------------------------------------------
    //USER AUTHENTICATION ENDPOINTS 
//-------------------------------------------------
  register(postData) {
    return apiClient.post(`/Authentication/Register`, postData, {
      })
      .then(response => {
        return response.data;
      });
  },

//LOGIN USER
  ulogin(postData) { 
      setBaseURL(postData.env);
      delete postData.env;
    return apiClient.post(`Authentication/Login`, postData, {
      })
      .then(response => {
        return response.data;
      });
  },

  //USER ACCOUNT DETAILS
    getccountdetails(token) {
      return apiClient.get(`/accountdetails/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  },

  //get user account details   
  getUserdetails(token,userid) {
      return apiClient.get(`/UserDetails/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  },




//-------------------------------------------------
   //Dashboard ENDPOINTS
//-------------------------------------------------
  getDashboardAverages() {
    return apiClient.get(`/Dashboard/SalesAverages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},

getGraphData() {
  return apiClient.get(`/Dashboard/Graphdata`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
  return response;
});
},

getRecentSalesData() {
  return apiClient.get(`/Dashboard/RecentSales`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
  return response;
});
},


//-------------------------------------------------
   //Report ENDPOINTS
//-------------------------------------------------
  getReportData(postData) {
    return apiClient.post(`/Reports/Generate`,postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},

exportReportData(postData){
  return apiClient.post('/Reports/JasperReports',postData,{
    headers : {
      Authorization: `Bearer ${token}`,
      Accept : "application/pdf",
    },
    responseType : 'blob'
  })
    .then(response =>{
      return response;
    });
},

//-------------------------------------------------
   //product ENDPOINTS
//-------------------------------------------------
  addproduct(postData) { 
    // console.log(postData);

    return apiClient.post('/Products/AddProducts', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response;
    });
  },
  

    getproduct() { 
      return apiClient.post('/Products/GetProducts', {},  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => { 
        return response;
      });
    },

  //update product
  updateproduct(id, updateData, token) {
        return apiClient.put(`/updateproduct/${id}`, updateData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          return response.data;
        });
  },

  //delete product
  deleteproduct(id, token) {
    return apiClient.delete(`/deleteproduct/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },



//-------------------------------------------------
   //SUPPLIER ENDPOINTS
//-------------------------------------------------
//add supplier
  addsupplier(postData) {
    return apiClient.post('/Suppliers/AddSupplier', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response;
    });
  },


 //get all supplier
  getsupplier() { //token
    return apiClient.post('/Suppliers/GetSuppliers', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
     })
     .then(response => {
      return response.data;
    });
  },


 //update supplier
 updatesupplier(id, updateData, token) {
  return apiClient.put(`/updatesupplier/${id}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

//delete supplier
  deletesupplier(id, token) {
  return apiClient.delete(`/deletesupplier/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  });
  },



  //-------------------------------------------------
   //SUPPLIES ENDPOINTS
//-------------------------------------------------
//http://localhost:5134/api/Suppliers/AddSupplier
//add supplies
addsupplies(postData) {
  return apiClient.post('/Suppliers/AddSupplier', postData, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  })
  .then(response => {
    return response;
  });
},


//get all supplies
getsupplies() { //token
  return apiClient.post('/Suppliers/GetSuppliers',  {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
   })
   .then(response => {
    return response.data;
  });
},


//update supplier
updatesupplies(id, updateData, token) {
return apiClient.put(`/updatesupplier/${id}`, updateData, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
  return response.data;
});
},

//delete supplies
deletesupplies(id, token) {
return apiClient.delete(`/deletesupplier/${id}`, {
headers: {
  Authorization: `Bearer ${token}`,
},
});
},

getSupplierTransactions(id){
  return apiClient.delete(`/deletesupplier/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
    });
},



  
//-------------------------------------------------
   //TRANSACTIONS ENDPOINTS
//-------------------------------------------------

  
//Add transactions
//	 http://localhost:5134/api/Transactions/AddSales'
// return apiClient.post('/Ultimate/AddProducts', postData, {  addtransaction
addtransaction(postData) {
  return apiClient.post('/Transactions/AddSales', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},

// get one Transaction
getTransactions() {
  return apiClient.post('/Transactions/GetTransactions', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},



//update transactions
updateTransaction(id, updateData, token) {
return apiClient.put(`/updateTransaction/${id}`, updateData, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
  return response.data;
});
},

//delete transactions
deletetransaction(id, token) {
return apiClient.delete(`/deletetransaction/${id}`, {
headers: {
Authorization: `Bearer ${token}`,
},
});
},



//-------------------------------------------------
   //CATALOGUE ENDPOINTS
//-------------------------------------------------

  //Add catalogue
  addcatalogue(postData, token) {
    return apiClient.post('/addcatalogue', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  },


  //get catalogue
  getcatalogue() {
    return apiClient.post('/Catalogue/GetCatalogue', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  }, 

   getActivecatalogue() {
    return apiClient.post('Catalogue/GetActiveCatelogue', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  }, 

  //

   //update catalogue
   updatecatalogue(id, updateData, token) {
    return apiClient.put(`/updatecategory/${id}`, updatecatalogue, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    })
  .catch((error)=>{
      // console.log(error);
    })
},

//delete catalogue
deletecatalogue(id, token) {
return apiClient.delete(`/deletecatalogue/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
},


//-------------------------------------------------
   //CATEGORIES ENDPOINTS
//-------------------------------------------------
  //Add Categories
  addcategories(postData) { 
    return apiClient.post(`/Category/AddCategory`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => { 
      return response.data;
    });
  },


  //get category
  getcategory() {
    return apiClient.post('/Category/GetCategory',  {},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => { 
      return response;
    });
  },

   //update category
   updatecategory(id, updateData, token) {
    return apiClient.put(`/updatecategory/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
},

//delete category
deletecategory(id, token) {
return apiClient.delete(`/deletecategory/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
},


//-------------------------------------------------
   //INVENTORY ENDPOINTS
//-------------------------------------------------

  //Add inventory
  addinventory(postData) {
    return apiClient.post('/addinventory', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  },


  //get inventory 
  getinventory() {
    return apiClient.get('/getinventory',  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  },

//____________________________________________
// NotificationS ENDPOINTS 
//**************************************************
 
getcontacts() {
  return apiClient.get('/Notification/GetContacts',  {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  })
  .then(response => {
    return response.data;
  });
},

SendSms(postData) { 
  // console.log(postData);

  return apiClient.post('/Notification/Sendsms', postData, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  })
  .then(response => {
    return response;
  });
},


addcontact(postData) { 
  // console.log(postData);

  return apiClient.post('/Notification/AddContact', postData, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  })
  .then(response => {
    return response;
  });
},



getSentMessages() {
  return apiClient.get('/getinventory',  {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  })
  .then(response => {
    return response.data;
  });
},



   //update inventory
   updateinventory(id, updateData, token) {
    return apiClient.put(`/updateinventory/${id}`, updateinventory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
},

//delete inventory
deleteinventory(id, token) {
return apiClient.delete(`/deleteinventory/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
},



};