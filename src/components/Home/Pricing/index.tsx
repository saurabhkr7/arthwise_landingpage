"use client";
import { useReducer } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Icon } from "@iconify/react";

const Pricing = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };

  const bottomAnimation = {
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };
  interface State {
    planType: string;
    personalPrice: string;
    professionalPrice: string;
    organizationPrice: string;
    duration: string;
  }
  interface Action {
    type: "Monthly" | "Annually";
    payload: {
      duration: string;
      personalPrice: string;
      professionalPrice: string;
      organizationPrice: string;
    };
  }

  const initialTabConfig: State = {
    planType: "Monthly",
    personalPrice: "Free",
    professionalPrice: "Free",
    organizationPrice: "Free",
    duration: "Monthly",
  };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "Monthly":
        return {
          ...state,
          planType: action.type,
          personalPrice: action.payload.personalPrice,
          professionalPrice: action.payload.professionalPrice,
          organizationPrice: action.payload.organizationPrice,
          duration: action.payload.duration,
        };
      case "Annually":
        return {
          ...state,
          planType: action.type,
          personalPrice: action.payload.personalPrice,
          professionalPrice: action.payload.professionalPrice,
          organizationPrice: action.payload.organizationPrice,
          duration: action.payload.duration,
        };
      default:
        return state;
    }
  }

  const [tabConfig, dispatch] = useReducer(reducer, initialTabConfig);

  return (
    <>
      <section className="dark:bg-darkmode overflow-hidden py-14">
        <div
          ref={ref}
          className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 "
        >
          <motion.div {...TopAnimation}>
            <h2 className="dark:text-white text-midnight_text text-center md:text-35 sm:text-28 text-24">
              All plans are
              <span className="text-primary max-w-max ml-2">
                completely free
              </span>
            </h2>
            <p className="text-base text-6 font-normal text-muted dark:text-darktext text-center m-auto py-6 lg:max-w-50% sm:max-w-75%">
              No hidden fees, no subscriptions required. Start trading today with virtual capital and learn in a risk-free environment.
            </p>
          </motion.div>
          <motion.div {...bottomAnimation}>
            <div className="text-center pb-6">
              <div className="inline-flex items-center bg-heroBg dark:bg-midnight_text dark:bg-semidark rounded-xl p-2">
                <button
                  className={`text-17 font-normal text-midnight_text dark:text-white py-3 px-7 rounded-xl ${
                    tabConfig.planType === "Monthly"
                      ? "bg-white text-darkmode dark:bg-darkmode"
                      : ""
                  }`}
                  onClick={() =>
                    dispatch({
                      type: "Monthly",
                      payload: {
                        duration: "Monthly",
                        personalPrice: "Free",
                        professionalPrice: "Free",
                        organizationPrice: "Free",
                      },
                    })
                  }
                >
                  Monthly
                </button>
                <button
                  className={`text-17 font-normal text-midnight_text dark:text-white py-3 px-7 rounded-xl ${
                    tabConfig.planType === "Annually"
                      ? "bg-white text-darkmode dark:bg-darkmode"
                      : ""
                  }`}
                  onClick={() =>
                    dispatch({
                      type: "Annually",
                      payload: {
                        duration: "Annually",
                        personalPrice: "Free",
                        professionalPrice: "Free",
                        organizationPrice: "Free",
                      },
                    })
                  }
                >
                  Annually
                </button>
              </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 items-end mt-12">
              <div>
                <p className="pb-3 border-b border-border dark:border-dark_border text-muted text-17">
                  Virtual Capital
                </p>
                <p className="py-3 border-b border-border dark:border-dark_border text-muted text-17">
                  Real-Time Data
                </p>
                <p className="py-3 border-b border-border dark:border-dark_border text-muted text-17">
                  Advanced Charts
                </p>
                <p className="py-3 border-b border-border dark:border-dark_border text-muted text-17">
                  Order Management
                </p>
                <p className="py-3 border-b border-border dark:border-dark_border text-muted text-17">
                  Portfolio Tracking
                </p>
                <p className="py-3 border-b border-border dark:border-dark_border text-muted text-17">
                  Performance Analytics
                </p>
                <p className="py-3 border-b border-border dark:border-dark_border text-muted text-17">
                  Trading Contests
                </p>
                <p className="py-3 border-b border-border dark:border-dark_border text-muted text-17">
                  Educational Resources
                </p>
              </div>
              <div className="bg-white dark:bg-midnight_text  pt-8 px-8 rounded-lg border border-border dark:border-dark_border shadow-lg">
                <h3 className="text-22 font-bold text-midnight_text text-center dark:text-primary">
                  Personal
                </h3>
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-40 font-medium uppercase text-midnight_text dark:text-white">
                    {tabConfig.personalPrice}
                  </p>
                  <p className="text-base text-midnight_text dark:text-white">
                    ₹10,00,000 Capital
                  </p>
                </div>
                <Link
                  href="/signup"
                  className="mt-6 block text-center py-2 text-17 bg-primary border-2 border-primary hover:bg-transparent hover:text-primary duration-300 text-white rounded-lg"
                >
                  Start Now
                </Link>
                <div className="mt-10 mb-2">
                  <p className="pb-3 text-midnight_text dark:text-white dark:text-opacity-70 text-center border-b border-border dark:border-dark_border">
                    ₹10,00,000
                  </p>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <p className="py-3 text-green text-center font-medium">Included</p>
                </div>
              </div>
              <div className="bg-white dark:bg-midnight_text pt-8 px-8 rounded-lg border border-border dark:border-dark_border shadow-lg">
                <h3 className="text-22 font-bold text-midnight_text text-center dark:text-primary">
                  Professional
                </h3>
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-40 font-medium uppercase text-midnight_text dark:text-white">
                    {tabConfig.professionalPrice}
                  </p>
                  <p className="text-base text-midnight_text dark:text-white">
                    ₹50,00,000 Capital
                  </p>
                </div>
                <Link
                  href="/signup"
                  className="mt-6 text-17 block text-center bg-primary border-2 border-primary hover:bg-transparent hover:text-primary duration-300 text-white py-2 rounded-lg"
                >
                  Start Now
                </Link>
                <div className="mt-10 mb-2">
                  <p className="pb-3 border-b dark:border-dark_border border-border text-midnight_text dark:text-white dark:text-opacity-70 text-center">
                    ₹50,00,000
                  </p>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <p className="py-3 text-green text-center font-medium">Included</p>
                </div>
              </div>
              <div className="bg-white dark:bg-midnight_text pt-8 px-8 rounded-lg border border-border dark:border-dark_border shadow-lg">
                <h3 className="text-22 text-center font-bold text-midnight_text dark:text-primary">
                  Advanced
                </h3>
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-40 font-medium uppercase text-midnight_text dark:text-white">
                    {tabConfig.organizationPrice}
                  </p>
                  <p className="text-base text-midnight_text dark:text-white">
                    ₹1,00,00,000 Capital
                  </p>
                </div>
                <Link
                  href="/signup"
                  className="mt-6 text-17 block text-center bg-primary border-2 border-primary hover:bg-transparent hover:text-primary duration-300 text-white py-2 rounded-lg"
                >
                  Start Now
                </Link>
                <div className="mt-10 mb-2">
                  <p className="pb-3 border-b dark:border-dark_border border-border text-midnight_text dark:text-white dark:text-opacity-70 text-center">
                    ₹1,00,00,000
                  </p>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <div className="py-3 border-b border-border dark:border-dark_border flex justify-center">
                    <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconamoon:check-bold"
                        width="14"
                        height="14"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <p className="py-3 text-green text-center font-medium">Included</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
