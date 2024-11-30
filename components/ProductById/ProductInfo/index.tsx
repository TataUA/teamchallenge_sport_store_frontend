// helpers
import getTranslatedSubcategoryFromUkraineToEnglish from "@/helpers/getTranslatedSubcategoryFromUkraineToEnglish";

// components
import SizesModal from "./SizesModal";
import { ClientComponent } from "@/components/ClientComponent";
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
    <div className="1440:flex gap-5">
      <ClientComponent>
        <div className="1440:max-w-[628px]">
          <SliderComponent />
        </div>
        <div className="1440:max-w-[628px]">
          <div className="1440:mt-4 mb-4 1440:mb-6 text-base 1440:text-xl tracking-custom_4 1440:tracking-custom_2 text-title">
            {product.title}
          </div>
          <div className="mb-8 1440:mb-10 font-semibold text-2xl tracking-custom_2 text-title">
            {price + " грн"}
          </div>
          <ColorPickerComponent colors={colors} />
          <SizesModal
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
