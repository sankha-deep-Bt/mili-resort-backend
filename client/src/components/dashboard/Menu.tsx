import { ORDERABLE_MENU_ITEMS } from "../../data/orderableMenu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const Menu = () => {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-light mb-4 text-center">Food & Beverages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {ORDERABLE_MENU_ITEMS.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-stone-600 font-medium">₹{item.price}</p>
              <Button>Add</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Menu;
