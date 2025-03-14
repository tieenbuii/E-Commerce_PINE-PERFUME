import React, { useState, useEffect } from "react";
import { apiGetProducts } from "../apis/product";
import { Product, CustomSlider } from "./";
import {getNewProducts} from '../store/products/asyncActios'
import { useDispatch,useSelector } from "react-redux";

const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
];

var settings = {
  dots: false,
  infinity: false,
  speed: 500,
  sliderToShow: 3,
  sliderToScroll: 1,
};

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [activeTab, setActivedTab] = useState(1);
  const [products,setProducts] = useState(null); 
  const dispatch = useDispatch()
  const {newProducts} = useSelector(state => state.Product )
  
  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" })
    if (response.success) {
        setBestSellers(response.products)
        setProducts(response.products)
    };
    
  };

  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts())
  }, []);
   useEffect(() => {
      if(activeTab === 1 ) setProducts(bestSellers)
      if(activeTab === 2 ) setProducts(newProducts)
   }, [activeTab])
  return (
    <div>

      <div className="flex text-[20px] ml-[32px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase capitalize px-8 border-r cursor-pointer text-gray-400  
            ${activeTab === el.id ? "text-gray-900" : ""}
            `}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>

      <div className="mt-4 mx-[-10px] border-t-2 border-main pt-4">
          <CustomSlider products={products} activeTab={activeTab}/>
      </div>
      <div className="w-full flex gap-4 mt-8">
        <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" 
        alt="Banner" 
        className="flex-1 object-contain"
        />
        <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" 
        alt="Banner" 
        className="flex-1 object-contain"
        />
      </div>
    </div>
  );
};

export default BestSeller;
