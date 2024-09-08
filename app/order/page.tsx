import { ClientComponent } from "@/components/ClientComponent"
import OrderPageComponent from "@/components/OrderPageComponent"
import SubscribeBannerFooter from "@/components/SubscribeBannerFooter"

const OrderPage = (props: any) => {
  return (
    <>
      <p className="p-4 px-5 bg-[#FEEFEF] text-[#DF0707]">
        Увага! Цей пет-проєкт створений виключно для навчальних цілей. Будь ласка, не вводьте свої реальні особитсі данні
      </p>
      <div className="p-6 pt-0">
        <ClientComponent>
          <OrderPageComponent />
        </ClientComponent>
      </div>
      <SubscribeBannerFooter />
    </>
  )
}

export default OrderPage
