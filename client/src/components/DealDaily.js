import React, { useEffect, memo, useState } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis/product";
import { renderStartFromNumber, formatMoney , secondsToHms} from "../ultils/helpers";
import { Countdown } from "./";
import moment from "moment/moment";
const { AiFillStar, AiOutlineMenu } = icons;
let idInterval
const DealDaily = () => {
  
  const [dealdaily, setDealdaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    });
    if (response.success) {

      // set api gọi từ 5h sáng   
      setDealdaily(response.products[0]);
      const today = `${moment().format('MM/DD/YYYY')} 5:00:00`
      const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
      const number = secondsToHms(seconds)

      // set qua ngày mới thì gọi api một lần
    //   const h = 24 - new Date().getHours() 
    //   const m = 60 - new Date().getMinutes() 
    //   const s = 60 - new Date().getSeconds() 
      setHour(number.h);
      setMinute(number.m);
      setSecond(number.s);
    }else { 
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  };

  //   useEffect(() => {
  //     fetchDealDaily();
  //   }, []);

  useEffect(() => {
    clearInterval(idInterval);
    fetchDealDaily()
  }, [expireTime]);
  useEffect(() => {
     idInterval = setInterval(() => {
      
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
        setMinute((prev) => prev - 1);
        setSecond(59);
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);

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
      <div className="px-4 mt-8">
        <div className="flex justify-center gap-2 items-center">
          <Countdown unit={"Hour"} number={hour} />
          <Countdown unit={"Minute"} number={minute} />
          <Countdown unit={"Second"} number={second} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gay-800 text-while font-medium py-2"
        >
          <AiOutlineMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
