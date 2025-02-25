import { create } from "zustand";

const useMyStore = create(() => {
  const lsString = localStorage.getItem("auth");

  if (!lsString) {
    return {
      token: "",
      user: null,
    };
  }

  const ls = JSON.parse(lsString)

  return {

    token:ls.token,
    user:ls.user
  }
});

export default useMyStore;
