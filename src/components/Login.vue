

<template>
  <div class="bg-white min-h-screen flex flex-col justify-center px-1 sm:px-6 lg:px-3">
    <div class="py-7 mt-2">
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center dark:text-white">
        Welcome to ultimate pos
      </h1>
    </div>

    <div class="w-full max-w-md mx-auto border border-gray-200 py-6 px-6 rounded-md bg-gray-50 shadow-sm">
      <form class="space-y-6" action="#">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white text-center">
          Sign in to our platform
        </h3>

        <div>
          <label
            for="email"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            type="email"
            v-model="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
          />
        </div>

        <div>
          <label
            for="password"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            v-model="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>

        <div class="flex items-center justify-between">
          <label for="remember" class="flex items-center space-x-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              class="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
            <span>Remember me</span>
          </label>
          <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">
            Lost Password?
          </a>
        </div>

        <button
          @click="loginuser"
          class="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>

        <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
          Not registered?
          <span class="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer">
            Request Demo
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

            <!-- @click="showRegister" -->

 <script>
 import { ref, watch } from 'vue'; 
 import {useRouter } from 'vue-router'
 import axios from '../axios'
 import Register from './Register.vue';
 
 export default {
   components: {
     Register
   },
   setup() {
     const router = useRouter(); 
     const email = ref('');
     const password = ref('');
 
   //   watch(islogin, (newValue, oldValue) => {
   //     console.log(`showRegister changed from ${oldValue} to ${newValue}`);
   //   });

   const showRegister =()=>{
      router.push('/register')
   }  

   const loginuser = () =>{
         axios.ulogin({
            email: email.value,
            password: password.value
         }) 
        .then(response => {
          const token = response.token;
          const name = response.user.name;
          const user_id = response.user.id;

          localStorage.setItem('token', token);
          localStorage.setItem('user_id', user_id);
          localStorage.setItem('name', name);
          localStorage.setItem('isLoggedIn', true);
         this.$router.push('/');         
       }) 

      localStorage.setItem('isLoggedIn',true);
      localStorage.setItem('token', "26263654537332");

      router.push('/')
   }

 
     return {
       email,
       password,
       showRegister,
       loginuser,
       showRegister

     };
   }
 };
 </script>
 