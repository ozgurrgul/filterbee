import { SimpleProduct, SimpleProductCard } from "./SimpleProductCard";

export type SimpleProductLayoutProps = {
  products?: SimpleProduct[];
  onClick?: (product: SimpleProduct) => void;
};

export const SimpleProductLayout: React.FC<SimpleProductLayoutProps> = ({
  products,
  onClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products?.map((product, index) => (
        <SimpleProductCard
          key={product.id || `product.title-${index}`}
          product={product}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
