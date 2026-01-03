import Pagination from "@/components/layout/Pagination/pagination";
import HomeHomeContent from "../components/sections/hero/Home/page";
import About from "./about/page";
import Skills from "./skills/page";
import Projects from "./projects/page";
import Blog from "./blog/page";
import Contact from "./contact/page";

export default function Home() {
  return (
    <div
      className=" min-h-screen w-full flex justify-center
     items-center relative "
    >
      <Pagination />

      <main className="w-full flex flex-col items-center ">
        <section
          id="home"
          className="h-screen bg-transparent w-full 
          flex items-center justify-center "
        >
          <HomeHomeContent />
        </section>

        <section
          id="about"
          style={{
            backgroundImage: `url('/images/hero/aboutbg.avif')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          className="h-auto w-full px-4  relative z-0
          flex items-start justify-center
          "
        >
          <About />
        </section>

        <section
          id="skills"
          style={{
            backgroundImage: `url('/images/hero/bg.jpg')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          className="rela h-auto w-full px-4  relative z-0
          flex items-start justify-center 
          "
        >
          <div
            className="absolute  inset-0 bg-cover bg-center bg-fixed
             filter  top-0 bottom-0 h-full"
            style={{ backgroundImage: "url('/images/hero/bg.jpg')" }}
          ></div>

          <div
            className="absolute inset-0 bg-black/85 top-0
           bottom-0 h-full "
          ></div>
          <div
            className="w-full relative z-10 text-white
           flex items-center justify-center"
          >
            <Skills />
          </div>
        </section>
        <section
          id="projects"
          className="h-auto bg-transparent w-full 
          flex items-center justify-center "
        >
          <Projects />
        </section>

        <section
          id="blog"
          className="h-auto bg-transparent w-full 
          flex items-center justify-center "
        >
          <Blog />
        </section>

        <section
          id="contact"
          className="h-auto bg-transparent w-full 
          flex items-center justify-center "
        >
          <Contact />
        </section>
      </main>
    </div>
  );
}
