import Table from "src/components/Table/Table.jsx";
import {COMPANY_RATES_COLUMNS} from "src/constants/constants.jsx";
import {useServices} from "src/context/UserContext.jsx";
import {useEffect, useState} from "react";
import RateCard from "src/pages/user/CompanyRates/RateCard.jsx";

const CompanyRates = () => {
    const {items, setCompanies} = useServices();
    const [companyPrices, setCompanyPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPrices = async (itemsArray) => {
        const itemsQuery = itemsArray.map(item => item.name.toLowerCase()).join(",");
        // console.log(itemsQuery);
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:5000/client/select-company?inventoryItems=${encodeURIComponent(
                    itemsQuery
                )}`
            );
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            const {data} = await response.json();
            // console.log(data)
            setCompanyPrices(data);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (items.length) {
            fetchPrices(items);
        }
    }, [items]);


    return (
        <div className="flex flex-wrap gap-5 p-5">
            {
                companyPrices.map(company =>
                    <RateCard key={company.companyId} company={company}/>
                )
            }
        </div>
    );
};

export default CompanyRates;
