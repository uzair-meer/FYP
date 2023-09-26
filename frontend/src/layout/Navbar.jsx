import profileImgSrc from "../assets/images/profile.jpg";

function Navbar() {
  return (
    <nav className="flex flex-row-reverse ">
      <div className="rounded-3xl m-7 items-center px-3 py-3 flex bg-[#FCEDEB]">
        <img
          className="rounded-xl h-9"
          width={40}
          src={profileImgSrc}
          alt="profile picture"
        />
        <p className="px-3">Bruno Fernandes</p>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1_300)">
            <path
              d="M1 1L7 7L13 1"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_300">
              <rect width="14" height="8" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </nav>
  );
}

export default Navbar;
