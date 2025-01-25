import { cn } from "@/services/utils/cn";

import {
  footwearSizes,
  menClothingSizes,
  womenClothingSizes,
} from "./dataSizeGridTables";

const SizeGridTables = () => {
  return (
    <div className="space-y-10">
      <WomenClothingSizesTable />
      <MenClothingSizesTable />
      <FootwearSizesTable />
    </div>
  );
};

export default SizeGridTables;

const WomenClothingSizesTable = () => {
  return (
    <div>
      <div className="pb-4 font-semibold text-base text-primary tracking-custom_4">
        Жіночий одяг
      </div>
      <div className="block 608:inline-block md:block border border-border rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-[560px]">
            <thead>
              <tr>
                {womenClothingSizes.headers.map((header, index) => (
                  <th
                    key={header}
                    className={cn(
                      "z-10 min-w-[120px] text-center py-2 px-4 font-medium text-sm text-primary tracking-custom_4",
                      {
                        "sticky left-0 px-5 bg-white sizes-right-border":
                          index === 0,
                      },
                    )}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {womenClothingSizes.data.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-border font-medium text-sm text-primary tracking-custom_4 text-center"
                >
                  <td
                    className={cn(
                      "sticky left-0 z-10 py-2 px-4 bg-white font-semibold",
                      "sizes-right-border",
                    )}
                  >
                    {item.size}
                  </td>
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
  );
};

const MenClothingSizesTable = () => {
  return (
    <div>
      <div className="pb-4 font-semibold text-base text-primary tracking-custom_4">
        Чоловічий одяг
      </div>
      <div className="border border-border rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {menClothingSizes.headers.map((header, index) => (
                  <th
                    key={header}
                    className={cn(
                      "z-10 min-w-[120px] text-center py-2 px-4 font-medium text-sm text-primary tracking-custom_4",
                      {
                        "sticky left-0 px-5 bg-white sizes-right-border":
                          index === 0,
                      },
                    )}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {menClothingSizes.data.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-border font-medium text-sm text-primary tracking-custom_4 text-center"
                >
                  <td
                    className={cn(
                      "sticky left-0 z-10 py-2 px-4 bg-white font-semibold",
                      "sizes-right-border",
                    )}
                  >
                    {item.size}
                  </td>
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
  );
};

const FootwearSizesTable = () => {
  return (
    <div>
      <div className="pb-4 font-semibold text-base text-primary tracking-custom_4">
        Взуття
      </div>
      <div className="border border-border rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {footwearSizes.headers.map((header, index) => (
                  <th
                    key={header}
                    className={cn(
                      "z-10 min-w-[120px] h-14 py-2 px-4 font-medium text-sm text-primary tracking-custom_4 text-center",
                      { "border-r border-border": index === 0 },
                    )}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {footwearSizes.data.map((size, index) => (
                <tr
                  key={index}
                  className="border-t border-border font-medium text-sm text-primary tracking-custom_4 text-center"
                >
                  <td className="py-2 px-4 border-r border-border font-semibold">
                    {size.size}
                  </td>
                  <td className="py-2 px-4">{size.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
