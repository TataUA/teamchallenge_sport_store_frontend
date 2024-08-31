import OrderPageComponent from "@/components/OrderPageComponent"
import SubscribeBannerFooter from "@/components/SubscribeBannerFooter"

const OrderPage = (props: any) => {
  return (
    <>
      <div className="p-6">
        <OrderPageComponent />
      </div>
      <SubscribeBannerFooter />
    </>
  )
}

export default OrderPage
