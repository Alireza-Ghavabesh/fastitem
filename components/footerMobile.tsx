function FooterMobile() {
  return (
    <div className="mt-5">
      <div className="mobile:hidden w-full bottom-0 z-10">
        <div className="flex justify-between bg-blue-400">
          <div className="flex justify-center w-1/4">icon 1</div>
          <div className="flex justify-center w-1/4">icon 2</div>
          <div className="flex justify-center w-1/4">icon 3</div>
          <div className="flex justify-center w-1/4">icon 4</div>
        </div>
      </div>
    </div>
  );
}

export default FooterMobile;
