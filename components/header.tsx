import React from "react";
import Image from "next/image";
import logo from "./../public/logo.png";
import cart from "./../public/cart.png";
import box from "./../public/box.png";
import profileIcon from "./../public/profile.png";
import profileSteam from "./../public/steamImage.jpg";
import foriImage from "./../public/fori.png";

function Header() {
  return (
    <header className="bg-[#303741] flex justify-between py-3 px-2 items-center">
      <div className="flex gap-10">
        <Image
          src={logo}
          width={118}
          height={38}
          alt="logo"
          className="object-contain"
        />
        <div className="flex gap-7">
          <div
            className="text-white
        cursor-pointer
        max-[767px]:hidden
        flex gap-3
        bg-[#444c57]
        p-2
        h-[40px]
        rounded-[2px]
        px-7
        "
          >
            <Image
              src={box}
              width={24}
              height={32}
              alt="logo"
              className="object-contain"
            />
          </div>
          <div
            className="text-white
        cursor-pointer
        max-[767px]:hidden
        flex gap-3
        bg-[#444c57]
        p-2
        h-[40px]
        rounded-[2px] 
        "
          >
            <Image
              src={cart}
              width={24}
              height={32}
              alt="logo"
              className="object-contain"
            />
            0
          </div>
          <div
            className="
       tablet:text-white 
       max-[767px]:hidden 
       tablet:flex tablet:items-center 
       tablet:w-[200px]
       tablet:h-[40px]
       tablet:bg-[#202126]
    
       "
          >
            <div className="bg-[#202126] w-[75%] flex items-center justify-center h-full font-IRANSansWeb text-[14px]">
              <div className="flex gap-2 items-center">
                <div className="mt-1">0</div>
                <div>تومان</div>
              </div>
            </div>
            <div className="w-[25%] h-full flex flex-col items-center justify-center p-1">
              <div className="border border-[#202126] rounded-[5px] p-2 bg-[#444c57] w-full h-1/3 flex justify-center items-center text-xl cursor-pointer">
                +
              </div>
              <div className="border border-[#202126] rounded-[5px] p-2 bg-[#2a2f36] w-full h-1/3 flex justify-center items-center text-xl cursor-pointer">
                -
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="min-[991px]:hidden h-fit text-white p-18 bg-[#3f4854] py-1 px-4 rounded-[5px] font-IRANSansWeb">
        منو
      </button>
      <div className="flex gap-2 max-[990px]:hidden">
        <button>
          <Image
            src={foriImage}
            width={31}
            height={16}
            alt="logo"
            className="object-contain cursor-pointer "
          />
        </button>
        <Image
          src={profileIcon}
          width={32}
          height={32}
          alt="logo"
          className="object-contain cursor-pointer"
        />
        <button className="flex p-2 gap-2 bg-[#3f4854] rounded-[3px]">
          <div className="max-[990px]:hidden flex h-full items-center text-white">
            ALIREZA
          </div>
          <Image
            src={profileSteam}
            width={32}
            height={32}
            alt="logo"
            className="object-contain cursor-pointer rounded-lg"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
