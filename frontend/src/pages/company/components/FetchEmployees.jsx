import { useEffect, useState } from "react";
import { useAuth } from "src/context/AuthContext.jsx";
const FetchEmployees = () => {
  const { user } = useAuth();
  const companyId = user?._id;
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Assume companyId is obtained from context or state
  // const { companyId } = useContext(CompanyContext); // Uncomment if using context

  useEffect(() => {
    console.log(companyId);
    const fetchEmployees = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/company/get/free/employees?companyId=${companyId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Include authorization headers if needed
            },
          }
        );

        if (!response.ok) {
          throw new Error("Could not fetch employees");
        }
        const data = await response.json();
        setEmployees(data.employees);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [companyId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            Name: {employee.name}, Email: {employee.email}, Phone:
            {employee.phone}, Title: {employee.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FetchEmployees;
