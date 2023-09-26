import React from "react";

const EditEmployeeModal = ({
  showEditEmployeeModal,
  setShowEditEmployeeModal,
}) => {
  return (
    <>
      {showEditEmployeeModal ? (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none ">
            {/*content*/}
            <div className="   rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none w-1/3 py-8">
              <div className="flex flex-col justify-center gap-4 text-left w-[80%]  mx-auto">
                {/*body*/}
                <form className="form">
                  <div>
                    <label className="inline-block my-2 font-bold">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="block w-full bg-transparent p-2 border border-gray rounded-md"
                    />
                  </div>
                  <div>
                    <label className="inline-block my-2 font-bold">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="block w-full bg-transparent p-2 border border-gray rounded-md"
                    />
                  </div>

                  <div>
                    <label className="inline-block my-2 font-bold">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="block w-full bg-transparent p-2 border border-gray rounded-md"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={() => setShowEditEmployeeModal(false)}
                    className="block border-0 w-full p-2 text-title-xsml bg-primary text-white mt-4 font-semibold rounded-md"
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    onClick={() => setShowEditEmployeeModal(false)}
                    className="block border-0 w-full p-2 text-title-xsml bg-gray-200 text-primary mt-4 font-semibold rounded-md"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default EditEmployeeModal;
