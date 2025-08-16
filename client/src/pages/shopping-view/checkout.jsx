import Address from "@/components/shopping-view/address";
import images from "../../assets/banner-1.webp";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const { approvalURL } = useSelector((state) => state.shopOrder);

  console.log("current selected address is", currentSelectedAddress);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      toast("Your cart is empty. Please add items to proceed");
      return;
    }
    console.log("clicked");
    if (currentSelectedAddress === null) {
      toast("Please select one address to proceed.");

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    console.log("clicked and reached here");
    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "modak");
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }
  console.log("the approvalURL is", approvalURL);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img src={images} className="h-full w-full object-cover" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Checkout</h1>
            <p className="text-lg md:text-xl text-white/90">
              Complete your purchase
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Address Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6 fade-in">
            <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Delivery Address
            </h2>
            <Address
              selectedId={currentSelectedAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 fade-in">
              <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                  <>
                    <div className="divide-y divide-gray-100">
                      {cartItems.items.map((item) => (
                        <div key={item._id} className="py-4">
                          <UserCartItemsContent cartItem={item} />
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-3">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${totalCartAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span className="text-primary">${totalCartAmount}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                      onClick={() => handleInitiatePaypalPayment()}
                      disabled={isPaymentStart}
                    >
                      {isPaymentStart ? (
                        <div className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing Payment...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 justify-center">
                          <span>Checkout with PayPal</span>
                          <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M20.067 8.478c.492.315.844.827.983 1.42a5.558 5.558 0 0 1-.091 2.011q-1.012 5.085-5.86 5.085h-.001a1.71 1.71 0 0 0-1.636 1.233l-.105.422-.799 5.053-.071.386a.929.929 0 0 1-.92.752h-3.26c-.54 0-.899-.39-.784-.914l2.47-15.692a1.068 1.068 0 0 1 1.058-.862h6.889c1.034 0 2.029.276 2.717.791z"
                            />
                          </svg>
                        </div>
                      )}
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-lg">
                      Your cart is empty
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
