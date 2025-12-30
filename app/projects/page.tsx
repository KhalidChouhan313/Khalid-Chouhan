import SectionHeading from "@/components/common/SectionHeading";
import Image from "next/image";
import Link from "next/link";

const Projects = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20">
      <SectionHeading
        isShow={false}
        heading="Works"
        paragraph="I had the pleasure of working with these awesome projects"
      />

      <div className=" w-full max-w-4xl flex items-center justify-center relative z-0">
        <div className="w-auto h-full">
          <Image
            src="/images/projects/Web2.jpg"
            width={300}
            height={500}
            alt="Project Image"
            className="h-[60vh] absolute z-10 object-fill top-[13%] left-18 right-10"
          />
        </div>
        <Image
          src="/images/projects/Dual-screen.png"
          width={1200}
          height={800}
          alt="Project Image"
          className="rounded-xl object-cover w-full h-auto shadow-lg relative z-0"
        />
        <Image
          src="/images/projects/image.jpg"
          width={412}
          height={800}
          alt="Project Image"
          className="h-[38vh] absolute z-10 object-fill  left-[46.5%] right-0"
        />
        <div className="absolute top-[15%] right-4/12">
          <Link href={"/projects"} className="text-3xl text-teal">
            View  Projects
          </Link>
          <div className="w-[100%] h-1 bg-amber-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
