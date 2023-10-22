import Navbar from "src/layout/Navbar/Navbar";
import company from "../../assets/compnay.png";
import hero from "../../assets/hero.jpg";
import Footer from "src/layout/Footer/Footer";
import truck from "src/assets/truck.png";
import Testimonials from "./Testimonials/Testimonials";
import { FaTruckMoving } from "react-icons/fa";
import { FaBoxesPacking } from "react-icons/fa6";
import { GiBoxUnpacking } from "react-icons/gi";
const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        {/*hero content */}
        <div>
          <div className="text-center p-2 w-[70%] mx-auto" id="home">
            <h1 className="text-[3rem]">
              WE CAN <span className="text-primary">MOVE ANYTHING</span> TO
              WHEREVER YOU NEED IT.
            </h1>
            <p className="p-2 my-2 text-paragraph">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>

            <button className="bg-primary rounded-full text-white p-2">
              Learn more
            </button>
          </div>
          {/* //hero img */}
          <div>
            <img src={hero} className="mx-auto" />
          </div>
        </div>
        {/* why choose us */}
        <div className="p-10">
          <h1 className="text-headings font-bold">Why Choose Us</h1>
          <p className="text-paragraph w-[50%] p-3">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          {/* cards */}
          <section className="text-gray-700 body-font" id="services">
            <div className="container px-5 py-[1rem] mx-auto">
              <div className="grid grid-cols-3 -m-4 text-center">
                <div className="p-4 cursor-pointer">
                  <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                    <FaTruckMoving className="text-[4rem] text-primary mx-auto" />
                    <h1 className="text-[1.3rem] font-bold text-sky">
                      Moving Service
                    </h1>
                    <h2 className="title-font font-medium text-3xl ">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Placeat veritatis, eaque harum quisquam voluptate,
                      reprehenderit quam vel reiciendis neque, natus in sequi.
                      Dolore nisi quis nam ratione, mollitia repellat debitis?
                    </h2>
                  </div>
                </div>
                <div className="p-4 cursor-pointer">
                  <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                    <FaBoxesPacking className="text-[4rem] text-primary mx-auto" />
                    <h1 className="text-[1.3rem] font-bold text-sky">
                      Packing Service
                    </h1>
                    <h2 className="title-font font-medium text-3xl text-gray-900">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Possimus, illum aperiam in minus nesciunt iste corrupti
                      voluptatem dignissimos neque quisquam eaque nam,
                      cupiditate ad fugiat necessitatibus distinctio odit error
                      natus?
                    </h2>
                  </div>
                </div>
                <div className="p-4 cursor-pointer">
                  <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                    <GiBoxUnpacking className="text-[4rem] text-primary mx-auto" />
                    <h1 className="text-[1.3rem] font-bold text-sky">
                      Unpacking Service
                    </h1>
                    <h2 className="title-font font-medium text-3xl text-">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Harum nam quibusdam, voluptatem, optio numquam quos
                      voluptates, illum et a dicta asperiores amet! Numquam illo
                      doloribus voluptas,
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* join copmany */}
          <div className="p-4">
            <h1 className="text-headings font-bold ">Join Our Compnay Now</h1>

            <div className="md:grid grid-cols-2 gap-10 ">
              <div className="p-10 my-2 bg-primary text-center rounded-md">
                <img src={truck} className="mx-auto" />
                <h2 className="text-white text-headings ">I want to move</h2>
                <button className="text-primary bg-white px-4 py-2 my-1 rounded-full">
                  Sign Up
                </button>
              </div>

              <div className="p-10 my-2 bg-gray-100 text-center rounded-md">
                <img src={company} className="mx-auto" />
                <h2 className=" text-headings my-1 ">I am a Compnay</h2>
                <button className="text-white  bg-primary px-4 py-2 my-1 rounded-full">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
