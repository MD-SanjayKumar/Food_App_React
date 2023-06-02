import { create } from "zustand"

const store = (set) => ({
    restaurant_id: null,
    email: null,
    password: null,
    log: null,
    curr_lat: undefined, curr_long: undefined,
    currentAddress: null,
    itemData: [],
    setCredentials: (e, p) => set(state => ({ email: e, password: p })),
    setRid: (i) => set(state => ({ restaurant_id: i })),
    setLog: (i) => set(state => ({ log: i })),
    setPointer: (lat, long) => set(state => ({ curr_lat: lat, curr_long: long })),
    setCurrAddress: (addr) => set(state => ({ currentAddress: addr })),
    setCart: (item) => set(state=> ({ itemData:[state.itemData, item]}))
  })

export const useStore = create(store);

const cartStore = (set) =>({
    cart:[],
    cartTotal: null,
    addCart: (item) =>{
      set((state) => ({ 
        cart: [item, ...state.cart],
      }))
    },
    removeCart: (id) => {
      set((state) => ({
        cart: state.cart.filter((title) => title.fname !== id),
      }));
    },
    setTotal: (i) => set(state => ({ cartTotal: i })),
})

export const useCart = create(cartStore);