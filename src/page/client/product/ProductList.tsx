import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import CarouselComponent from "./component/Carousel";

const ProductClientPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
        <Header className="flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-white text-xl font-bold">Miler</div>

        {/* Navbar Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={["home"]}
          items={[
            {
              key: "home",
              label: "Home",
              onClick: () => navigate("/"),
            },
            {
              key: "products",
              label: "Products",
              onClick: () => navigate("/product"),
            },
            {
              key: "cart",
              label: "cart",
              onClick: () => navigate("/Cart"),
            },
          ]}
        />

        {/* Buttons */}
        <div className="flex gap-2">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
        </div>
      </Header>
      <CarouselComponent
        images={[
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsKcLtcDvagrqCxPXwH7LG9Nddg1K83l6tQ&s",
          "https://cdn.thewirecutter.com/wp-content/media/2024/11/runningshoes-2048px-09522.jpg?auto=webp&quality=75&width=1024",
          "https://www.jiomart.com/images/product/original/rvl9cvytva/bruton-trendy-sports-shoes-for-men-blue-product-images-rvl9cvytva-0-202209021254.jpg?im=Resize=(1000,1000)",
          "https://cdn.mart.ps/255014-thickbox_default/adidas-men-s-xplr-path-shoes-black-%D8%AD%D8%B0%D8%A7%D8%A1-%D8%A7%D8%AF%D9%8A%D8%AF%D8%A7%D8%B3-%D8%A7%D9%83%D8%B3-%D8%A8%D9%84%D9%88%D8%B1-%D8%A8%D8%A7%D8%AB-%D9%84%D9%84%D8%B1%D8%AC%D8%A7%D9%84-%D9%84%D9%88%D9%86-%D8%A3%D8%B3%D9%88%D8%AF-%D9%88%D9%86%D8%B9%D9%84-%D8%A7%D8%A8%D9%8A%D8%B6.jpg",
        ]}
      />
    </div>
  );
};

export default ProductClientPage;
