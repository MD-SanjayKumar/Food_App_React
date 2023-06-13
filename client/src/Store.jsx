import { create } from "zustand"

const store = (set) => ({
    restaurant_id: null,
    email: null,
    password: null,
    user_id: null,
    log: 0,
    curr_lat: undefined, curr_long: undefined,
    currentAddress: null,
    itemData: [],
    d_lat: undefined, d_long: undefined,
    setCredentials: (e, p) => set(state => ({ email: e, password: p })),
    setUid: (e) => set(state => ({ user_id: e })),
    setRid: (i) => set(state => ({ restaurant_id: i })),
    setLog: (i) => set(state => ({ log: i })),
    setPointer: (lat, long) => set(state => ({ curr_lat: lat, curr_long: long })),
    setLoc: (lat, long) => set(state => ({ d_lat: lat, d_long: long })),
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

    updateItem: (item) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.fname === item.fname ? { restaurant_id: item.restaurant_id, fname: item.fname, fprice: item.fprice, fimg: item.fimg, quantity: item.quantity } : item
      ),
    })),

    dropCart: () =>{
      set((state) => ({ 
        cart: [],
      }));
    },
})

export const useCart = create(cartStore);

const admin = (set) => ({
  email: null,
  password: null,
  lat: null,
  long: null,
  setCredentials: (e, p) => set(state => ({ email: e, password: p })),
  setLatLong: (e, p) => set(state => ({ lat: e, long: p })),
})

export const useAdminStore = create(admin);

const restaurant = (set) => ({
  email: null,
  password: null,
  rid: null,
  setCredentials: (e, p) => set(state => ({ email: e, password: p })),
  setRid: (e) => set(state => ({ rid: e })),
})

export const useRestaurantStore = create(restaurant);

const delivery = (set) => ({
  email: null,
  password: null,
  dp_id: null,
  is_logged: 0,
  status: "",
  onDelivery: false,
  ongoing_requests: 0,
  setCredentials: (e, p) => set(state => ({ email: e, password: p })),
  setDpId: (e) => set(state => ({ dp_id: e })),
  setLog: (e) => set(state => ({ is_logged: e })),
  setStatus: (e) => set(state => ({ status: e })),
  followUpLat :null,
  followUpLong :null,
  setFollowup: (e, p) => set(state => ({ followUpLat: e, followUpLong: p })),
  setDelivery: (e) => set(state => ({ onDelivery:e })),
  setRequestCount: (e) => set(state => ({ ongoing_requests:e })),
  UserLat :0,
  UserLong :0,
  setUserLocation: (lat, long) => set(state => ({ UserLat: lat, UserLong: long })),
  RestaurantLat :0,
  RestaurantLong :0,
  setRestaurantLocation: (lat, long) => set(state => ({ RestaurantLat: lat, RestaurantLong: long })),
})

export const useDeliveryStore = create(delivery);