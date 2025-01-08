// helpers
import getTranslatedSubcategoryFromUkraineToEnglish from "@/helpers/getTranslatedSubcategoryFromUkraineToEnglish";

// components
import { ClientComponent } from "@/components/ClientComponent";
import SizesBlock from "./SizesBlock";
import AddProductToCartComponent from "./AddProductToCartComponent";
import ColorPickerComponent from "./ColorPickerComponent";
import SliderComponent from "./SliderComponent";

// types
import { IProduct } from "@/services/types";

const ProductInfo = ({ product }: { product: IProduct }) => {
  const { colors, price, size, quantity, category } = product;

  const formattedDescription = product.description.replace(/\r\n/g, "<br>");
  const translatedSubCategory = getTranslatedSubcategoryFromUkraineToEnglish(
    category.sub_category,
  );

  return (
    <div className="xl:flex gap-5">
      <ClientComponent>
        <div className="xl:max-w-[628px]">
          <SliderComponent />
        </div>
        <div className="xl:max-w-[628px]">
          <div className="xl:mt-4 mb-4 xl:mb-6 text-base xl:text-xl tracking-custom_4 xl:tracking-custom_2 text-title">
            {product.title}
          </div>
          <div className="mb-8 xl:mb-10 font-semibold text-2xl tracking-custom_2 text-title">
            {price + " грн"}
          </div>
          <ColorPickerComponent colors={colors} />
          <SizesBlock
            translatedSubCategory={translatedSubCategory}
            existedSizesFromDb={quantity}
          />
          <AddProductToCartComponent product={product} />
          <div>
            <h4 className="mb-2 font-semibold text-base tracking-custom_4 text-primary">
              Опис
            </h4>
            <div
              className="font-medium text-sm tracking-custom_4 text-secondary"
              dangerouslySetInnerHTML={{ __html: formattedDescription }}
            ></div>
          </div>
        </div>
      </ClientComponent>
    </div>
  );
};

export default ProductInfo;
