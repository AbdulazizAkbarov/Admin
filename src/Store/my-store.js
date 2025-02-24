import { create } from "zustand";

const useMyStore = create(()=>{
    return{
        token:"",
        user:null,
        
    }
})

export default useMyStore;
