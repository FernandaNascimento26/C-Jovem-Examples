export const isAutenticado = () => {
    return !!localStorage.getItem('token');
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
  };
  