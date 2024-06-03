function AboutUs() {
    return (
      <section className="h-screen flex items-center justify-center bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              ¿Quienes somos?
            </h2>
          </div>
  
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-96 overflow-hidden sm:h-96 lg:h-full">
              <img
                alt=""
                src="/aboutUs.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
  
            <div className="lg:py-16">
              <article className="space-y-4 text-gray-600">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
                  qui hic atque tenetur quis eius quos ea neque sunt, accusantium
                  soluta minus veniam tempora deserunt? Molestiae eius quidem quam
                  repellat.
                </p>
  
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorum explicabo quidem voluptatum voluptas illo accusantium
                  ipsam quis, vel mollitia? Vel provident culpa dignissimos
                  possimus, perferendis consectetur odit accusantium dolorem amet
                  voluptates aliquid, ducimus tempore incidunt quas. Veritatis
                  molestias tempora distinctio voluptates sint! Itaque quasi
                  corrupti, sequi quo odit illum impedit!
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default AboutUs;
  