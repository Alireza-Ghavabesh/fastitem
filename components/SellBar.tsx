import APIicon from "@/public/APIicon.png";
import steamWalletIcon from "@/public/steamwalletIcon.png";
import dota2LeageIcon from "@/public/dota2LeageIcon.png";
import streamersIcon from "@/public/streamersIcon.png";
import itemRustIcon from "@/public/itemRustIcon.png";
import itemTF2Icon from "@/public/itemTF2Icon.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function SellBar() {
  return (
    <div className="flex justify-between gap-4 max-[640px]:hidden w-full px-5 whitespace-nowrap">
      <button className="bg-[#009688] flex items-center gap-1 p-2 rounded text-white font-IranYekanWebBold h-[45px]">
        آموزش کامل سایت
        <FontAwesomeIcon icon={faPlayCircle} />
      </button>
      <div className="text-white flex flex-wrap gap-2 justify-end items-center font-IranYekanWebBold">
        <button className="flex bg-[#363944] gap-1 p-2 rounded font-IranYekanWebBold">
          <p>API</p>
          <Image
            src={APIicon}
            alt="logo"
            className="object-contain"
            width={25}
            height={25}
          />
        </button>
        <button className="bg-[#363944] p-2 rounded flex gap-1">
          <p>خرید استیم والت</p>
          <Image
            src={steamWalletIcon}
            alt="logo"
            className="object-contain"
            width={25}
            height={25}
          />
        </button>
        <button className="bg-[#363944] p-2 rounded flex gap-1">
          <p>لیگ DOTA2</p>
          <Image
            src={dota2LeageIcon}
            alt="logo"
            className="object-contain"
            width={25}
            height={25}
          />
        </button>
        <button className="bg-[#363944] p-2 rounded flex gap-1">
          <p>استریمر ها</p>
          <Image
            src={streamersIcon}
            alt="logo"
            className="object-contain"
            width={25}
            height={25}
          />
        </button>
        <button className="bg-[#363944] p-2 rounded flex gap-1">
          <p>خرید آیتم راست</p>
          <Image
            src={itemRustIcon}
            alt="logo"
            className="object-contain"
            width={25}
            height={25}
          />
        </button>
        <button className="bg-[#363944] p-2 rounded flex gap-2">
          <p>خرید آیتم TF2</p>
          <Image
            src={itemTF2Icon}
            alt="logo"
            className="object-contain"
            width={25}
            height={25}
          />
        </button>
      </div>
    </div>
  );
}

export default SellBar;
