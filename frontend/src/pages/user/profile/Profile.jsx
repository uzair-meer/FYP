const Profile = () => {
  return (
    <div className="overflow-hidden bg-white m-5 shadow sm:rounded-lg text-textColor">
      <div className="my-2 flex justify-between items-center">
        <img
          src="https://source.unsplash.com/random/300×300"
          alt="Uploaded"
          className="h-24 w-24 rounded-full bg-primary cursor-pointer object-cover mx-4"
        />
        <div className="mr-10 flex items-center">
          <p>john doe </p>
          {/* <div
            className={`w-2 h-2 ml-3 shadow-lg rounded-full ${
              user.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
            }`}
          ></div> */}
        </div>
      </div>
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          User Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details.
        </p>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              john doe
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              johndoe@gmail.com
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Profile;
