import React from "react";
import Image from "next/image";
import logo from "./../public/logo.png";
import cart from "./../public/cart.png";
import box from "./../public/box.png";
import profileIcon from "./../public/profile.png";
import profileSteam from "./../public/steamImage.jpg";
import foriImage from "./../public/fori.png";
import Link from "next/link";

function Header() {
  return (
    <header className="bg-[#303741] flex justify-between py-3 px-2 items-center">
      <div className="flex gap-10 h-full items-center">
        <Link href={"/"}>
          <Image
            src={logo}
            width={118}
            height={38}
            alt="logo"
            className="object-contain"
          />
        </Link>
        <div className="flex gap-7">
          <div
            className="text-white
              cursor-pointer
              max-[767px]:hidden
              flex gap-3
              bg-[#444c57]
              h-[60px]
              px-8
              rounded-[2px]
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
            h-[60px]
            px-5
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
            <div className="flex h-full items-center">0</div>
          </div>
          <div
            className="
       tablet:text-white 
       max-[767px]:hidden 
       tablet:flex tablet:items-center 
       tablet:w-[250px]
       tablet:h-[60px]
       tablet:bg-[#202126]
        
       "
          >
            <div className="bg-[#202126] w-[75%] flex items-center justify-center h-full font-IRANSansWeb text-[14px]">
              <div className="flex gap-2 items-center text-xl">
                <div className="mt-1">0</div>
                <div>تومان</div>
              </div>
            </div>
            <div className="w-[25%] h-full flex flex-col gap-1 items-center justify-center p-1">
              <div className="border border-[#202126] rounded-[5px] p-2 bg-[#444c57] w-full h-1/2 flex justify-center items-center text-3xl cursor-pointer">
                +
              </div>
              <div className="border border-[#202126] rounded-[5px] p-2 bg-[#2a2f36] w-full h-1/2 flex justify-center items-center text-3xl cursor-pointer">
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
