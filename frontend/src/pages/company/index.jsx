import truck from "../../assets/truck.png";
import company from "../../assets/compnay.png";
import hero from "../../assets/hero.jpg";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="w-[95%] mx-auto  p-2">
        <Navbar />
        {/*hero content */}
        <div>
          <div className="text-center p-2 w-[70%] mx-auto">
            <h1 className="text-[3rem]">
              WE CAN <span className="text-primary">TRANSFER ANYTHING</span> TO
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
          <div className="my-2 p-2">
            <img src={hero} />
          </div>
        </div>
        {/* why choose us */}
        <div>
          <h1 className="text-headings font-bold p-3">Why Choose Us</h1>
          <p className="text-paragraph w-[50%] p-3">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          {/* cards */}
          <section className="text-gray-700 body-font" id="about">
            <div className="container px-5 py-[1rem] mx-auto">
              <div className="flex flex-wrap -m-4 text-center">
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 17l4 4 4-4m-4-5v9"></path>
                      <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                    </svg>
                    <h2 className="title-font font-medium text-3xl text-gray-900">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Eveniet, distinctio iusto saepe repellendus ut molestias
                      quo dignissimos aliquid, cum soluta sint nostrum
                      voluptatibus tenetur eos quia. Sed aperiam ex sapiente.
                    </h2>
                  </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                    </svg>
                    <h2 className="title-font font-medium text-3xl text-gray-900">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Placeat veritatis, eaque harum quisquam voluptate,
                      reprehenderit quam vel reiciendis neque, natus in sequi.
                      Dolore nisi quis nam ratione, mollitia repellat debitis?
                    </h2>
                  </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
                    </svg>
                    <h2 className="title-font font-medium text-3xl text-gray-900">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Possimus, illum aperiam in minus nesciunt iste corrupti
                      voluptatem dignissimos neque quisquam eaque nam,
                      cupiditate ad fugiat necessitatibus distinctio odit error
                      natus?
                    </h2>
                  </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <h2 className="title-font font-medium text-3xl text-gray-900">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Harum nam quibusdam, voluptatem, optio numquam quos
                      voluptates, illum et a dicta asperiores amet! Numquam illo
                      doloribus voluptas, dolore corrupti incidunt harum!
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
      <Footer />
    </>
  );
}
