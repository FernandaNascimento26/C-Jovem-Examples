import api from "./api";

const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", JSON.stringify(userData), {
      headers: {
        "Content-Type": "application/json", 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro na requisição de registro:", error.response?.data || error.message);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", JSON.stringify(credentials), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Erro na requisição de login:", error.response?.data || error.message);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

export default { register, login, logout };
