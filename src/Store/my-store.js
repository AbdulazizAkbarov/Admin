import { create } from "zustand";
import api from "../Pages/Axios";

const useMyStore = create(() => {
  const lsString = localStorage.getItem("auth");

  if (!lsString) {
    return {
      token: "",
      user: null,
    };
  }

  const ls = JSON.parse(lsString);

  api.defaults.headers.Authorization = `Bearer ${ls.token}`;

  return {
    token: ls.token,
    user: ls.user,
  };
});

export default useMyStore;
