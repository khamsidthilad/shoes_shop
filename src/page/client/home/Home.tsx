import { useNavigate } from "react-router-dom";
import CarouselComponent from "./component/Carousel";
import { Card } from "antd";
import { useEffect, useState } from "react";
import product from "../../../api/product";
import { IProductItem } from "../../../types/admin/product/product";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ProductClientPage: React.FC = () => {
  const navigate = useNavigate();
  const { Meta } = Card;
  const [products, setProduct] = useState<IProductItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await product.getProduct();
      setProduct(res.data);
    };
    fetchData();
  }, []);

  const BASE_URL = "http://localhost:3003";

  return (
    <div className="bg-gray-200 min-h-screen">
      <CarouselComponent
        images={[
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsKcLtcDvagrqCxPXwH7LG9Nddg1K83l6tQ&s",
          "https://cdn.thewirecutter.com/wp-content/media/2024/11/runningshoes-2048px-09522.jpg?auto=webp&quality=75&width=1024",
          "https://www.jiomart.com/images/product/original/rvl9cvytva/bruton-trendy-sports-shoes-for-men-blue-product-images-rvl9cvytva-0-202209021254.jpg?im=Resize=(1000,1000)",
          "https://cdn.mart.ps/255014-thickbox_default/adidas-men-s-xplr-path-shoes-black-%D8%AD%D8%B0%D8%A7%D8%A1-%D8%A7%D8%AF%D9%8A%D8%AF%D8%A7%D8%B3-%D8%A7%D9%83%D8%B3-%D8%A8%D9%84%D9%88%D8%B1-%D8%A8%D8%A7%D8%AB-%D9%84%D9%84%D8%B1%D8%AC%D8%A7%D9%84-%D9%84%D9%88%D9%86-%D8%A3%D8%B3%D9%88%D8%AF-%D9%88%D9%86%D8%B9%D9%84-%D8%A7%D8%A8%D9%8A%D8%B6.jpg",
        ]}
      />

      {/* Products grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {products.map((product) => (
          <div key={product.pro_id} className="flex justify-center">
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  crossOrigin="anonymous"
                  onClick={() => navigate(`/products/${product.pro_id}`)}
                  src={
                    product.pro_image
                      ? `${BASE_URL}${product.pro_image}`
                      : "/src/assets/shoes.jpeg"
                  }
                  alt={product.pro_name}
                  className="w-full h-48 object-cover cursor-pointer"
                />
              }
            >
              <Meta
                title={<p className="truncate">{product.pro_name}</p>}
                description={
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <p className="truncate">{product.pro_detail}</p>
                      <p className="text-green-600 font-semibold">
                        {new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "LAK",
                        }).format(product.pro_price)}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <div
                        className="bg-gray-300 rounded-md flex items-center gap-2 py-1 px-3 cursor-pointer hover:bg-gray-400 transition"
                        onClick={() => {
                          const cart = JSON.parse(
                            localStorage.getItem("cart") || "[]"
                          );

                          const isAlreadyInCart = cart.some(
                            (item: IProductItem) =>
                              item.pro_id === product.pro_id
                          );

                          if (!isAlreadyInCart) {
                            cart.push(product);
                            localStorage.setItem("cart", JSON.stringify(cart));
                          }

                          navigate("/cart");
                        }}
                      >
                        <ShoppingCartOutlined />
                        <span>Add to cart</span>
                      </div>
                    </div>
                  </div>
                }
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductClientPage;
