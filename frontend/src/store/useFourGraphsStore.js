import axios from "axios";
import { create } from "zustand";

const useFourGraphsStore = create((set) => ({
  amount: "",
  available: 0,
  fordeploy: "",
  pullout: "",
  totalNo: 0,

  getAmount: async (url) => {
    const response = await axios.get(url);
    set({ amount: await response.data.result[0].Amount });
  },

  getAvailable: async (url) => {
    const response = await axios.get(url);
    set({ available: await response.data.result[0].Available });
  },

  getForDeploy: async (url) => {
    const response = await axios.get(url);
    set({ fordeploy: await response.data.result[0].ForDeploy });
  },

  getPullOut: async (url) => {
    const response = await axios.get(url);
    set({ pullout: await response.data.result[0].Pullout });
  },

  getTotalNo: async (url) => {
    const response = await axios.get(url);
    set({ totalNo: await response.data.result[0].Count });
  },
}));

export default useFourGraphsStore;
