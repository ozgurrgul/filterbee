import { Stars } from "./Stars";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./primitives/Card";

export type SimpleProduct = {
  id?: string | number;
  title?: string;
  description?: string;
  rating?: number;
  price?: string | number;
  image?: string;
};

export type SimpleProductCardProps = {
  product?: SimpleProduct;
  onClick?: (product: SimpleProduct) => void;
};

export const SimpleProductCard: React.FC<SimpleProductCardProps> = ({
  product,
  onClick,
}) => {
  if (!product) {
    return null;
  }
  return (
    <Card
      key={product.id || product.title}
      className="flex flex-col cursor-pointer"
      onClick={() => onClick && onClick(product)}
    >
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <img
          src={product.image}
          className="w-full h-48 rounded-md overflow-hidden shadow-lg"
        />
        <div className="text-slate-500 mt-4">{product.description}</div>
        <div className="flex">
          {product.rating && (
            <Stars amountOfStars={product.rating} type="single" />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <span>${product.price}</span>
      </CardFooter>
    </Card>
  );
};
