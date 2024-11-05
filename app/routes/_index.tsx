import { ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useRef, useState } from "react";
import { FaFacebook, FaHamburger, FaLinkedin } from "react-icons/fa";

import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaX } from "react-icons/fa6";
import { sendEmail } from "~/utils/sendMail";

export const meta: MetaFunction = () => {
  return [
    { title: "G-CODE" },
    { name: "description", content: "Welcome to G-CODE!" },
  ];
};

const schema = zod.object({
  name: zod.string().min(1),
  email: zod.string().email().min(1),
  query: zod.string().min(1),
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);
export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) {
    // The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
    return json({ errors, defaultValues });
  }

  await sendEmail({
    to: "puntica007@gmail.com",
    name: data.name,
    email: data.email,
    query: data.query,
  });

  // Do something with the data
  return json(data);
};

export default function Index() {
  const [open, setOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const aboutUsRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAboutUs = () => {
    aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-screen ">
      <header className="flex gap-9 w-full p-3 justify-between items-center bg-white fixed top-0">
        <h1 className="leading text-2xl font-bold text-gray-800">
          {/* dark:text-gray-100 */}
          G-CODE <span className="sr-only">G-CODE</span>
        </h1>
        <div className="flex md:hidden">
          {
            <button onClick={() => setOpen(!open)}>
              {open ? <FaX size={25} /> : <FaHamburger size={25} />}
            </button>
          }
          {open && (
            <div className="flex flex-col w-full backdrop-blur absolute top-10 right-0 bg-white">
              <div className="flex justify-end">
                {/*  <button onClick={() => setOpen(false)} className="p-3">
                    <FaX size={25} />
                  </button> */}
              </div>

              <div className="flex flex-col gap-2 justify-center items-center font-semibold">
                <button
                  className="hover:bg-slate-100 w-full"
                  onClick={scrollToAboutUs}
                >
                  ABOUT
                </button>
                <button
                  className="hover:bg-slate-100 w-full"
                  onClick={scrollToServices}
                >
                  SERVICES
                </button>
                <button
                  className="hover:bg-slate-100 w-full"
                  onClick={scrollToContact}
                >
                  CONTACT
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="md:flex justify-center items-center gap-x-3 hidden font-semibold">
          <button onClick={scrollToAboutUs}>ABOUT</button>
          <button onClick={scrollToServices}>SERVICES</button>
          <button onClick={scrollToContact}>CONTACT</button>
          {/*    <img src="cro-flag.svg" alt="" />
          <img src="us-flag.svg" alt="" /> */}
        </div>
      </header>

      <main
        className="flex flex-col w-full grow bg-gray-100 "
        /*  style={{ backgroundColor: "#121b21" }} */
      >
        {/*  <Outlet /> */}
        <div
          className="flex flex-col h-96 w-full bg-cover bg-center items-center justify-center text-center text-white "
          style={{ backgroundImage: "url('/laptop-cool.jpg')" }}
        >
          <h1 className="text-3xl font-bold mb-1">YOUR BEST DIGITAL PARTNER</h1>
          <button
            className="border-white border-solid border-2 font-semibold rounded transition ease-in-out delay-150 bg-blue-950 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-5 "
            onClick={scrollToContact}
          >
            Contact
          </button>
        </div>
        <div
          ref={aboutUsRef}
          className="flex flex-col gap-3 md:flex-row w-full shadow-md bg-blue-950 text-white p-4"
        >
          <div className="flex flex-1 items-center justify-center font-extrabold text-4xl">
            G-CODE...its that simple
          </div>
          <div className=" flex flex-1 items-center justify-center ">
            Our business specializes in developing custom web software solutions
            tailored to meet the unique needs of our clients. We combine modern
            technologies with user-friendly design to create scalable, secure,
            and high-performance web applications.
            <br />
            <br /> From e-commerce platforms to enterprise management systems,
            we deliver solutions that streamline operations and drive digital
            transformation. Our team of expert developers is dedicated to
            ensuring each project is delivered on time and exceeds expectations.
            <br />
            <br />
            We focus on understanding our clients goals to provide innovative
            solutions that enhance their online presence. With a commitment to
            quality and ongoing support, we help businesses grow in the digital
            space.
          </div>
        </div>
        <div ref={servicesRef} className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col justify-center gap-5 items-center shadow-2xl p-4">
            <span className="text-3xl font-bold">DEVELOPMENT</span>
            <img
              className="max-h-28"
              src="undraw_progressive_app_m-9-ms.svg"
              alt=""
            />

            <span>
              We create custom, high-performance web applications tailored to
              meet specific client needs, using modern technologies and ensuring
              scalability, security, and efficiency.
            </span>
          </div>
          <div
            className="flex flex-col justify-center gap-5 items-center p-4 shadow-2xl"
            /* style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }} */
          >
            {/* <FaLaptopCode size={50} /> */}
            <span className="text-3xl font-bold">DESIGN</span>

            <img className="max-h-28" src="undraw_design_process.svg" alt="" />

            <span>
              Our design services focus on user experience, combining aesthetics
              with functionality to create intuitive, visually appealing digital
              interfaces that drive engagement and enhance user satisfaction.
            </span>
          </div>
          <div className="flex flex-col justify-center gap-5 items-center rounded-md p-4 shadow-2xl">
            {/* <MdOutlineDataThresholding size={50} /> */}
            <span className="text-3xl font-bold">BUSINESS ANALYSIS</span>
            <img
              className="max-h-28"
              src="undraw_business_plan_re_0v81.svg"
              alt=""
            />

            <span>
              We help businesses optimize their digital strategies by analyzing
              data and providing actionable insights to improve operational
              efficiency and digital transformation.
            </span>
          </div>
        </div>
        <div ref={contactRef} className="p-4">
          Contact forma
          <Form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div className="flex flex-col gap-x-2 md:flex-row">
              {" "}
              <label className="flex flex-col w-full">
                Name:
                <input
                  className="border-solid border-2 border-slate-300 rounded-md"
                  type="text"
                  {...register("name")}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </label>
              <label className="flex flex-col w-full">
                Email:
                <input
                  className="border-solid border-2 border-slate-300 rounded-md"
                  type="email"
                  {...register("email")}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </label>
            </div>

            <label className="flex flex-col">
              Query:
              <textarea
                className="border-solid border-2 border-slate-300 rounded-md"
                rows={4}
                cols={50}
                {...register("query")}
              />
              {errors.email && <p>{errors.query?.message}</p>}
            </label>
            <button
              className="bg-slate-200 p-1 hover:bg-slate-300 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </div>
      </main>
      <footer className=" flex flex-col gap-y-3 md:flex-row bg-blue-950 text-white w-full justify-between items-center p-3">
        <span>G-CODE</span>
        <span>E-mail: info@g-code.com</span>
        <span>Phone: +385993255982</span>
        <FaFacebook />
        <FaLinkedin />
      </footer>
    </div>
  );
}

/* const resources = [
  {
    href: "https://remix.run/start/quickstart",
    text: "Quick Start (5 min)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M8.51851 12.0741L7.92592 18L15.6296 9.7037L11.4815 7.33333L12.0741 2L4.37036 10.2963L8.51851 12.0741Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "https://remix.run/start/tutorial",
    text: "Tutorial (30 min)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M4.561 12.749L3.15503 14.1549M3.00811 8.99944H1.01978M3.15503 3.84489L4.561 5.2508M8.3107 1.70923L8.3107 3.69749M13.4655 3.84489L12.0595 5.2508M18.1868 17.0974L16.635 18.6491C16.4636 18.8205 16.1858 18.8205 16.0144 18.6491L13.568 16.2028C13.383 16.0178 13.0784 16.0347 12.915 16.239L11.2697 18.2956C11.047 18.5739 10.6029 18.4847 10.505 18.142L7.85215 8.85711C7.75756 8.52603 8.06365 8.21994 8.39472 8.31453L17.6796 10.9673C18.0223 11.0653 18.1115 11.5094 17.8332 11.7321L15.7766 13.3773C15.5723 13.5408 15.5554 13.8454 15.7404 14.0304L18.1868 16.4767C18.3582 16.6481 18.3582 16.926 18.1868 17.0974Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "https://remix.run/docs",
    text: "Remix Docs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];
 */
