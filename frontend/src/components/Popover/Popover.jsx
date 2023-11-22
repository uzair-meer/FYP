import { Popover } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useAuth } from 'src/context/AuthContext.jsx'

import PropTypes from 'prop-types'

MyPopover.propTypes = {
	children: PropTypes.any,
}

export function MyPopover({ children }) {
	const { user, logout } = useAuth()

	return (
		<>
			<div>hello</div>
		</>
		// <Popover className="relative">
		//   <Popover.Button className="outline-none">{children}</Popover.Button>
		//   <Popover.Panel className="absolute z-10 -translate-x-36 translate-y-2 w-50">
		//     <div className="bg-white shadow-md rounded-[8px] text-sm text-textColor">
		//       <div className="flex gap-3 p-2 items-center">
		//         <div className="flex flex-col">{user?.email}</div>
		//       </div>
		//       <hr />
		//       <div className="flex flex-col items-start">
		//         <button className="text-black w-full p-2 hover:bg-primary hover:text-white">
		//           <Link
		//             to={
		//               user?.role === "client"
		//                 ? "/client/profile"
		//                 : "/company/profile"
		//             }
		//           >
		//             My Account
		//           </Link>
		//         </button>

		//         <button
		//           onClick={logout}
		//           className="text-black w-full p-2 hover:bg-primary hover:text-white rounded-b-[5px]"
		//         >
		//           Logout
		//         </button>
		//       </div>
		//     </div>
		//   </Popover.Panel>
		// </Popover>
	)
}
