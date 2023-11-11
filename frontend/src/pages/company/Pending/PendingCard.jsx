import AssignEmployeeModal from "src/pages/company/components/AssignEmployeeModal.jsx";
import {useState} from "react";

const PendingCard = ({item,employees}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(employees);

    const url = "http://localhost:5000/company/booking-request";
    const handleAction = async (status) => {
        setIsModalOpen(true);

        // try {
        //     const response = await fetch(url, {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         method: "POST",
        //         body: JSON.stringify({
        //             bookingId: item._id,
        //             status
        //         }),
        //     });
        //     const data = await response.json();
        //     console.log(data);
        //     setIsModalOpen(true);
        // } catch (error) {
        //     console.log(error);
        // }
    }


    return (
        <div className="card w-[20rem] p-5 flex flex-col bg-primary text-white rounded-[8px]">
            <div className="card-header">
            </div>
            <div className="card-body flex flex-col w-full gap-2">
                <div className="flex w-full justify-between">
                    <p className="font-bold">Client Name</p>
                    <p className="">{item.clientName}</p>
                </div>
                <div className="flex w-full justify-between">
                    <p className="font-bold">Items</p>
                    <p className="">{item.cart.map(c => c.name).join(",")}</p>
                </div>
                <div className="flex w-full justify-between">
                    <p className="font-bold">Pickup Address</p>
                    <p className="">{item.pickupAddress}</p>
                </div>
                <div className="flex w-full justify-between">
                    <p className="font-bold">Destination Address</p>
                    <p className="">{item.destinationAddress}</p>
                </div>
                <div className="flex w-full justify-between">
                    <p className="font-bold">Services</p>
                    <p className="">{item.services.join(",")}</p>
                </div>
                <div className="flex justify-between p-5 ">
                    <button className="bg-secondary text-white rounded-[5px] px-5 py-2"
                            onClick={() => handleAction("approved")}>Accept
                    </button>
                    <button className="bg-secondary text-white rounded-[5px] px-5 py-2"
                            onClick={() => handleAction("declined")}>Declined
                    </button>
                </div>
            </div>
            <AssignEmployeeModal employees={employees} showAddEmployeeModal={isModalOpen} setShowAddEmployeeModal={setIsModalOpen} bookingId={item._id}/>
        </div>
    );
};

export default PendingCard;
