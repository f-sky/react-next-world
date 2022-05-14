const Square = ({
  title,
  subtitle,
  titleColor,
}:{
  title: string;
  subtitle: string;
  titleColor: string;
}) => {
  return (
    <>
      <div
        className="pointer-events-none z-20 p-2.5 md:p-5 absolute inset-x-0 bottom-0 h-17 text-center bg-white"
      >
        <span
          className={`${titleColor} text-base md:text-2xl xl:text-4xl font-bold text-raleway`}
        >
          {title},&nbsp;{subtitle}
        </span>
        <span
            className="block text-montserrat font-bold text-black text-[10px] md:text-xs"
          >
            48.8014°N / 2.4554°E
          </span>
      </div>
      <div
        className="content-none z-10 block absolute pointer-events-none h-full top-0 left-0 right-0
          box-border border-[20px] border-solid border-white"
      >
      </div>
    </>
  );
}

export default Square
