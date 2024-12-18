import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";

// Memuat Lottie secara dinamis tanpa rendering di server
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["ReactJS", "Python", "Typescript"];
  const rightLists = ["Laravel", "NextJS", "Golang"];

  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false); // State untuk mengecek apakah di sisi klien

  useEffect(() => {
    setIsClient(true); // Set isClient ke true saat komponen dirender di sisi klien
  }, []);

  const handleCopy = () => {
    const text = "reyshaarshandy@gmail.com";
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none flex flex-col space-y-4",
        className
      )}
      style={{
        background:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        {img && (
          <img
            src={img}
            alt={img}
            className={cn(
              imgClassName,
              "object-cover object-center absolute w-full h-full"
            )}
          />
        )}
        {spareImg && (
          <img
            src={spareImg}
            alt={spareImg}
            className="object-cover object-center absolute right-0 -bottom-5 w-full h-full opacity-80"
          />
        )}

        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl md:text-4xl lg:text-7xl px-4 text-center z-50 pointer-events-none"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "relative flex flex-col space-y-4 px-5 p-5 lg:p-10 group-hover/bento:translate-x-2 transition duration-200"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text -xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10">
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 lg:gap-8">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="py-2 lg:py-4 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 lg:gap-8">
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="py-2 lg:py-4 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && isClient && ( // Render Lottie hanya jika di sisi klien
            <div className="mt-5 relative">
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "hidden"
                }`}
              >
                <Lottie
                  animationData={animationData}
                  loop={copied}
                  style={{ height: 200, width: 400 }}
                />
              </div>
              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};