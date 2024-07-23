import { cn } from "@/services/utils/cn";
import { footwearSizes, menClothingSizes, womenClothingSizes } from "./dataSizeGridTables";

const SizeGridTables = () => {

  return (
    <div>
      <WomenClothingSizesTable />
      <MenClothingSizesTable />
      <FootwearSizesTable />
    </div>
  )
}

export default SizeGridTables

const WomenClothingSizesTable = () => {
  const thClassname = "text-nowrap py-2 px-4"
  const tdClassname = "text-nowrap py-2 px-4"

  return (
  <div className="mb-10 pb-5 overflow-x-auto">
    <table className="min-w-full">
      <thead className="text-base text-[#272728] border-b-[1px] border-[#000]">
        <tr>
          <th className='text-nowrap py-2 px-4'>Таблиця розмірів жіночого одягу </th>
        </tr>
      </thead>
      <thead className="text-sm font-semibold text-[#272728] border-b-[1px] border-[#000]">
        <tr>
          <th className='text-nowrap py-2 px-4 text-left'>Параметр</th>
          <th className={thClassname}>XS</th>
          <th className={thClassname}>S</th>
          <th className={thClassname}>M</th>
          <th className={thClassname}>L</th>
          <th className={thClassname}>XL</th>
          <th className={thClassname}>XXL</th>
        </tr>
      </thead>
      <tbody 
        className="text-[#000]"
      >
        {womenClothingSizes.map((item, index) => (
          <tr 
            key={index}
            className={cn("border-b-[1px]")}
          >
            <td 
              className="text-nowrap py-2 px-5 pr-12"
            >
              {item.parameter}
              </td>
            <td className={tdClassname}>{item.XS}</td>
            <td className={tdClassname}>{item.S}</td>
            <td className={tdClassname}>{item.M}</td>
            <td className={tdClassname}>{item.L}</td>
            <td className={tdClassname}>{item.XL}</td>
            <td className={tdClassname}>{item.XXL}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
};

const MenClothingSizesTable = () => {
  const thClassname = "text-nowrap py-2 px-4"
  const tdClassname = "text-nowrap py-2 px-4"

  return (
    <div className="mb-10 pb-5 overflow-x-auto">
      <table className="min-w-full">
        <thead className="text-base text-[#272728] border-b-[1px] border-[#000]">
          <tr>
            <th className='text-nowrap py-2 px-4'>Таблиця розмірів чоловічого одягу</th>
          </tr>
        </thead>
        <thead className="text-sm font-semibold text-[#272728] border-b-[1px] border-[#000]">
          <tr>
            <th className="text-nowrap py-2 px-4 text-left">Параметр</th>
            <th className={thClassname}>S</th>
            <th className={thClassname}>M</th>
            <th className={thClassname}>L</th>
            <th className={thClassname}>XL</th>
            <th className={thClassname}>XXL</th>
          </tr>
        </thead>
        <tbody className="text-[#000]">
          {menClothingSizes.map((item, index) => (
            <tr className={cn("border-b-[1px]")} key={index}>
              <td className="text-nowrap py-2 px-5 pr-12">{item.parameter}</td>
              <td className={tdClassname}>{item.S}</td>
              <td className={tdClassname}>{item.M}</td>
              <td className={tdClassname}>{item.L}</td>
              <td className={tdClassname}>{item.XL}</td>
              <td className={tdClassname}>{item.XXL}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const FootwearSizesTable = () => {
  const thClassname = "text-nowrap py-2 px-4"
  const tdClassname = "text-nowrap py-2 px-4"

  return (
    <div className="overflow-x-auto pb-5">
      <table className="min-w-full md:min-w-auto">
        <thead className="text-base text-[#272728] border-b-[1px] border-[#000]">
          <tr>
            <th className='text-nowrap py-2 px-4'>Таблиця розмірів взуття</th>
          </tr>
        </thead>
        <thead className="text-base text-[#272728] border-b-[1px] border-[#000]">
          <tr>
            <th className="text-nowrap py-2 px-4 text-left">Розмір</th>
            <th className={thClassname}>Довжина, см</th>
          </tr>
        </thead>
        <tbody>
          {footwearSizes.map((item, index) => (
            <tr className="border-b-[1px]" key={index}>
              <td className={tdClassname}>{item.size}</td>
              <td className={tdClassname}>{item.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
