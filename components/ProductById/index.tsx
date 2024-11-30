// Components
import NavigationComponent from "./NavigationComponent";
import ProductInfo from "./ProductInfo";

// actions
import fetchProductByIdAction from "@/app/actions/fetchProductByIdAction";

interface IProps {
  id: string;
}

const ProductById = async (props: IProps) => {
  const product = await fetchProductByIdAction(props.id);

  return (
    <div>
      <NavigationComponent subCategory={product.category.sub_category} />
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductById;
