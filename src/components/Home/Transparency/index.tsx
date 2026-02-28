import React from "react";
import Link from "next/link";
import Image from "next/image";

const Transparency = () => {
    return (
        <section className="pt-10 pb-20 lg:pt-20 lg:pb-[120px] dark:bg-dark" id="transparency">
            <div className="container mx-auto px-4 xl:px-0">
                <div className="bg-white dark:bg-dark-2 shadow-testimonial rounded-2xl p-8 sm:p-10 lg:p-14 mb-[60px] text-center max-w-[800px] mx-auto">
                    <span className="text-primary font-semibold text-lg block mb-2">
                        Data Transparency
                    </span>
                    <h2 className="text-3xl font-bold text-dark dark:text-white mb-4 sm:text-4xl">
                        Why We Request Your Data
                    </h2>
                    <p className="text-base text-body-color dark:text-dark-6 mb-6">
                        Arthhwise is a paper trading platform and NSE real-time market simulation application. We request basic profile information solely to create your trading account, save your paper trading portfolio, and manage your learning progress.
                    </p>
                    <p className="text-base text-body-color dark:text-dark-6 mb-8">
                        We are fully committed to your privacy. We do not sell your personal data, and your information is securely stored. For more details on how we handle your data, please review our complete Privacy Policy.
                    </p>
                    <Link
                        href="/privacy"
                        className="inline-flex items-center justify-center py-3 px-8 text-base font-semibold text-white bg-primary rounded-md transition hover:bg-blue-dark"
                    >
                        Read Privacy Policy
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Transparency;
