<template>
  <div class="min-h-screen flex flex-col md:flex-row">

    <!-- Left: Image with Text Overlay -->
    <div class="w-full md:w-1/2 h-64 md:h-auto relative">
      <img :src="backgroundImageLeft" alt="Communication" class="w-full h-full object-cover" />
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-5 bg-black/50">
        <h1 class="text-2xl md:text-4xl font-bold mb-2">Smarter Sales Start Here</h1>
        <p class="text-base md:text-lg">Serving Smart Transactions Daily.</p>
      </div>
    </div>

    <!-- Right: Login Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-2 md:p-5 bg-gray-200">
      <!-- <div class="w-full max-w-md bg-white bg-opacity-95 rounded-lg shadow-lg p-4 space-y-4"> -->
<!-- <div class="w-full max-w-md lg:max-w-xl xl:max-w-2xl bg-white bg-opacity-95 rounded-lg shadow-lg p-4 lg:p-8 space-y-4"> -->
<div class="w-full max-w-md lg:max-w-xl xl:max-w-2xl bg-white bg-opacity-95 rounded-lg shadow-lg p-4 lg:p-8 space-y-4 h-auto lg:h-[65vh] flex flex-col justify-center">

        <h2 class="text-xl md:text-2xl font-semibold text-center text-gray-800 md:mt-3">
          Good to see you again!
        </h2>

        <form @submit.prevent="loginuser($event)" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-sm text-gray-700 mb-1" for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm text-gray-700 mb-1" for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Environment Dropdown -->
          <div class="relative" ref="dropdown">
            <label class="block text-sm text-gray-700 mb-1">Environment</label>
            <input
              type="text"
              v-model="selected"
              readonly
              @click="toggleDropdown"
              placeholder="Select an option"
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div v-show="isOpen" class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow">
              <div
                v-for="option in options"
                :key="option.value"
                @click="selectOption(option)"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {{ option.label }}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="remember" class="form-checkbox" />
              <span class="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" class="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Sign In
          </button>
        </form>

        <p class="text-sm text-center text-gray-600">
          Don’t have an account?
          <a href="#" class="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>

  </div>
</template>




<script>
import { ref, computed, onMounted, onBeforeUnmount, nextTick,watch } from 'vue'
import Swal from 'sweetalert2';
import {useRouter } from 'vue-router'
import axios from '../axios'
import Register from './Register.vue';
import {Useuserstore} from '../store/userstore';
import links from '../assets/Enviroment.json';
import backgroundImageLeft from '../assets/bgLogin.jpg'
import backgroundImageRight from '../assets/bgLogin.jpg'
export default {
  components: {
    Register
  },
  setup() {
    const router = useRouter(); 
    const email = ref('');
    const password = ref('');
    const remember = ref(false);
    const isOpen = ref(false);
    const enviroment = ref('');
    const options = [];
    const dropdown = ref(null);
    const selected = ref('');

    const status = ref('');
    const token = ref('');



    const LoginUserStore = Useuserstore();

    const Loginresponse = computed(() => LoginUserStore.getAllDetails);
          
      watch(Loginresponse, (newValue) => {
           status.value = newValue.status;
           token.value = newValue.token;
           localStorage.setItem('token', newValue.token);
            if(status.value == '200'){
           router.push('/');
          }
        }); 


 
  const showRegister =()=>{
     router.push('/register')
  }  


 const  loginuser = async (event) => {
   if(validateDetails()){
      event.preventDefault();   

     try {
       const authdata = { email: email.value, password: password.value, env: enviroment.value };
        
        try {  
          LoginUserStore.LoginUser(authdata);
          setTimeout(() => { DisplayMessage("success", "welcome")}, 2000); 
       } catch(error) {
         setTimeout(() => {
             ErrorMessage("Error:", error);
         }, 2000); 
       }

   } catch (error) {
     ErrorMessage("Login failed:", error);
   }
     
    }
  }

  const validateDetails = () =>{
    if(email.value.trim() === ""){
      ErrorMessage("Please Enter your email address");
      return false;
    }
    else if(password.value.trim() === ""){
      ErrorMessage("Enter your password");
    return false;
    }
    else if (!/\S+@\S+\.\S+/.test(email.value)) {
      ErrorMessage("Enter a valid email address");
      return false;
    }
    else{
      return true
    }
    } 

  const DisplayMessage=(icon,message) => {
    Swal.fire({
          position: "top-end",
          icon: icon,
          title: message,
          showConfirmButton: false,
          timer: 1500
        });
    }


  const ErrorMessage = (Error) =>{
     Swal.fire({
           position: 'top-end',
           icon: 'error',
           title: Error,
           showConfirmButton: false,
           timer: 2500,
         });
   }  
 

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }

  const selectOption = (option) => {
    selected.value = option.label 
    enviroment.value = option.url
    isOpen.value = false
  }

  const handleClickOutside = (e) => {
    if (dropdown.value && !dropdown.value.contains(e.target)) {
      isOpen.value = false
    }
  }

  onMounted(async () => {
    await nextTick()
    document.addEventListener('click', handleClickOutside)
    links.forEach(link => {
       options.push(link);
    });
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })




    return {
      email,
      password,
      showRegister,
      loginuser,
      LoginUserStore,
      backgroundImageLeft,
      backgroundImageRight,

      toggleDropdown,
      handleClickOutside,
      isOpen,
      dropdown,
      options,
      selectOption,
      selected,
      enviroment,
      Loginresponse,
      status,
      token


     
    };
  }
};
</script>


<style scoped>
/* Optional: if you want to add some overlay for readability on the right side */
</style>
