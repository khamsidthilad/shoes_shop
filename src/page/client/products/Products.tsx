import React from "react";
import CarouselComponent from "../home/component/Carousel";
import { Card, Col, Input, Row, Select, Spin } from "antd";
import product from "../../../api/product";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import category from "../../../api/category";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import {
  ICategory,
  IGetListBrand,
  IProductItem,
} from "../../../types/admin/product/product";

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [allProducts, setAllProducts] = useState<IProductItem[]>([]); // Store all products for filtering
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL = "http://localhost:3003";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await category.getCategory();
        console.log("get category to responsive", res.data);
        setCategories(res.data);
        if (res.data && res.data.length > 0) {
          setSelectedCategoryId(res.data[0].cate_id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (!selectedCategoryId) return;

      setLoading(true);
      try {
        const res = await product.getProductByCategory(selectedCategoryId);
        setProducts(res.data);
        setAllProducts(res.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategoryId]);

  const handleCategoryChange = (value: React.SetStateAction<null>) => {
    setSelectedCategoryId(value);
    setSearchText(""); 
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value.trim()) {
      setProducts(allProducts);
      return;
    }

    const filteredProducts = allProducts.filter(
      (product) =>
        product.pro_name.toLowerCase().includes(value.toLowerCase()) ||
        (product.pro_detail &&
          product.pro_detail.toLowerCase().includes(value.toLowerCase()))
    );

    setProducts(filteredProducts);
  };

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

      <div className="flex justify-between items-center">
        <div className="w-[40%] py-4 px-10">
          <Input
            placeholder="Search brands"
            value={searchText}
            onChange={handleSearch}
            prefix={<SearchOutlined />}
            className="w-64"
            allowClear
          />
        </div>
        <div className="w-1/ mt-2 px-10">
          <div className="category-selector">
            <h2>Select Category</h2>
            <Select
              placeholder="Select a category"
              style={{ width: 300, marginBottom: 20 }}
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              options={categories.map((cate) => ({
                value: cate.cate_id,
                label: cate.cate_name,
              }))}
            />
          </div>
        </div>
      </div>
      {loading && (
        <div className="loading-container">
          <Spin size="large" tip="Loading products..." />
        </div>
      )}
      {!loading && products.length === 0 && (
        <div className="no-products text-center py-10">
          <p>
            No products found{" "}
            {searchText ? "matching your search" : "in this category"}
          </p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="products-grid p-10">
          <Row gutter={[16, 16]}>
            {products.map((item) => (
              <Col xs={24} sm={12} md={8} lg={6} key={item.pro_id}>
                <Card
                  hoverable
                  cover={
                    item.pro_image && (
                      <img
                        crossOrigin="anonymous"
                        alt={item.pro_name}
                        src={`${BASE_URL}/${item.pro_image}`}
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    )
                  }
                >
                  <Card.Meta
                    title={item.pro_name}
                    description={
                      <div>
                        <p>
                          <strong>Price:</strong> {item.pro_price} KIp
                        </p>
                        <p className="truncate">{item.pro_detail}</p>
                      </div>
                    }
                  />
                  <div className="flex justify-end">
                    <div
                      className="bg-gray-300 rounded flex items-center w-fit cursor-pointer p-2 mt-2 hover:bg-gray-400"
                      onClick={() => navigate("/cart")}
                    >
                      <ShoppingCartOutlined />
                      <p className="ml-1 mb-0">Add to cart</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default Products;
