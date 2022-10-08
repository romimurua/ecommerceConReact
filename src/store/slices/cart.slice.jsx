import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload
            return cart;
        }
    }
});

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart/", getConfig())
            .then(res => dispatch(setCart(res.data.data.cart.products)))
            .finally(() => dispatch(setIsLoading(false)));

}

export const addCartThunk= (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart/",
    product,
    getConfig()
    )
        .then(() => dispatch(getCartThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)))
        
}

export const purchasesCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases/",{}, getConfig())
            .then(() => dispatch(setCart([])))
            .finally(() => dispatch(setIsLoading(false)));

}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;