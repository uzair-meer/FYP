import {useAuth} from "src/context/AuthContext.jsx";
import {useEffect, useState} from "react";
import PendingCard from "src/pages/company/Pending/PendingCard.jsx";

const Pending = () => {
    const {user} = useAuth();
    let url = "http://localhost:5000/company/booking-requests?";
    const [pending, setPending] = useState([]);
    let fetchPending = async () => {
        try {
            const response = await fetch(url + "companyId=" + user._id);
            const {data} = await response.json();
            setPending(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user._id) {
            fetchPending();
        }
    }, []);

    return (
        <div>
            <div className="pending-cards flex flex-wrap gap-2 p-5">
                {
                    pending.map((item) =>
                        <PendingCard item={item}/>
                    )
                }
            </div>
        </div>
    );
};

export default Pending;
