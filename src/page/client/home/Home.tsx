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
    const fectData = async () => {
      const res = await product.getProduct();
      setProduct(res.data);
    };
    fectData();
  }, []);
  return (
    <div className="bg-gray-200">
      <CarouselComponent
        images={[
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsKcLtcDvagrqCxPXwH7LG9Nddg1K83l6tQ&s",
          "https://cdn.thewirecutter.com/wp-content/media/2024/11/runningshoes-2048px-09522.jpg?auto=webp&quality=75&width=1024",
          "https://www.jiomart.com/images/product/original/rvl9cvytva/bruton-trendy-sports-shoes-for-men-blue-product-images-rvl9cvytva-0-202209021254.jpg?im=Resize=(1000,1000)",
          "https://cdn.mart.ps/255014-thickbox_default/adidas-men-s-xplr-path-shoes-black-%D8%AD%D8%B0%D8%A7%D8%A1-%D8%A7%D8%AF%D9%8A%D8%AF%D8%A7%D8%B3-%D8%A7%D9%83%D8%B3-%D8%A8%D9%84%D9%88%D8%B1-%D8%A8%D8%A7%D8%AB-%D9%84%D9%84%D8%B1%D8%AC%D8%A7%D9%84-%D9%84%D9%88%D9%86-%D8%A3%D8%B3%D9%88%D8%AF-%D9%88%D9%86%D8%B9%D9%84-%D8%A7%D8%A8%D9%8A%D8%B6.jpg",
        ]}
      />
      <div className="p-10 grid grid-cols-6 gap-4">
        {products.map((product) => (
          <div className="flex justify-center">
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  onClick={() => navigate(`/products/${product.pro_id}`)}
                  src={product.pro_image ?? "/src/assets/shoes.jpeg"}
                />
              }
            >
              <Meta
                title={product.pro_name}
                description={
                  <div>
                    <div className="flex justify-between">
                      <p className="truncate">{product.pro_detail}</p>
                      <div className="flex gap-2">
                        <p>
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "Lak",
                          }).format(product.pro_price)}
                        </p>
                      </div>
                    </div>

                    <div className=" flex justify-end">
                      <div
                        className="bg-gray-300 rounded flex  items-center  w-fit cursor-pointer"
                        onClick={() => navigate("/cart")}
                      >
                        <ShoppingCartOutlined />
                        <p>Add to cart</p>
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
