// components
import { ClientComponent } from "../ClientComponent"
import ContactsSection from "./ContactsSection"
import DeliverSection from "./DeliverSection"
import Footer from "./Footer"
import ListProducts from "./ListProducts"
import PaymentSection from "./PaymentSection"

const OrderPageComponent = () => {
  
  return (
    <div className="pt-4 flex flex-col gap-10 lg:gap-[60px] lg:pt-6 min-[2800px]:pt-8 min-[2800px]:gap-[60px] ">
      <h1 
      className="text-[#1A1A1C] text-2xl font-bold md:text-2xl lg:text-3xl min-[2800px]:lg:text-5xl"
      >
        Оформлення замовлення
      </h1>
      <ClientComponent>
        <ContactsSection />
        <DeliverSection />
        <PaymentSection />
        <ListProducts />
        <Footer />
      </ClientComponent>
    </div>
  )
}

export default OrderPageComponent
