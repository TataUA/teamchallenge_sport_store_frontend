import { ClientComponent } from "@/components/ClientComponent";
import OrderPageComponent from "@/components/OrderPageComponent";

const OrderPage = (props: any) => {
  return (
    <>
      <p className="p-[10px] px-5 bg-[#FEEFEF] text-[#DF0707] text-sm md:px-[80px] text-center">
        Увага! Цей пет-проєкт створений виключно для навчальних цілей. Будь
        ласка, не вводьте свої реальні особисті данні
      </p>
      <div className="p-6 pt-0 xl:container">
        <ClientComponent>
          <OrderPageComponent />
        </ClientComponent>
      </div>
    </>
  );
};

export default OrderPage;
