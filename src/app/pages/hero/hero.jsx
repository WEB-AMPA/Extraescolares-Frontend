import "./home.css";

function Home() {
  return (
    // <body className="bg-gray-100">
    <main className="max-w-[1920px] mx-auto bg-white overflow-hidden">
      <div className="xl:bg-grid xl:bg-center xl:bg-repeat-y fixed top-0 bottom-0 left-0 right-0 z-10"></div>
      <section className="hero h-[640px] xl:h-[840px] bg-hero bg-center lg:bg-cover bg-no-repeat bg-fixed xl:rounded-bl-[290px] relative z-20">
        <div className="container mx-auto h-full flex items-center justify-center xl:justify-start">
          <div className="hero__text w-[567px] flex flex-col items-center text-center xl:text-left lg-items-start ">
            <h1 className="h1 mb-8">TITLE</h1>
            <p className="mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              fugiat accusamus expedita ea ducimus dolores iure sint, eum
              similique ex quo amet, sed adipisci aperiam molestias! Aspernatur
              ullam et cum!
            </p>
            <button className="btn btn-primary mx-auto xl:mx-0">Button</button>
          </div>
        </div>
      </section>
      <div className="h-[3000px]"></div>
    </main>
    // </body>
  );
}

export default Home;
