import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { wishListReducer} from "./wishlist/wishlist.reducer";


export const rootReducer = combineReducers({
    user:userReducer,
    cart:cartReducer,
    wishlist:wishListReducer,
})