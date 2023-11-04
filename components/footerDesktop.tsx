import logo from "./../public/logo.png";
import Image from "next/image";

function FooterDesktop() {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between pl-2 max-[640px]:hidden w-full bottom-0 z-10 bg-[#303741]">
        <div>
          <div className="text-white font-IranYekanWebBold border p-1">
            اینماد
          </div>
        </div>
        <div className="flex pr-2 py-1">
          <div className="flex flex-row-reverse gap-4 flex-wrap text-white justify-center font-IranYekanWebBold items-center px-2 whitespace-nowrap text-[15px]">
            <div>|</div>
            <div>خرید استیم والت</div>
            <div>|</div>
            <div>خرید گیفت کارت</div>
            <div>|</div>
            <div>خرید گیفت کارت آمریکا</div>
            <div>|</div>
            <div>خرید ویباکس ارزان</div>
            <div>|</div>
            <div>گیفت کارت پلی استیشن</div>
            <div>|</div>
            <div>گیفت کارت اپل</div>
            <div>|</div>
            <div>استیم والت</div>
            <div>|</div>
            <div>پشتیبانی</div>
          </div>
          <Image
            src={logo}
            width={118}
            height={38}
            alt="logo"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default FooterDesktop;
