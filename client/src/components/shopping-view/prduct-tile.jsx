import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddTocart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-700">
              Sale is Live
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {product?.brand}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              {product?.price}
            </span>
            <span
              className={`
              } text-lg font-semibold text-primary`}
            >
              {product?.salePrice}
            </span>
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() => handleAddTocart(product?._id)}
          className="w-full"
        >
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
