//// Get permissions for a specific role and submodule

export function RolePermission(moduleName, allPermissions) {
  return allPermissions
    .filter(p.submodule === moduleName)
    .map(p => p.permission)
}


      ////Check if a permission exists in the list
export function hasPermission(permissionList, permissionToCheck) {
  return permissionList.includes(permissionToCheck)
}
 



