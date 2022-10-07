import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload
        }
    }
});

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases/", getConfig())
        .then(res => dispatch(setPurchases(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));

}

/*export const addCartThunk= (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart/",
    product,
    getConfig()
    )
        .then(() => dispatch(getPurchasesThunk()))
        .finally(() => dispatch(setIsLoading(false)))
        .catch(error => console.log(error.response))
}*/

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;