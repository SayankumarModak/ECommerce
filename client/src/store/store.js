import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice/auth-slice"
import adminProductsSlice from "./admin-slice/products-slice"
import shopProductsSlice from "./shop/product-slice/index"
import shopCartSlice from "./shop/cart-slice/index"
import shopAddressSlice from './shop/address-slice/index'
import shopOrderSlice from "./shop/order-slice/index"
import adminOrderSlice from "./admin-slice/order-slice/index"
import shopSearchSlice from './shop/search-slice/index'
import shopReviewSlice from './shop/review-slice/index'
import commonFeatureSlice from './common-slice/index'


const store = configureStore({
   reducer: {
      auth: authReducer,
      adminProducts: adminProductsSlice,
      adminOrder: adminOrderSlice,

      shopProducts: shopProductsSlice,
      shopCart: shopCartSlice,
      shopAddress: shopAddressSlice,

      shopOrder: shopOrderSlice,//there can be issue as name changed

      shopSearch: shopSearchSlice,
      shopReview: shopReviewSlice,

      commonFeature: commonFeatureSlice,
   }
});

export default store;