import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Views/Home.vue'
import  Inventory from '../Views/Inventory.vue'
import Transactions from '../Views/Transactions.vue'
import Catalogue from '../Views/Catalogue.vue'
import Supplier from '../Views/Supplier.vue'
import Account from "../Views/Account.vue";
import Supplies from '../Views/Supplies.vue'

// import sale from '../Views/Sale.vue'
import sale2 from '../Views/sale2.vue'
import Login from  '../components/Login.vue'
import Register from  '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue'
import categories from '../Views/Categories.vue'
import Reports from "../Views/Reports.vue"
import Contacts from '../Views/Contacts.vue'
import SendSms from '../Views/SendSms.vue'
import SentMessages from '../Views/SentMessages.vue'
import Documents from '../Views/Documents.vue'

//account views
import PersonalInfor from '../Views/Account_Views/Personal_info.vue';
import BusinessInfor from '../Views/Account_Views/Business_info.vue';
import Permissions from '../Views/Account_Views/Permission.vue';
import Roles from '../Views/Account_Views/Roles.vue';
import Teller from '../Views/Account_Views/Teller.vue';
import UserList from '../Views/Account_Views/UserList.vue';
import UserLogs from '../Views/Account_Views/UserLogs.vue';



 const routes = [  

  { 
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/register',
    name: "register",
    component: Register
  },


{
  path: '/',
  component :Dashboard,
  redirect:'/home',
  meta: { requiresAuth: true },
   children: [ 
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },

  {
    path: '/inventory',
    name: 'inventory',
    component: Inventory,
     meta: { requiresAuth: true }
  },


  {
    path: '/transactions',
    name: 'transactions',
    component: Transactions,
    meta: { requiresAuth: true }
  },

  {
    path: '/catalogue',
    name: 'catalogue',
    component: Catalogue,
    meta: { requiresAuth: true }
  },

  {
    path: '/supplier',
    name: 'supplier',
    component: Supplier,
    meta: { requiresAuth: true }
  },

  {
    path: '/supplies/:supplierId',
    name: 'supplies',
    component: Supplies,
    meta: { requiresAuth: true }
  },
  
  {
    path: '/reports',
    name: 'reports',
    component: Reports,            
      meta: { requiresAuth: true }
  },

  {
    path: '/categories',
    name: 'categories',
    component: categories,
    meta: { requiresAuth: true }
  },

 {
    path: '/Documents',
    name: 'Documents',
    component: Documents,
    meta: { requiresAuth: true }
  },

  // 
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts,
    meta: { requiresAuth: true } 
  },

  {
    path: '/SendSms',
    name: 'SendSms',
    component: SendSms,
    meta: { requiresAuth: true } 
  },

  {
    path: '/SentMessages',
    name: 'SentMessages',
    component: SentMessages,
    meta: { requiresAuth: true } 
  },


  {
    path: '/sell',
    name: 'sell',
    component: sale2,
    meta: { requiresAuth: true }
  },


  // A list of  account semi views start
  {
   path: '/Account',
  component :Account,
  redirect:'/Account/PersonalInfor',
   meta: { requiresAuth: true },
   children: [ 
      { 
        path: 'PersonalInfor',
        name: 'PersonalInfor',
        component: PersonalInfor,
        meta: { requiresAuth: true }
      },

        { 
        path: 'BusinessInfor',
        name: 'BusinessInfor',
        component: BusinessInfor,
        meta: { requiresAuth: true }
      },

        { 
        path: 'Permissions',
        name: 'Permissions',
        component: Permissions,
        meta: { requiresAuth: true }
      },

        { 
        path: 'Roles',
        name: 'Roles',
        component: Roles,
         meta: { requiresAuth: true }
      },

        { 
        path: 'Teller',
        name: 'Teller',
        component: Teller,
         meta: { requiresAuth: true }
      },

      { 
      path: 'UserList',
      name: 'UserList',
      component: UserList,
      meta: { requiresAuth: true }
    },

      { 
      path: 'UserLogs',
      name: 'UserLogs',
      component: UserLogs,
       meta: { requiresAuth: true }
    },  
]},

// A list of  account semi views End

  //  {
  //   path: '/Test_view',
  //   name: 'Test_view',
  //   component: Test_view,
  //   // meta: { requiresAuth: true }
  // },

]}

]  ///

const router = createRouter({
  history: createWebHistory(),
  routes
})


//navigation guard to check if the user is logged in and has a valid token
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const token = localStorage.getItem('token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth && (!isLoggedIn || !token)) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router