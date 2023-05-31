import { create } from "zustand"

const store = (set) => ({
    restaurant_id: null,
    email: null,
    password: null,
    setCredentials: (e, p) => set(state => ({ email: e, password: p })),
    setRid: (i) => set(state => ({ restaurant_id: i })),
  })

export const useStore = create(store);