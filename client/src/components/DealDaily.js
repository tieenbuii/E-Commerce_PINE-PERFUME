import React, { useEffect, memo, useState } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis/product";
import {renderStartFromNumber, formatMoney} from '../ultils/helpers'

const { AiFillStar , AiOutlineMenu } = icons;

const DealDaily = () => {
  const [dealdaily, setDealdaily] = useState(null);

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({ limit: 1, page: 5 , totalRatings: 5});
    if (response.success) setDealdaily(response.products[0]);
  };

  useEffect(() => {
    fetchDealDaily();
  }, []);

  return (
    <div className="border w-full flex-auto">
      <div className="flex item-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="#DD1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">
          {" "}
          Deal Daily
        </span>
        <span className="flex-1 "></span>
      </div>
      <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
        <img
          src={
            dealdaily?.thumb ||
            "https://tracerproducts.com/wp-content/uploads/2019/12/Product-Image-Coming-Soon.jpg"
          }
          alt=""
          className="w-full  object-contain"
        />
        <span className="line-clamp-1 text-center"> {dealdaily?.title} </span>
        <span className="flex h-4  ">
          {renderStartFromNumber(dealdaily?.totalRatings, 20)}
        </span>
        <span> {`${formatMoney(dealdaily?.price)} VNĐ`}</span>
      </div>
      <div className="px-4 mt-4">
          <button type='button' className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gay-800 text-while font-medium py-2">
             <AiOutlineMenu/>
             <span>Options</span>
          </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
