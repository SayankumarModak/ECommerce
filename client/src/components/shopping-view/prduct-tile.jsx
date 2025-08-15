import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
      <div 
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <div className="aspect-[4/5]">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Overlay with product info on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm font-medium">{categoryOptionsMap[product?.category]}</p>
              <p className="text-sm opacity-80">{brandOptionsMap[product?.brand]}</p>
            </div>
          </div>

          {/* Status badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product?.totalStock === 0 ? (
              <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                Only {product?.totalStock} left
              </Badge>
            ) : null}
            {product?.salePrice > 0 && (
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Sale
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product?.title}
          </h2>
          
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Price
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`${
                    product?.salePrice > 0 
                      ? "text-sm line-through text-muted-foreground" 
                      : "text-xl font-bold text-primary"
                  }`}
                >
                  ${product?.price}
                </span>
                {product?.salePrice > 0 && (
                  <span className="text-xl font-bold text-primary">
                    ${product?.salePrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-4 pt-0">
        {product?.totalStock === 0 ? (
          <Button 
            className="w-full opacity-60 cursor-not-allowed bg-gray-200 hover:bg-gray-200"
            disabled
          >
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product?._id, product?.totalStock);
            }}
            className="w-full bg-primary hover:bg-primary/90 transition-colors duration-300"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
