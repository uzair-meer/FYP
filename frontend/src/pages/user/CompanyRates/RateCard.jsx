import {useServices} from "src/context/UserContext.jsx";
import {useMemo, useState} from "react";
import {useAuth} from "src/context/AuthContext.jsx";

const RateCard = ({company}) => {
    const {inventory, companyName, companyId} = company;
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useAuth();
    let {selectedServices, destinationLocation, pickupLocation, items} = useServices();
    let filteredInventory = inventory.map((item) => item.name);
    let filteredItems = items.filter((item) => filteredInventory.includes(item.name.toLowerCase()));

    const handleOrder = async () => {

        const order = {
            clientId: user._id,
            companyId,
            pickUpAddress: pickupLocation,
            destinationAddress: destinationLocation,
            services: selectedServices,
            cart:
            filteredItems
        }

        const url = "http://localhost:5000/client/booking";
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(order),
            });
            const data = await response.json();
            console.log(data);
        } finally {
            setIsLoading(false);
        }
    }

    const calculateBill = () => {
        let totalBill = 0;
        inventory.map((item) => {
            if (selectedServices.includes("Packing")) {
                totalBill += item.packingPrice;
            }
            if (selectedServices.includes("Unpacking")) {
                totalBill += item.unpackingPrice;
            }
            if (selectedServices.includes("Shifting")) {
                totalBill += item.movingPrice;
            }
        });
        return totalBill;
    };

    return (<div>
        <div className="flex flex-col justify-center items-center bg-secondary w-[20rem] p-5 rounded-[5px]">
            <h2 className="font-bold my-2">{companyName}</h2>
            <div className="flex flex-col w-full items-center">
                {inventory.map((item) => {
                    return <>
                        <p className="font-bold">{item.name}</p>
                        {selectedServices.includes("Packing") && <div className="flex justify-between w-full">
                            <p>{"Packing Price:"}</p>
                            <p>{item.packingPrice}$</p>
                        </div>}
                        {selectedServices.includes("Unpacking") && <div className="flex justify-between w-full">
                            <p>{"Unpacking Price"}</p>
                            <p>{item.unpackingPrice}$</p>
                        </div>}{selectedServices.includes("Shifting") && <div className="flex justify-between w-full">
                        <p>{"Moving Price"}</p>
                        <p>{item.movingPrice}$</p>
                    </div>}
                    </>
                })}
            </div>
            <hr className="w-full h-[.1rem] bg-black m-5"/>
            <div className="flex w-full justify-between">
                {`Total Price : ${calculateBill()}$`}
                <button className={`bg-primary text-white rounded-[8px] px-2 ${isLoading ? "opacity-10" : ""}`} onClick={handleOrder}> {isLoading ? "Ordering" :"Order"}</button>
            </div>
        </div>
    </div>);
}

export default RateCard;
