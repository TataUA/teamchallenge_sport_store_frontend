import { ClientComponent } from "@/components/ClientComponent";
import OrderPageComponent from "@/components/OrderPageComponent";
import { SubscribeBannerFooter } from "@/components/SubscribeBannerFooter";

const OrderPage = (props: any) => {
  return (
    <>
      <p className="p-[10px] px-5 bg-[#FEEFEF] text-[#DF0707] text-sm md:px-[80px] text-center">
        Увага! Цей пет-проєкт створений виключно для навчальних цілей. Будь
        ласка, не вводьте свої реальні особисті данні
      </p>
      <div className="p-6 pt-0 md:px-[20px] lg:px-[80px]">
        <ClientComponent>
          <OrderPageComponent />
        </ClientComponent>
      </div>
      <SubscribeBannerFooter />
    </>
  );
};

export default OrderPage;
