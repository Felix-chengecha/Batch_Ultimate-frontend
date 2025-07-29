import { computed } from 'vue'
import { RolePermission,hasPermission } from './PermissionService'
import { useAccountStore } from '../store/AccountStore'
// import axios from 'axios';


export function usePermission(moduleName) {

  const modulePermissions = computed(() =>
    RolePermission(moduleName, permissionStore.Permissions)
  )

  function can(permissionName) { 
    console.log("name", permissionName);
    console.log(hasPermission("listAA", modulePermissions.value));
    console.log(hasPermission("list", modulePermissions.value, permissionName));
    return hasPermission(modulePermissions.value, permissionName)
  }

  return { can }
} 










    