import React, { useState } from "react";
import { formatMoney } from "../ultils/helpers";
import label from "../assets/new.png";
import trending from "../assets/trending.png";
import { renderStartFromNumber } from "../ultils/helpers";
import { SelectOption } from "./";
import icons from "../ultils/icons";

const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons;

const Product = ({ productData, isNew }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className="w-full text-base px-[10px] ">
      <div
        className="w-full border p-[15px] flex flex-col items-center"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className=" absolute bottom-[-10px] left-0 right-0 flex justify-center gap2 animate-slide-top">
              <SelectOption icons={<AiFillEye />} />
              <SelectOption icons={<AiOutlineMenu />} />
              <SelectOption icons={<BsFillSuitHeartFill />} />
            </div>
          )}
          <img
            src={
              productData?.thumb ||
              "https://tracerproducts.com/wp-content/uploads/2019/12/Product-Image-Coming-Soon.jpg"
            }
            alt=""
            className="w-[274px] h-[243px] object-cover"
          />
          <img
            src={isNew ? label : trending}
            alt=""
            className={`absolute w-[100px] h-[35px] top-0 right-[0] object-cover`}
          />
          <span
            className={`font-bold  top-[-10px] left-[-12px] text-white absolute ${
              isNew ? "" : "text-sm"
            }`}
          >
            {isNew ? "New" : "Trending"}
          </span>
        </div>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="flex h-4  ">
            {renderStartFromNumber(productData?.totalRatings)}
          </span>
          <span className="line-clamp-1 "> {productData?.title} </span>
          <span> {`${formatMoney(productData?.price)} VNĐ`}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
