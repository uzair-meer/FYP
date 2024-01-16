export const Dashboard = () => {
  return (
    <>
      {/* // dash stats */}
      <div>
        <div className="w-full flex flex-wrap justify-center gap-20">
          <div className="p-2">
            <h2 className="text-[2rem] font-bold ">130+</h2>
            <p className="text-primary">Bookings</p>
          </div>
          <div className="p-2">
            <h2 className="text-[2rem] font-bold ">30+</h2>
            <p className="mx-1 text-primary">Clients</p>
          </div>
          <div className="p-2">
            <h2 className="text-[2rem] font-bold ">1.1M+</h2>
            <p className="text-primary">Revenue</p>
          </div>
        </div>
      </div>
    </>
  );
};
