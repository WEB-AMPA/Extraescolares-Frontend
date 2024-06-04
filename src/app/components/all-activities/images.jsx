const Images = () => {
    return (
      <div className="flex flex-col px-16 pt-20 pb-8 bg-white max-md:px-5">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[36%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet="/aerobico.JPG"
                className="grow w-full aspect-[1.45] max-md:mt-10"
              />
            </div>
            <div className="flex flex-col ml-5 w-[36%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet="/albertoynano.jpg"
                className="w-full aspect-[1.64] max-md:mt-10"
              />
            </div>
            <div className="flex flex-col ml-5 w-[28%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet="/basquet.JPG"
                className="w-full aspect-[1.25] max-md:mt-10"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet="/ludica.JPG"
                className="grow w-full aspect-[2.27] max-md:mt-10"
              />
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet="parque.JPG"
                className="grow w-full aspect-[2.22] max-md:mt-10"
              />
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <img
                loading=""
                srcSet="patinaje.JPG"
                className="grow w-full aspect-[1.72] max-md:mt-10"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default Images;
