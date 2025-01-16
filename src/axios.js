import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5134/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // timeout: 1000 
});
// apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Get the token from local storage

export default { 

//-------------------------------------------------
    //USER AUTHENTICATION ENDPOINTS 
//-------------------------------------------------
  register(postData) {
    // console.log(postData);
    return apiClient.post(`/Authentication/Register`, postData, {
      })
      .then(response => {
        return response.data;
      });
  },

//LOGIN USER
  ulogin(postData) {
    return apiClient.post(`/login`, postData, {
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




//-------------------------------------------------
   //Dashboard ENDPOINTS
//-------------------------------------------------
  getDashboardAverages(token) {
    return apiClient.get(`/Dashboard/SalesAverages`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  })
  .then(response => {
    return response;
  });
},

getGraphData(token) {
  return apiClient.get(`/Dashboard/Graphdata`, {
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
})
.then(response => {
  return response;
});
},

getRecentSalesData(token) {
  return apiClient.get(`/Dashboard/RecentSales`, {
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
})
.then(response => {
  return response;
});
},

//-------------------------------------------------
   //product ENDPOINTS
//-------------------------------------------------
//http://localhost:5134/api/Ultimate/AddProducts /Products/GetProducts' 
  //addproduct
  addproduct(postData) { 
    // console.log(postData);

    return apiClient.post('/Products/AddProducts', postData, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
    .then(response => {
      return response;
    });
  },
  

    //getcontact
    //http://localhost:5134/api/Ultimate/GetProducts
    getproduct() { 
      return apiClient.post('/Products/GetProducts',  {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
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
//http://localhost:5134/api/Suppliers/AddSupplier
//add supplier
  addsupplier(postData) {
    return apiClient.post('/Suppliers/AddSupplier', postData, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
    .then(response => {
      return response;
    });
  },


 //get all supplier
  getsupplier() { //token
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
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  })
  .then(response => {
    return response;
  });
},

// get one Transaction
getTransaction(token) {
  return apiClient.get('/getTransaction',  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
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
    return apiClient.get('/getcatalogue',  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  },

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
    // console.log(postData);
    return apiClient.post(`/Category/AddCategory`, postData, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
    .then(response => { 
      // console.log(response);
      return response.data;
    });
  },


  //get category
  // //http://localhost:5134/api/Category/GetCategory
  getcategory() {
    return apiClient.post('/Category/GetCategory',  {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
    .then(response => { 
      // console.log(response.data);
      return response;
    });
  },

   //update category
   updatecategory(id, updateData, token) {
    return apiClient.put(`/updatecategory/${id}`, updatecatalogue, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
},

//delete catalogue
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
  addinventory(postData, token) {
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
  getinventory(token) {
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
  return apiClient.get('/getinventory',  {
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

  return apiClient.post('/Products/AddProducts', postData, {
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

  return apiClient.post('/Products/AddProducts', postData, {
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