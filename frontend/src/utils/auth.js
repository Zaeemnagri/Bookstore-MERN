export function isAuthenticated(){ return !!localStorage.getItem('token'); }
export function isAdmin(){ return localStorage.getItem('role') === 'admin'; }
export function saveAuth(data){
  localStorage.setItem('token', data.token);
  localStorage.setItem('name', data.name || '');
  localStorage.setItem('email', data.email || '');
  localStorage.setItem('role', data.role || 'customer');
}
export function logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
  localStorage.removeItem('cart');
}
