import { useEffect, useState } from "react";
import { useAuth } from "src/context/AuthContext";

const FetchEmployees = () => {
  const { user } = useAuth();
  const companyId = user?._id;
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/company/get/employees?${companyId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong while fetching employees");
        }
        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchEmployees();
    }
  }, [companyId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.employeeId._id}>
            Name: {employee.employeeId.name}, Email: {employee.employeeId.email}
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchEmployees;
