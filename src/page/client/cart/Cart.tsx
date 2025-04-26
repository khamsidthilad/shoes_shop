import React, { useEffect, useState } from "react";
import { IProductItem } from "../../../types/admin/product/product";
import { Button, Card } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<IProductItem[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (productId: string) => {
    const updatedCart = cartItems.filter(
      (item) => String(item.pro_id) !== productId
    );
    setCartItems(updatedCart);
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateCart = (items: IProductItem[]) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const changeQty = (productId: string, delta: number) => {
    const updatedCart = cartItems.map((item) => {
      if (String(item.pro_id) === productId) {
        const newQty = Math.max(1, (item.pro_qty ?? 1) + delta);
        return { ...item, pro_qty: newQty };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  return (
    <div className="p-8 flex gap-4">
      <div className="w-3/5">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">🛒 Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.pro_id}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-200"
              >
                <img
                  src={item.pro_image ?? "/src/assets/shoes.jpeg"}
                  alt={item.pro_name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.pro_name}
                  </h2>
                  <p className="text-gray-500">{item.pro_detail}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-gray-600 font-medium">Quantity:</span>
                    <Button
                      onClick={() => changeQty(item.pro_id, -1)}
                      icon={<MinusOutlined />}
                      size="small"
                    />
                    <span className="px-2 text-lg">{quantity}</span>
                    <Button
                      onClick={() => changeQty(item.pro_id, 1)}
                      icon={<PlusOutlined />}
                      size="small"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between h-full ml-auto gap-4">
                  <p className="text-lg font-bold text-green-600">
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "LAK",
                    }).format(item.pro_price ?? 0)}
                  </p>
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeFromCart(item.pro_id.toString())}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-2/5">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">🛒 Your Order</h1>
        <div>
          <Card>
            <h1></h1>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
