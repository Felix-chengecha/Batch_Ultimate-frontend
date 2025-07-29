<template>
  <aside 
    v-if="showSidebar"
    class="flex h-full flex-col justify-between border-e bg-slate-800 w-64 transition-all duration-300 ease-in-out"
  >
    <div class="px-4 py-4">
      <!-- Logo/Branding -->
      <!-- <div class="mb-8 flex items-center justify-center rounded-lg bg-slate-700 p-3">
        <img src="../assets/logo.jpeg" alt="Logo" class="h-8 w-8 rounded-full">
        <h1 class="ml-2 text-lg font-bold text-white">Ultimate POS</h1>
      </div> -->

      <!-- Navigation Menu -->
      <nav class="space-y-1">
        <!-- Dashboard -->
        <router-link 
          to="/" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <HomeIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">Dashboard</span>
        </router-link>

        <!-- Products Section -->
        <div class="group relative">
          <button 
            @click="toggleMenu('Products')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            <div class="flex items-center">
              <CubeIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Products</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Products' ? 'rotate-180' : ''
              ]" 
            />
          </button>
          
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-show="openMenu === 'Products'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                to="/inventory"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Inventory
              </router-link>
              <router-link 
                to="/catalogue"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Catalogue
              </router-link>
              <router-link 
                to="/categories"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Categories
              </router-link>
            </div>
          </transition>
        </div>

        <!-- Transactions Section -->
        <div class="group relative">
          <button 
            @click="toggleMenu('Transactions')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            <div class="flex items-center">
              <CurrencyDollarIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Transactions</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Transactions' ? 'rotate-180' : ''
              ]" 
            />
          </button>
          
          <transition name="dropdown">
            <div 
              v-show="openMenu === 'Transactions'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                to="/sell"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Sell
              </router-link>
              <router-link 
                to="/transactions"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Transaction List
              </router-link>
            </div>
          </transition>
        </div>

        <!-- Other sections follow the same pattern -->
        <!-- Documents -->
        <router-link 
          to="/documents" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <DocumentTextIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">Documents</span>
        </router-link>

        <!-- Reports -->
        <router-link 
          to="/reports" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <ChartBarIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">Reports</span>
        </router-link>

        <!-- Suppliers -->
        <router-link 
          to="/suppliers" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <TruckIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">Suppliers</span>
        </router-link>

        <!-- My Account -->
        <router-link 
          to="/account" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <UserCircleIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">My Account</span>
        </router-link>
      </nav>
    </div>

    <!-- Footer/Settings -->
    <div class="border-t border-slate-700 p-4">
      <router-link 
        to="/settings" 
        class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
      >
        <Cog6ToothIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
        <span class="ml-3">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { useDashboardStore } from '../store/DashboardStore'
import { ref, computed } from 'vue'
import {
  HomeIcon,
  CubeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ChartBarIcon,
  TruckIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'

const dashboardstore = useDashboardStore()
const showSidebar = computed(() => dashboardstore.filterLargeScreen)
const openMenu = ref(null)

const toggleMenu = (menu) => {
  openMenu.value = openMenu.value === menu ? null : menu
}
</script>

<style scoped>
/* Custom transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Active link styling */
.router-link-active:not(.active-class) {
  @apply bg-slate-700 text-white;
}

/* Smooth hover transitions */
.router-link {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Scrollbar styling for submenus */
.scroll-area {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

.scroll-area::-webkit-scrollbar {
  width: 6px;
}

.scroll-area::-webkit-scrollbar-track {
  background: #1f2937;
}

.scroll-area::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 3px;
}
</style>