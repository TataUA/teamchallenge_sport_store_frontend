import Link from "next/link"

const OrderPage = (props: any) => {
  return (
    <div>
      <p className="p-4 px-5 bg-[#FEEFEF] text-[#DF0707]">
        Успішно створено ваше замовлення.
      </p>
      <p className="p-4 mt-2">
        <Link className="text-blue" href='/'>Натисніть сюди,</Link>
        {' '}
        <span>щоб повернутись на головну сторінку</span>
      </p>
    </div>
  )
}

export default OrderPage
