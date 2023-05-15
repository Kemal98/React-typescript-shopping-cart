import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

type ShopingCartContext = {
  openCart:() => void
  closeCart:() => void
  cartQuantity:number
  cartItems:CartItem[]
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number, name:string) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

type SopingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
  name:string
};

const ShoppingCartContext = createContext({} as ShopingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShopingCartProvider({ children }: SopingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);


  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number, name:string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, name, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }


  function removeFromCart (id:number) {
    setCartItems(currItem => {
      return currItem.filter(item => item.id !== id)
    })
  }


  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
