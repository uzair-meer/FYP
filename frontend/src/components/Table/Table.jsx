import { RiLoader2Fill } from "react-icons/ri";

export default function Table({
  columns = [],
  data = [],
  actions = [],
  isLoading = false,
  rowClickable,
  noDataMessage = "No Data",
}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="mt-8 w-full h-[40vh] grid place-items-center">
          <RiLoader2Fill />
        </div>
      ) : data.length === 0 ? (
        <div className="mt-8 w-full h-[40vh] grid place-items-center text-textColor">
          {noDataMessage}
        </div>
      ) : (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {columns.map(({ Header }) => (
                      <th
                        key={Header}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-primary"
                      >
                        {Header}
                      </th>
                    ))}
                    {actions?.length > 0 && (
                      <th
                        key={"action"}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold "
                      >
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((person) => (
                    <tr
                      key={person["_id"]}
                      onClick={() => rowClickable(person)}
                      className={
                        (rowClickable ? "cursor-pointer" : "") +
                        " text-textColor hover:bg-gray-50"
                      }
                    >
                      {columns.map(({ accessor, transform }) => (
                        <td
                          key={accessor}
                          className="whitespace-nowrap px-3 py-4 text-sm "
                        >
                          {transform
                            ? transform(person[accessor])
                            : person[accessor]}
                        </td>
                      ))}
                      <td
                        key={"action"}
                        className="px-3 py-4 text-sm font-medium text-right whitespace-nowrap"
                      >
                        {actions?.map((action) => (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(person);
                            }}
                          >
                            {action.icon}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
