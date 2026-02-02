import React from "react";
import Link from "next/link";

const Location = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <>
      <section className="bg-primary py-24">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
            <div className="">
                <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 pt-12">
                    <div className="col-span-3">
                        <h2 className="text-white max-w-52 text-40 font-bold">Bengaluru Office</h2>
                    </div>
                    <div className="col-span-3">
                        <p className="sm:text-24 text-xl text-white text-opacity-50 font-normal max-w-64 leading-10">Gulmohar Enclave, Silver Spring layout, Bangalore, 560037</p>
                    </div>
                    <div className="col-span-3">
                        <Link href="mailto:Office@Arthhwise.com" className="sm:text-24 text-xl text-white font-medium underline">Arthhwise@gmail.com</Link>
                        <Link href="tel:731-235-7993" className="sm:text-24 text-white text-opacity-80 text-xl text-IceBlue flex items-center gap-2 hover:text-opacity-100 w-fit"><span className="text-white text-opacity-40!">Call</span>+91-8770117256</Link>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Location;
