const Classic = ({
  title,
  subtitle,
  titleColor,
  subtitleColor,
  gradientBackgroundColor,
}:{
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
  gradientBackgroundColor: string;
}) => {
  return (
    <>
      <div
        style={{
          background:
            `linear-gradient(to bottom,rgba(255,255,255,0) 0,${gradientBackgroundColor} 45%,${gradientBackgroundColor} 50%)`,
        }}
        className="z-10 py-10 pt-20 absolute inset-x-0 bottom-0 h-17 text-center"
      >
        <h1
          className={`${titleColor} text-3xl md:text-5xl font-bold text-montserrat modern-title`}
        >
          {title}
        </h1>
        <span
          className={`${subtitleColor} block pb-2.5 pt-1 text-sm md:text-xl text-homemade`}
        >
          {subtitle}
        </span>
      </div>

      <div
        className="content-none z-10 block absolute pointer-events-none h-full top-0 left-0 right-0
          box-border border-[20px] border-solid border-white"
      >
        <div className="relative w-full h-full">
          <div className="block absolute -inset-1
            box-border border-[2px] border-solid border-black"
            aria-hidden="true"></div>
          <div className="block absolute -inset-1 
            m-1.5 box-border border-[1px] border-solid border-black"
            aria-hidden="true"></div>
        </div>
      </div>
    </>
  );
}

export default Classic
