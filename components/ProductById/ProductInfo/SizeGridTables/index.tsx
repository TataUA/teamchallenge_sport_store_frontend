import { cn } from "@/services/utils/cn";
import { footwearSizes, menClothingSizes, womenClothingSizes } from "./dataSizeGridTables";

const SizeGridTables = () => {
  return (
    <div className="space-y-10">
      <WomenClothingSizesTable />
      <MenClothingSizesTable />
      <FootwearSizesTable />
    </div>
  )
}

export default SizeGridTables

const WomenClothingSizesTable = () => {
  return (
    <div>
      <div className="text-lg font-semibold pb-4">
        Жіночий одяг
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {womenClothingSizes.headers.map((header, index) => (
                  <th 
                    key={header} 
                    className={cn("text-left py-2 px-4 font-semibold bg-gray-50 z-10 min-w-[120px]",{
                      'sticky left-0 border-r': index === 0
                    })}
                  >
                  {header}
                    </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {womenClothingSizes.data.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-2 px-4 border-r border-gray-200 sticky left-0 bg-white z-10">{item.size}</td>
                  <td className="py-2 px-4">{item.height}</td>
                  <td className="py-2 px-4">{item.chest}</td>
                  <td className="py-2 px-4">{item.waist}</td>
                  <td className="py-2 px-4">{item.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const MenClothingSizesTable = () => {
  return (
    <div>
      <div className="text-lg font-semibold py-4">
        Чоловічий одяг
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {menClothingSizes.headers.map((header, index) => (
                  <th 
                    key={header} 
                    className={cn("text-left py-2 px-4 font-semibold bg-gray-50 z-10 min-w-[120px]",{
                      'sticky left-0 border-r': index === 0
                    })}
                  >
                  {header}
                    </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {menClothingSizes.data.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-2 px-4 border-r border-gray-200 sticky left-0 bg-white z-10">{item.size}</td>
                  <td className="py-2 px-4">{item.height}</td>
                  <td className="py-2 px-4">{item.chest}</td>
                  <td className="py-2 px-4">{item.shoulderWidth}</td>
                  <td className="py-2 px-4">{item.waist}</td>
                  <td className="py-2 px-4">{item.thigh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

const FootwearSizesTable = () => {
  return (
    <div>
      <div className="text-lg font-semibold py-4">
        Взуття
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {footwearSizes.headers.map((header, index) => (
                  <th 
                  key={header} 
                  className={cn("text-center py-2 px-4 font-semibold bg-gray-50 z-10 min-w-[120px]",{
                  })}
                  >
                  {header}
                    </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {footwearSizes.data.map((size, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-2 px-4 sticky left-0 bg-whit border-r text-center border-gray-300 z-10">{size.size}</td>
                  <td className="py-2 px-4 text-center">{size.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}