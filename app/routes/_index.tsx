import { ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { useRef, useState } from "react";
import { FaBars, FaFacebook, FaLinkedin } from "react-icons/fa";

import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaX } from "react-icons/fa6";
import { sendEmail } from "~/utils/sendMail";
import { jsonWithSuccess } from "remix-toast";

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

  return jsonWithSuccess(data, "You sucessfully submited e-mail!");
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
    <div className="flex flex-col h-screen">
      <header className="bg-white fixed top-0 w-full border-b-solid border-b-2 border-b-slate-300">
        <div className="flex gap-9 max-w-[1440px] p-3 justify-between items-center mx-auto">
          {" "}
          {/*   <img src="logo_1.png" alt="g-code-logo" height={50} width={50} /> */}
          <h1 className="leading text-2xl font-bold text-blue-950">
            {/* dark:text-gray-100 */}
            G-CODE <span className="sr-only">G-CODE</span>
          </h1>
          <div className="flex md:hidden">
            {
              <button onClick={() => setOpen(!open)}>
                {open ? <FaX size={25} /> : <FaBars size={25} />}
              </button>
            }
            {open && (
              <div className="flex flex-col w-full absolute top-10 right-0 bg-white">
                <div className="flex justify-end"></div>

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
        </div>
      </header>

      <main className="flex flex-col w-full max-w-[1440px] grow bg-gray-100 mx-auto">
        <div className="flex flex-col bg-[url('/tech.jpg')] h-96 w-full bg-cover bg-center items-center justify-center text-center text-white ">
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
          className="flex flex-col gap-3 md:flex-row w-full shadow-md bg-blue-950 text-slate-300 p-4"
        >
          <div className="flex flex-1 items-center justify-center font-extrabold text-4xl">
            {/*   {"G-CODE...it's that simple"} */}
            <img src="logo_1.png" alt="g-code-logo" />
          </div>
          {/* add span element and make gap y to 4rem*/}
          <div className="flex flex-col flex-1 items-center justify-center gap-y-5 ">
            <span>
              Our business specializes in developing custom web software
              solutions tailored to meet the unique needs of our clients. We
              combine modern technologies with user-friendly design to create
              scalable, secure, and high-performance web applications.
            </span>
            <span>
              {" "}
              From e-commerce platforms to enterprise management systems, we
              deliver solutions that streamline operations and drive digital
              transformation. Our team of expert developers is dedicated to
              ensuring each project is delivered on time and exceeds
              expectations.
            </span>

            <span>
              We focus on understanding our clients goals to provide innovative
              solutions that enhance their online presence. With a commitment to
              quality and ongoing support, we help businesses grow in the
              digital space.
            </span>
          </div>
        </div>
        <div
          ref={servicesRef}
          className="grid md:grid-cols-3 gap-4 text-slate-600"
        >
          <div className="flex flex-col justify-center gap-5 items-center shadow-2xl p-4">
            <span className="text-3xl font-bold">DEVELOPMENT</span>
            <img
              className="max-h-28"
              src="undraw_progressive_app_m-9-ms.svg"
              alt="development"
            />

            <span>
              We create custom, high-performance web applications tailored to
              meet specific client needs, using modern technologies and ensuring
              scalability, security, and efficiency.
            </span>
          </div>
          <div className="flex flex-col justify-center gap-5 items-center p-4 shadow-2xl">
            <span className="text-3xl font-bold">DESIGN</span>

            <img
              className="max-h-28"
              src="undraw_design_process.svg"
              alt="design"
            />

            <span>
              Our design services focus on user experience, combining aesthetics
              with functionality to create intuitive, visually appealing digital
              interfaces that drive engagement and enhance user satisfaction.
            </span>
          </div>
          <div className="flex flex-col justify-center gap-5 items-center rounded-md p-4 shadow-2xl">
            <span className="text-3xl font-bold">BUSINESS ANALYSIS</span>
            <img
              className="max-h-28"
              src="undraw_business_plan_re_0v81.svg"
              alt="business analysis"
            />

            <span>
              We help businesses optimize their digital strategies by analyzing
              data and providing actionable insights to improve operational
              efficiency and digital transformation.
            </span>
          </div>
        </div>
        <div ref={contactRef} className="flex flex-col md:flex-row p-4 gap-4">
          <div className="flex-1 flex flex-col gap-y-5 text-slate-600 ">
            <span className="text-3xl font-bold">
              {"Get in Touch with G-CODE"}
            </span>
            <span>
              {
                "Whether you're looking to transform your business with innovative tech solutions or have questions about our services, we're here to help."
              }
            </span>

            <span>
              {
                " Reach out to our team, and let’s make IT simple together. Fill out the form below with your details, and we’ll get back to you promptly to discuss your needs. We’re excited to connect and support your tech journey!"
              }
            </span>

            <img
              className="h-60"
              src="undraw_business_deal_re_up4u.svg"
              alt=""
            />
          </div>
          <Form
            className="flex flex-1 flex-col gap-3"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div className="flex flex-col gap-x-2 md:flex-row">
              {" "}
              <label className="flex flex-col w-full">
                Name
                <input
                  className="border-solid border-2 border-slate-300 rounded-md"
                  type="text"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-700">{errors.name.message}</p>
                )}
              </label>
              <label className="flex flex-col w-full">
                Email
                <input
                  className="border-solid border-2 border-slate-300 rounded-md"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-700">{errors.email.message}</p>
                )}
              </label>
            </div>

            <label className="flex flex-col h-full">
              Query:
              <textarea
                className="border-solid border-2 border-slate-300 rounded-md h-full"
                cols={50}
                {...register("query")}
              />
              {errors.email && (
                <p className="text-red-700">{errors.query?.message}</p>
              )}
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
      <footer className=" bg-blue-950 text-white w-full">
        <div className="flex flex-col gap-y-3 md:flex-row max-w-[1440px] justify-evenly items-center p-3 mx-auto">
          <span>G-CODE</span>
          {/* <span>E-mail: info@g-code.com</span> */}
          <span>Phone: +385993255982</span>
          {/*   <FaFacebook /> */}

          <Link
            rel="noreferrer"
            target="_blank"
            to={
              "https://www.linkedin.com/company/g-code-info/about/?viewAsMember=true"
            }
          >
            {" "}
            <FaLinkedin />
          </Link>
        </div>{" "}
      </footer>
    </div>
  );
}
