import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserStore = defineStore("user", () => {
    const token =ref('')
    const setToken = (newtoken: string) => {
      token.value = newtoken;
    };
    const removetoken = () => {
      token.value = ''
    }
   
  
  const user = ref({
    name: "",
    //avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  });
  return { user,token, setToken, removetoken };
},
  { persist: true }
);