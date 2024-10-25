import { ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useRef } from "react";
import { BsPencilSquare } from "react-icons/bs";
import {
  FaBusinessTime,
  FaCode,
  FaFacebook,
  FaHamburger,
  FaLaptopCode,
  FaLinkedin,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MdDisplaySettings,
  MdOutlineAnalytics,
  MdOutlineDataThresholding,
  MdVideoSettings,
} from "react-icons/md";
import { FaX } from "react-icons/fa6";

export const meta: MetaFunction = () => {
  return [
    { title: "G-CODE" },
    { name: "description", content: "Welcome to G-CODE!" },
  ];
};

const schema = zod.object({
  name: zod.string().min(1),
  email: zod.string().email().min(1),
  query: zod.string().email().min(1),
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

  // Do something with the data
  return json(data);
};

export default function Index() {
  const contactRef = useRef<HTMLDivElement | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    /* resolver, */
  });

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center w-full h-full ">
        <header className="flex gap-9 w-full p-3 justify-between items-center">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            G-CODE <span className="sr-only">G-CODE</span>
          </h1>
          <div className="flex md:hidden">
            <button>
              <FaHamburger />
            </button>
            <div className="flex flex-col w-full backdrop-blur absolute top-0 right-0">
              <button className="">
                <FaX />
              </button>

              <div className="flex flex-col gap-x-2">
                <div>about</div>
                <div>about</div>
                <div>about</div>
              </div>
            </div>
          </div>
          <div className="md:flex justify-center items-center gap-x-3 hidden">
            <div>ABOUT US</div>
            <div>SERVICES</div>
            <div>CONTACT</div>
            <img src="cro-flag.svg" alt="" />
            <img src="us-flag.svg" alt="" />
          </div>
        </header>

        {/*  <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            What&apos;s next?
          </p>
          <ul>
            {resources.map(({ href, text, icon }) => (
              <li key={href}>
                <a
                  className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {icon}
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav> */}
        <main
          className="flex flex-col w-full grow"
          /*  style={{ backgroundColor: "#121b21" }} */
        >
          {/*  <Outlet /> */}
          <div
            className="flex flex-col h-96 w-full bg-cover bg-center items-center justify-center text-white "
            style={{ backgroundImage: "url('/laptop-cool.jpg')" }}
          >
            <h1 className="text-3xl font-bold ">YOUR BEST DIGITAL PARTNER</h1>
            <button
              className="font-semibold rounded transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-5 "
              onClick={scrollToContact}
            >
              Contact
            </button>
            {/*    <img className="" src="laptop-cool.jpg" alt="code" /> */}
          </div>
          <div className="flex flex-col md:flex-row w-full shadow-md">
            <div className="flex flex-1 items-center justify-center font-extrabold text-4xl">
              G-CODE...its that simple
            </div>
            <div className=" flex flex-1 items-center justify-center p-4">
              Our business specializes in developing custom web software
              solutions tailored to meet the unique needs of our clients. We
              combine modern technologies with user-friendly design to create
              scalable, secure, and high-performance web applications. From
              e-commerce platforms to enterprise management systems, we deliver
              solutions that streamline operations and drive digital
              transformation. Our team of expert developers is dedicated to
              ensuring each project is delivered on time and exceeds
              expectations. We focus on understanding our clients goals to
              provide innovative solutions that enhance their online presence.
              With a commitment to quality and ongoing support, we help
              businesses grow in the digital space.
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 py-5">
            {/* <div className="">SERVICES</div> */}
            <div className="flex flex-col justify-center items-center  bg-slate-200 p-3">
              {/* <FaCode size={50} /> */}
              <span>DEVELOPMENT</span>
              <img
                className="max-h-28"
                src="undraw_progressive_app_m-9-ms.svg"
                alt=""
              />
              <span>
                We create custom, high-performance web applications tailored to
                meet specific client needs, using modern technologies and
                ensuring scalability, security, and efficiency.
              </span>
            </div>
            <div className="flex flex-col justify-center items-center bg-slate-200 p-3">
              {/* <FaLaptopCode size={50} /> */}
              <span>DESIGN</span>

              <img
                className="max-h-28"
                src="undraw_designer_life_re_6ywf.svg"
                alt=""
              />
              <span>
                Our design services focus on user experience, combining
                aesthetics with functionality to create intuitive, visually
                appealing digital interfaces.
              </span>
            </div>
            <div className="flex flex-col justify-center items-center  bg-slate-200 p-3">
              <span>BUSINESS ANALYSIS</span>
              {/* <MdOutlineDataThresholding size={50} /> */}
              <img
                className="max-h-28"
                src="undraw_business_plan_re_0v81.svg"
                alt=""
              />
              <span>
                We help businesses optimize their digital strategies by
                analyzing data and providing actionable insights to improve
                operational efficiency and digital transformation.
              </span>
            </div>
          </div>
          <div ref={contactRef} className="bg-slate-200 shadow-md">
            Contact forma
            <Form
              className="flex flex-col max-w-96"
              onSubmit={handleSubmit}
              method="POST"
            >
              <label className="flex flex-col">
                Name:
                <input type="text" {...register("name")} />
                {errors.name && <p>{errors.name.message}</p>}
              </label>
              <label className="flex flex-col">
                Email:
                <input type="email" {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
              </label>
              <label className="flex flex-col">
                Query:
                <textarea rows={4} cols={50} {...register("query")} />
                {errors.email && <p>{errors.email.message}</p>}
              </label>
              <button type="submit">Submit</button>
            </Form>
          </div>
        </main>
        <footer className="bg-green-600 w-full flex justify-between">
          <span>G-CODE</span>
          <span>info@g-code.com</span>
          <span>+385993255982</span>
          <FaFacebook />
          <FaLinkedin />
        </footer>
      </div>
    </div>
  );
}

const resources = [
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
