import api from "./api";

const getUserProfile = async () => {
  return api.get("/users/profile");
};

export default { getUserProfile };
