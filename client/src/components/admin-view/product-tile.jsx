import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setOpenCreateProductsDialog,
  handleDelete,
  setCurrentEditedId,
  setFormData,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[200px] object-fit rounded-t-lg "
          />
          <CardContent>
            <h2 className="text-xl font-bold  mt-3">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-bold">${product?.salePrice}</span>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center my-2">
            <Button
              onClick={() => {
                setOpenCreateProductsDialog(true),
                  setCurrentEditedId(product?._id),
                  setFormData(product);
              }}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

export default AdminProductTile;
