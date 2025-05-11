import React, { useEffect, useState } from "react";
import product from "../../../../api/product";
import { useNavigate, useParams } from "react-router-dom";
import { IProductItem } from "../../../../types/admin/product/product";
import { Button } from "antd";

const ProductDetail: React.FC = () => {
  const [productDetail, setProductDetail] = useState<IProductItem>();
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  useEffect(() => {
    const fectData = async () => {
      if (id) {
        const res = await product.getProductById(id);
        setProductDetail(res.data);
      }
    };
    fectData();
  }, []);
  const BASE_URL = "http://localhost:3003";

  return (
    <div className="flex justify-center py-10">
      <div className="flex gap-4 w-full max-w-screen-lg">
        {/* Image section (40%) */}
        <div className="basis-2/5">
          <img
            crossOrigin="anonymous"
            src={
              `${BASE_URL}${productDetail?.pro_image}` ?
              `${BASE_URL}${productDetail?.pro_image}` :
              "/src/assets/shoes.jpeg"
            }
            alt=""
            className="w-full object-cover"
          />
        </div>

        {/* Details section (60%) */}
        <div className="basis-3/5">
          <h1 className="text-2xl font-semibold">{productDetail?.pro_name}</h1>
          <p className="mt-2 font-light">{productDetail?.pro_detail}</p>
          <p className="mt-2 text-2xl">
            Price:{" "}
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "Lak",
            }).format(productDetail?.pro_price ?? 0)}
          </p>
          <div className="py-4">
            <Button
              onClick={() => {
                if (!productDetail) return;

                const cart = JSON.parse(localStorage.getItem("cart") || "[]");

                const isAlreadyInCart = cart.some(
                  (item: IProductItem) => item.pro_id === productDetail.pro_id
                );

                if (!isAlreadyInCart) {
                  cart.push(productDetail);
                  localStorage.setItem("cart", JSON.stringify(cart));
                }

                navigate("/cart");
              }}
              disabled={!productDetail}
            >
              {productDetail ? "Add to cart" : "Loading..."}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
