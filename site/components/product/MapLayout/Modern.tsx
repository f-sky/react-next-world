const Modern = ({
  title,
  subtitle,
  titleColor,
  subtitleColor,
}:{
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
}) => {
  return (
    <>
      <div
        className="z-10 p-2.5 md:p-5 absolute inset-x-0 bottom-0 h-17 text-center"
      >
        <div className="inline-block px-4 pt-2.5 pb-2 md:px-8 md:pt-5 md:pb-3 bg-white">
          <h1
            className={`${titleColor} text-xl md:text-4xl font-bold text-homemade`}
          >
            {title}
          </h1>
          <span
            className={`${subtitleColor} block pt-2 md:pt-2.5 text-xs md:text-xl text-homemade`}
          >
            {subtitle}
          </span>
          <span
            className="text-gray-400 block font-sans text-[10px] md:text-xs"
          >
            48.8014°N / 2.4554°E
          </span>
        </div>
      </div>
    </>
  );
}

export default Modern
