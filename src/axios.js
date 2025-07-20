import axios from 'axios';
import { errorState } from '../src/store/ErrorState'
import {useRouter } from 'vue-router'
import Documents from './Views/Documents.vue';


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





//-------------------------------------------------
   //Dashboard ENDPOINTS
//-------------------------------------------------
  getDashboardAverages(token) {
    return apiClient.get(`/Dashboard/SalesAverages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},

getGraphData(token) {
  return apiClient.get(`/Dashboard/Graphdata`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
  return response;
});
},

getRecentSalesData(token) {
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
  
//http://localhost:5134/api/Catalogue/GetActiveCatelogue

    getActiveprooducts(token) { 
      return apiClient.post('/Catalogue/GetActiveCatelogue', {},  {
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
  getcatalogue(token) {
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
  getcategory(token) {
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

//____________________________________________
// NotificationS ENDPOINTS 
//**************************************************
 
getcontacts(token) {
  return apiClient.get('/Notification/GetContacts',  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},


getTemplates(token) {
  return apiClient.get('/Notification/GetSmsTemplates',  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},
//


addcontact(postData,token) { 
  // console.log(postData);

  return apiClient.post('/Notification/AddContact', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},

addsmsTemplate(postData,token) { 
  // console.log(postData);

  return apiClient.post('/Notification/AddSmsTemplate', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

SendSms(postData,token) { 
  return apiClient.post('/Notification/Sendsms', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},




AddNotification(postData,token) {
  return apiClient.post('/Notification/AddNotification', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });

},


//##############################
// Documents
//###############################

async uploadFile(formData, token) {
  return axios.post(
    'http://localhost:5134/api/Document/AddDocument',
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
},

  // async uploadFile(formData,token) {
  //   return apiClient.post('/Document/AddDocument', formData,  {
  //   headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // },

    async GetFiles(token) {
    return apiClient.post('/Document/GetDocuments', {}, {
    headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },


  // important for binary response (PDF) 
  async getFilePreview(fileId,token) {
    return apiClient.get(`/Document/preview/${fileId}`, {
      responseType: 'blob', 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async downloadFile(fileId) {
    return apiClient.get(`/Document/DownloadDocument/${fileId}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

exportReportData(postData,mimeType){
  return apiClient.post('/Reports/JasperReports',postData,{
    headers : {
      Authorization: `Bearer ${token}`,
      Accept : mimeType,
    },
    responseType : 'blob'
  })
    .then(response =>{
      return response;
    });
},

// **************************************
  //USER ACCOUNT DETAILS
// ************************************** 

addEditRoles(postData,token) {
  return apiClient.post('/Notification/AddNotification', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });

},


addEditPermissions(postData,token) {
  return apiClient.post('/Notification/AddNotification', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });

},


addBusinessDetails(postData,token) {
  return apiClient.post('/Notification/AddNotification', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });

}, 



getPermissions(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

 getRoles(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},
 

getUsers(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},


getLogDet(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

getAccountDet(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

getBusinessDet(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

getPersonalDet(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

};