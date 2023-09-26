const DeleteModel = ({ showDeleteModal, setShowDeleteModal }) => {
  return (
    <>
      {showDeleteModal ? (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none w-1/3 py-8">
              <div className="flex flex-col items-center justify-center gap-8">
                {/*body*/}
                <div className="bg-primary mx-8 rounded px-4 py-3 text-center text-white font-bold w-3/4">
                  <h3>Are You Sure?</h3>
                </div>
                {/* buttons */}
                <div className="flex gap-4 items-center">
                  <button
                    className="bg-primary text-white rounded  px-6 py-1"
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-[#C9CAC866] text-primary rounded  px-6 py-1"
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default DeleteModel;
