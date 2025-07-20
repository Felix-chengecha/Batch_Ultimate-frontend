<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Mobile Menu Button -->
    <div class="md:hidden p-4 bg-white shadow-md flex justify-between items-center">
      <h1 class="text-lg font-semibold">My Account</h1>
      <button @click="toggleSidebar" class="text-gray-600 focus:outline-none">
        <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Sidebar -->
    <aside
      :class="[
        'bg-white md:w-1/5 p-6 shadow-md flex flex-col items-center md:items-start transition-all duration-300',
        isSidebarOpen ? 'block' : 'hidden',
        'md:block'
      ]"
    >
      <!-- Profile -->
      <div class="w-30 h-10 bg-gray-300 rounded-full overflow-hidden">
      <h2 class="ml-4 mt-2 text-lg text-amber-900 font-semibold">{{ BusinessName }}</h2>
      </div>
      <!-- <h2 class="mt-4 text-lg font-semibold">{{ BusinessName }}</h2> -->

      <!-- Navigation -->
      <nav class="mt-6 w-full">
        <ul class="flex flex-col space-y-4 w-full">
          <li>
            <router-link to="/Account/PersonalInfor"
              :class="route.path === '/Account/PersonalInfor' ? activeClass : defaultClass">
              Personal information
            </router-link>
          </li>
          <li>
            <router-link to="/Account/BusinessInfor"
              :class="route.path === '/Account/BusinessInfor' ? activeClass : defaultClass">
              Business Details
            </router-link>
          </li>
          <li>
            <router-link to="/Account/Teller"
              :class="route.path === '/Account/Teller' ? activeClass : defaultClass">
              Teller Mgmt
            </router-link>
          </li>
          <li>
            <router-link to="/Account/UserLogs"
              :class="route.path === '/Account/UserLogs' ? activeClass : defaultClass">
              Activities
            </router-link>
          </li>
          <li>
            <router-link to="/Account/Permissions"
              :class="route.path === '/Account/Permissions' ? activeClass : defaultClass">
              Permissions
            </router-link>
          </li>
          <li>
            <router-link to="/Account/Roles"
              :class="route.path === '/Account/Roles' ? activeClass : defaultClass">
              Roles
            </router-link>
          </li>
          <li>
            <router-link to="/Account/UserList"
              :class="route.path === '/Account/UserList' ? activeClass : defaultClass">
              Users
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 bg-gray-50">
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useAccountStore } from '../store/AccountStore';
import { useRoute } from 'vue-router';
export default {
  setup() { 

    const route = useRoute();
    const isSidebarOpen = ref(false); 
    const BusinessName = ref('');

    const acountStore  = useAccountStore();
    const data = computed(() => acountStore.getBusinessDetails);  

    onMounted(() => {
      let token = localStorage.getItem("token");
      acountStore.fetchBusinessDetails(token);
      BindDetails();
    });

    const BindDetails = () => {
      data.value.forEach(item => {
        console.log(item.businessName);
        BusinessName.value = item.businessName
      });
    }

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

  const activeClass = 'text-orange-500 font-semibold text-md';
  const defaultClass = 'text-green-600 font-semibold text-md px-4 py-2 hover:bg-gray-100 cursor-pointer';


return {
  toggleSidebar,
  BindDetails,
  activeClass,
  defaultClass,
  route,
  BusinessName
};



}

}


</script>

