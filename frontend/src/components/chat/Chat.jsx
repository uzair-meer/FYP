import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/AuthContext.jsx'
import { useSocket } from '../../hooks/useSocket.js'
import ChatBox from './ChatBox'
import ChatSidebar from './ChatSidebar.jsx'

export default function Chat() {
	const { user } = useAuth()
	const [sidebarData, setSidebarData] = useState([])
	const [selectedUserId, setSelectedUserId] = useState('')
	const [messages, setMessages] = useState([])

	const socket = useSocket(user._id)

	useEffect(() => {
		const fetchReq = async () => {
			try {
				let url
				if (user.role === 'company') {
					url = `http://localhost:5000/chat/get/all/clients?companyId=${user._id}`
				} else if (user.role === 'client') {
					url = `http://localhost:5000/chat/get/all/companies`
				}
				const response = await fetch(url)

				const result = await response.json()

				if (result.status !== 'ok') {
					throw new Error('wrong with api')
				}

				// console.log(result.data)

				setSidebarData(result.data)
			} catch (error) {
				console.log(error)
			}
		}

		fetchReq()
	}, [user])

	useEffect(() => {
		if (selectedUserId === '') {
			return
		}

		// find a way to store all chats in redux so every time user change the receiver we dont send new fetch request
		const fetchReq = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/chat/get/messages?id=${selectedUserId}&role=${user.role}`
				)

				const result = await response.json()

				if (result.status !== 'ok') {
					throw new Error('wrong with api')
				}

				// console.log(result.data)
				const allMessages = result?.data?.length > 0 ? result?.data[0]?.messages : []
				setMessages(allMessages)
			} catch (error) {
				console.log(error)
			}
		}

		fetchReq()
	}, [selectedUserId, user.role])

	useEffect(() => {
		if (socket == null) return

		if (selectedUserId) {
			socket.emit('joinRoom', { userId: selectedUserId })
		}

		socket.on('newMessage', (newMessages) => {
			console.log(newMessages)
			setMessages(newMessages)
		})

		// return () => {
		// 	socket.off('newMessage')
		// }
	}, [socket, selectedUserId])

	return (
		<>
			<div className="flex h-[80vh] items-center antialiased text-gray-800 overflow-hidden w-full">
				<div className="flex flex-row h-full w-full">
					{/* Sidebar */}
					<ChatSidebar
						data={sidebarData}
						setSelectedUserId={setSelectedUserId}
					/>
					{/* Chat */}
					<ChatBox
						messages={messages}
						isUserSelected={true}
						receiverId={selectedUserId}
					/>
				</div>
			</div>
		</>
	)
}
