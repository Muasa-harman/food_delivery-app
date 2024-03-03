import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { MenuItem as MenuItemType } from "../types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>(()=>{
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (MenuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      // check if the item is already in the cart
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === MenuItem._id
      );
      let updatedCartItems;
      // if the item is in cart, update the quantity
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === MenuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        // if item in not in the cart, add it as new item
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: MenuItem._id,
            name: MenuItem.name,
            price: MenuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = (userFormData: UserFormData) =>{
    console.log("userFormData", userFormData)
  }

  if (isLoading || !restaurant) {
    return "Loading...";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-mb object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div className="">
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout}/>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
