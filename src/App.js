import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import Notification from './components/UI/Notification'
import { fetchCartData, sendCartData } from './store/cart-actions'

let isInitial = true

function App() {
  const dispatch = useDispatch()

  const uiCartState = useSelector((state) => state.ui.cartIsVisible)
  const cart = useSelector((state) => state.cart)

  const notification = useSelector((state) => state.ui.notification)

  console.log({ notification })

  // useEffect(() => {

  //   if(isInitial) {
  //     isInitial= false;
  //     return
  //   };

  //   // this overwrite our data in firebase when the app boots
  //   // this is a problem we have to solve later

  //   // const sendCartData = async () => {
  //     // code moved to custom action creator in ui-slice
  //     // dispatch(
  //     //   uiActions.showNotification({
  //     //     status: 'pending',
  //     //     title: 'sending...',
  //     //     message: 'sending cart data',
  //     //   })
  //     // )
  //     // const response = await fetch(
  //     //   'https://mealapp-2c580-default-rtdb.firebaseio.com/cart.json',
  //     //   {
  //     //     method: 'PUT',
  //     //     body: JSON.stringify(cart),
  //     //   }
  //     // )
  //     // if (!response.ok) {
  //     //   throw new Error('Sending car data failed')
  //     // }

  //     // dispatch(
  //     //   uiActions.showNotification({
  //     //     status: 'success',
  //     //     title: 'success...',
  //     //     message: 'sent cart data successfully',
  //     //   })
  //     // )
  //   }

  //   // Deleted out because i dont need response data any more
  //   //const responseData = await response.json()

  //   // if (isInitial) {
  //   //   isInitial = false
  //   //   return /* if initial i will not send data, this is the solution :) */
  //   // }
  //   // sendCartData().catch((error) => {
  //   //   dispatch(
  //   //     uiActions.showNotification({
  //   //       status: 'error',
  //   //       title: 'Error...',
  //   //       message: 'sending cart data failed',
  //   //     })
  //   //   )
  //   // })
  // }, [cart, dispatch])

  // this useEffect uses to fetch the data only when the component boots for first time
  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }
    if (cart.changed) {
      dispatch(sendCartData(cart))
    }
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {!uiCartState && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  )
}

export default App
