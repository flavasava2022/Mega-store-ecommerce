import { createSelector } from "reselect";


const selectCartReducer = state=>state.cart

export const selectCartItems = createSelector([selectCartReducer],(cart)=>cart.cartData)



export const isOpenDrawer = createSelector([selectCartReducer],(cart)=>cart.openDrawer)




 export   const cartTotalPrice = createSelector([selectCartReducer],(cart)=>cart.cartData?.reduce(
      (total, cartItem) => total + cartItem?.quantity * cartItem?.attributes?.price ,
      0
    ))
   export const cartTotalCount = createSelector([selectCartReducer],(cart)=>cart.cartData?.reduce(
      (total, cartItem) => total + cartItem?.quantity ,
      0
    ))

    export const loadingAddToCart = createSelector([selectCartReducer],(cart)=>cart.isLoadingEditProducts)