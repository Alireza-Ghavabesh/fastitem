import bgImage from "@/public/banner-background.jpg";
import dota2Image from "@/public/dota2link.png";
import csgoImage from "@/public/CSGO.png";
import rustImage from "@/public/RUST.png";
import steamWallet from "@/public/steamwallet.png";
import tf2Image from "@/public/TF2.png";
import SellItem from "@/public/SellItem.png";
import dota2Leage from "@/public/dota2Leage.png";
//tablet images imports
// import tf2ImageTablet from "@/public/tf2-tablet.png";
// import steamWalletImageTablet from "@/public/steamwallet-tablet.png";
// import steamWalletImageTablet2 from "@/public/steamwallet-tablet2.png";
// import rustImageTablet from "@/public/rust-tablet.png";
//nextjs imports
import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <>
      <div className="px-2 py-4 flex flex-col gap-5 items-center">
        <div className="flex justify-between gap-4 max-[640px]:hidden w-full px-5 whitespace-nowrap">
          <div>
            <button className="bg-[#009688] p-1 rounded text-white font-IranYekanWebBold ">
              آموزش کامل سایت
            </button>
          </div>
          <div className="text-white flex flex-wrap gap-2 justify-end font-IranYekanWebBold">
            <button className="bg-[#363944] p-1 rounded font-IranYekanWebBold">
              API
            </button>
            <button className="bg-[#363944] p-1 rounded">
              خرید استیم والت
            </button>
            <button className="bg-[#363944] p-1 rounded font-IranYekanWebBold">
              لیگ دوتا2
            </button>
            <button className="bg-[#363944] p-1 rounded font-IranYekanWebBold">
              استریمرها
            </button>
            <button className="bg-[#363944] p-1 rounded font-IranYekanWebBold">
              خرید آیتم راست
            </button>
            <button className="bg-[#363944] p-1 rounded font-IranYekanWebBold">
              خرید آیتم TF2
            </button>
            <button className="bg-[#363944] p-1 rounded font-IranYekanWebBold">
              خرید و فروش ارز دیجیتال
            </button>
          </div>
        </div>
        <div className="container flex flex-col gap-4 items-center">
          <div className="tablet:grid tablet:grid-cols-2 tablet:gap-2 flex flex-col gap-2">
            <Link href="/dota2">
              <Image src={dota2Image} alt="logo" className="object-contain" />
            </Link>
            <Link href="/csgo">
              <Image src={csgoImage} alt="logo" className="object-contain" />
            </Link>
          </div>
          <div className="tablet:grid tablet:grid-cols-3 tablet:gap-4 flex flex-col gap-2">
            <Link href="/rust">
              <Image src={rustImage} alt="logo" className="h-full" />
            </Link>
            <Link href="https://gifkart.com">
              <Image src={steamWallet} alt="logo" className="h-full" />
            </Link>
            <Link href="/tf2">
              <Image src={tf2Image} alt="logo" className="h-full" />
            </Link>
          </div>
          <div className="tablet:grid tablet:grid-cols-2 tablet:gap-4 flex flex-col gap-2">
            <Link href="/insertitem">
              <Image src={SellItem} alt="logo" className="object-contain" />
            </Link>
            <Link href="/league">
              <Image src={dota2Leage} alt="logo" className="object-contain" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
