import { Carousel } from "antd";

interface ICarouselComponent {
  images: string[];
  children?: React.ReactNode;
}

const CarouselComponent: React.FC<ICarouselComponent> = ({
  images,
  children,
}) => {
  return (
    <div>
      <Carousel
        swipeToSlide
        slidesPerRow={1}
        autoplay
        lazyLoad="progressive"
      >
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`carousel-${index}`}
              className="w-full h-100 object-cover"
            />
          </div>
        ))}
      </Carousel>
      {children}
    </div>
  );
};

export default CarouselComponent;

