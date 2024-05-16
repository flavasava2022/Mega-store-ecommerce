import { createSelector } from "reselect"

 const wishListData = (state)=>state.wishlist

export const WishListData = createSelector([wishListData],(wishlist)=>wishlist.wishlistData)