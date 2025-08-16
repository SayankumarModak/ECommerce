import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";

// import image1 from "../assets/banner-1.webp";
// import image2 from "../../assets/banner-2.webp";
// import image3 from "../../assets/banner-3.webp";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import ShoppingProductTile from "@/components/shopping-view/prduct-tile";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const imageList = [
    "/src/assets/banner-1.webp",
    "/src/assets/banner-2.webp",
    "/src/assets/banner-3.webp",
  ];
  // console.log(imageList);
  const size = imageList.length;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleNavigateToListingPage(getCurrentItem, section) {
    console.log(sessionStorage.removeItem("filters"));
    sessionStorage.removeItem("filters");
    console.log("removed");

    const currrentFilter = {
      [section]: [getCurrentItem.label],
    };
    sessionStorage.setItem("filters", JSON.stringify(currrentFilter));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    console.log(getCurrentProductId, "in the listing");
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      // console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast("Product is added to cart");
      }
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % size);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [size]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "" }));
  }, [dispatch]);

  // useEffect(() => {
  //   sessionStorage.setItem("filters", JSON.stringify("")); // Clear the filters
  // }, []);
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative w-full h-[600px] xl:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <div className="absolute inset-x-0 top-8 z-30">
          <div className="container mx-auto px-4">
            <Logo size="large" />
          </div>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-4xl">
            <div className="space-y-6 fade-in">
              <h1 className="text-6xl md:text-7xl font-black mb-4 leading-tight">
                <span className="block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  Elevate Your Style
                </span>
                <span className="block text-4xl md:text-5xl mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  With LUXORA
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                Discover curated collections that define luxury and elegance
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate("/shop/listing")}
                  className="bg-white text-black hover:bg-white/90 hover:scale-105 transform transition-all duration-300 text-lg px-8 py-6"
                >
                  Explore Collection
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/shop/listing")}
                  className="border-white text-white hover:bg-white/10 hover:scale-105 transform transition-all duration-300 text-lg px-8 py-6"
                >
                  New Arrivals
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-20"></div>
        <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center space-x-2 pb-4">
          {imageList.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + size) % size)
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 border-none text-white z-20 rounded-full"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % size)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 border-none text-white z-20 rounded-full"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </Button>
      </div>
      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <Logo />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Curated Categories
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore LUXORA's handpicked collections, where luxury meets style
              in every category
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="group cursor-pointer hover-scale shadow-custom-hover overflow-hidden bg-white/50 backdrop-blur-sm"
              >
                <CardContent className="flex flex-col items-center justify-center p-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:opacity-100 transition-opacity" />
                  <categoryItem.icon className="w-16 h-16 mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-lg">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative">
        <div className="absolute inset-0 bg-[url('/luxury-pattern.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              Luxury Brands
            </h2>
            <p className="text-lg text-muted-foreground">
              LUXORA partners with the world's most prestigious fashion houses
              to bring you unparalleled quality
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="group cursor-pointer hover-scale shadow-custom-hover overflow-hidden bg-white/50 backdrop-blur-sm"
              >
                <CardContent className="flex flex-col items-center justify-center p-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent group-hover:opacity-100 transition-opacity" />
                  <brandItem.icon className="w-16 h-16 mb-4 text-secondary group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-lg">
                    {brandItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-transparent rounded-full"></div>
              <span className="text-lg font-medium text-primary">
                LUXORA Exclusives
              </span>
              <div className="w-12 h-[2px] bg-gradient-to-l from-primary to-transparent rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
              Featured Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most coveted pieces, carefully selected to define the
              epitome of luxury fashion
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productList && productList.length > 0 ? (
              productList.map((productItem) => (
                <div
                  key={productItem._id}
                  className="fade-in"
                  style={{
                    animationDelay: `${
                      productList.indexOf(productItem) * 0.1
                    }s`,
                  }}
                >
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Loading amazing products...
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Newsletter
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Stay updated with our latest trends and products
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-primary hover:bg-white/90 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;
