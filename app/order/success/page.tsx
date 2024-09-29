import { ClientComponent } from "@/components/ClientComponent"
import OrderSuccessPage from "@/components/OrderSuccessPage"

const page = async (props: any) => {
   return (
    <ClientComponent>
      <OrderSuccessPage />
    </ClientComponent>
  )
}

export default page
