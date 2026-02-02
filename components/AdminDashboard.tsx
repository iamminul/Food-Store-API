import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ShoppingCart } from "lucide-react";

type Props = {};

export default function AdminDashboard(props: Props) {
  return (
    <div className="min-h-screen bg-backgroud">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Food Store Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your products and order
          </p>
        </div>
      </div>

      <Tabs defaultValue="product" className="gap-6 px-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="product" className="flex items-center gap-2">
            <Package /> Product
          </TabsTrigger>

          <TabsTrigger value="order" className="flex items-center gap-2">
            {" "}
            <ShoppingCart /> Order
          </TabsTrigger>
        </TabsList>

        {/* Product content  */}
        <TabsContent value="product" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Product</CardTitle>
              <CardDescription>
                View your product details
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
                {/* <ProductTable/> */}
               product table
            </CardContent>
          </Card>
        </TabsContent>

        {/* order content */}
        <TabsContent value="order" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Order</CardTitle>
              <CardDescription>
               View your Order details
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
                {/* <OrderTable/> */}
              order table
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
