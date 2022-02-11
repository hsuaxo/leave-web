import Vue from "vue";
import Vuex from "vuex";
import { State, Leave, LeaveType } from "../types";

Vue.use(Vuex);

const getState = (): State => {
  return {
    loading: false,
    leaves: [],
    leaveTypes: [],
  };
};

export default new Vuex.Store({
  state: getState(),
  mutations: {
    SET_LOADING(state: State, loading: boolean) {
      state.loading = loading;
    },
    SET_LEAVES(state: State, leaves: Leave[]) {
      state.leaves = leaves;
    },
    SET_LEAVE_TYPES(state: State, types: LeaveType[]) {
      state.leaveTypes = types;
    },
  },
  actions: {
    async getLeaves({ commit }) {
      const { data } = await Vue.axios.get("leave/list");
      commit("SET_LEAVES", data);
    },
    async getLeave(context, id: string) {
      const { data } = await Vue.axios.get(`leave/${id}`);
      return data;
    },
    async getLeaveTypes({ commit }) {
      const { data } = await Vue.axios.get("type/list");
      commit("SET_LEAVE_TYPES", data);
    },
    async saveLeave({ dispatch }, leave: Leave) {
      await Vue.axios.post("leave", leave);
      dispatch("getLeaves");
    },
    async deleteLeave({ dispatch }, id: string) {
      await Vue.axios.delete(`leave/${id}`);
      dispatch("getLeaves");
    },
  },
});
