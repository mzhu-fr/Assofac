import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    item: [],
    status: null
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {}
})

export default productsSlice.reducer