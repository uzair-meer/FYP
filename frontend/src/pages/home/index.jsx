import Navbar from "src/layout/Navbar/Navbar";
import company from "../../assets/compnay.png";
import hero from "../../assets/hero.jpg";
import Footer from "src/layout/Footer/Footer";
import truck from "src/assets/truck.png";
import Testimonials from "./Testimonials/Testimonials";
import { FaTruckMoving } from "react-icons/fa";
import { FaBoxesPacking } from "react-icons/fa6";
import { GiBoxUnpacking } from "react-icons/gi";
import { FaPeopleCarry } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        {/*hero content */}
        <div className="bg-redish">
          <div
            className="text-center p-2 w-[70%] mx-auto pt-10 mb-10 "
            id="home"
          >
            <h1 className="text-[3rem] font-bold mb-5 ">
              WE CAN <span className="text-primary">TRANSFER ANYTHING</span> TO
              WHEREVER YOU NEED IT.
            </h1>
            <p className="p-2 my-2 text-paragraph">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>

            <button className="bg-primary rounded-full text-white text-[1.2rem] px-5 p-2 mt-3">
              Learn more
            </button>
          </div>
          {/* //hero img */}
          <div>
            <img src={hero} className="mx-auto" />
          </div>
        </div>
        {/* why choose us */}
        <div className="p-10 bg-redish">
          <h1 className="text-[2rem] font-bold">Why Choose Us</h1>
          <p className="text-paragraph w-[70%] py-3">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          {/* cards */}
          <section className="text-gray-700 body-font" id="services">
            <div className="container px-5 py-[1rem] mx-auto">
              <div className="grid grid-cols-3 -m-4 text-center">
                <Link to="/signin">
                  <div className="p-4 cursor-pointer">
                    <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                      <FaTruckMoving className="text-[4rem] text-primary mx-auto" />
                      <h1 className="text-[1.3rem] font-bold text-sky">
                        Moving Service
                      </h1>
                      <h2 className="title-font font-medium text-3xl mt-3 mt-3">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Placeat veritatis, eaque harum quisquam voluptate,
                        reprehenderit quam vel reiciendis neque, natus in sequi.
                        Dolore nisi quis nam ratione, mollitia repellat debitis?
                      </h2>
                    </div>
                  </div>
                </Link>

                <Link to="/signin">
                  <div className="p-4 cursor-pointer">
                    <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                      <FaBoxesPacking className="text-[4rem] text-primary mx-auto" />
                      <h1 className="text-[1.3rem] font-bold text-sky">
                        Packing Service
                      </h1>
                      <h2 className="title-font font-medium text-3xl mt-3 text-gray-900">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Possimus, illum aperiam in minus nesciunt iste corrupti
                        voluptatem dignissimos neque quisquam eaque nam,
                        cupiditate ad fugiat necessitatibus distinctio
                      </h2>
                    </div>
                  </div>
                </Link>

                <Link to="/signin">
                  <div className="p-4 cursor-pointer">
                    <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                      <GiBoxUnpacking className="text-[4rem] text-primary mx-auto" />
                      <h1 className="text-[1.3rem] font-bold text-sky">
                        Unpacking Service
                      </h1>
                      <h2 className="title-font font-medium text-3xl mt-3 text-">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Harum nam quibusdam, voluptatem, optio numquam quos
                        voluptates, illum et a dicta asperiores amet! Numquam
                        illo doloribus voluptas,
                      </h2>
                    </div>
                  </div>
                </Link>
                <Link to="/signin">
                  <div className="p-4 cursor-pointer">
                    <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                      <FaPeopleCarry className="text-[4rem] text-primary mx-auto" />
                      <h1 className="text-[1.3rem] font-bold text-sky">
                        Workforce
                      </h1>
                      <h2 className="title-font font-medium text-3xl mt-3 ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Harum nam quibusdam, voluptatem, optio numquam quos
                        voluptates, illum et a dicta asperiores amet! Numquam
                        illo doloribus voluptas,
                      </h2>
                    </div>
                  </div>
                </Link>
                <Link to="/signin">
                  <div className="p-4 cursor-pointer">
                    <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                      <FaLocationArrow className="text-[4rem] text-primary mx-auto" />
                      <h1 className="text-[1.3rem] font-bold text-sky">
                        Track Your Move
                      </h1>
                      <h2 className="title-font font-medium text-3xl mt-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Harum nam quibusdam, voluptatem, optio numquam quos
                        voluptates, illum et a dicta asperiores amet! Numquam
                        illo doloribus voluptas,
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </div>
        {/* join copmany */}
        <div className="p-14 bg-white">
          <h1 className="text-headings font-bold mb-4">
            Join Our Company <br></br>Now
          </h1>

          <div className="md:grid grid-cols-2 gap-10 ">
            <div className="p-10 my-2 bg-primary text-center rounded-md">
              <img src={truck} className="mx-auto" />
              <h2 className="text-white text-headings ">I want to move</h2>
              <button className="text-primary bg-white px-4 py-2 my-1 rounded-full">
                Sign Up
              </button>
            </div>

            <div className="p-10 my-2 bg-redish text-center rounded-md">
              <img src={company} className="mx-auto" />
              <h2 className=" text-headings my-1 ">I am a Compnay</h2>
              <button className="text-white  bg-primary px-4 py-2 my-1 rounded-full">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
