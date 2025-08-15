import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import images from "../../assets/banner-1.webp";
import ShoppingOrders from "@/components/shopping-view/orders";
import Address from "@/components/shopping-view/address";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src={images}
          alt="image not found"
          className="h-full w-full object-cover object-fit"
        />
      </div>
      <div className="container mx-auto grid grid-cold-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
