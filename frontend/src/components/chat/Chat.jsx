import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/AuthContext.jsx'
import { useSocket } from '../../hooks/useSocket.js'
import ChatBox from './ChatBox'
import ChatSidebar from './ChatSidebar.jsx'

export default function Chat() {
	const { user } = useAuth()
	const { role, _id: userId } = user
	const [sidebarData, setSidebarData] = useState([])
	const [selectedUserId, setSelectedUserId] = useState('')
	const [allMessages, setAllMessages] = useState([])
	const [selectedUserMessages, setSelectedUserMessages] = useState([])

	const socket = useSocket(userId)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const url =
					role === 'company'
						? `http://localhost:5000/chat/get/all/clients?companyId=${userId}`
						: `http://localhost:5000/chat/get/all/companies`

				const response = await fetch(url)

				const { data, status } = await response.json()

				if (status !== 'ok') {
					throw new Error('Error fetching data')
				}

				setSidebarData(data)
			} catch (error) {
				// Consider how to handle/display this error
				console.error(error.message)
			}
		}

		fetchData()
	}, [role, userId])

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/chat/get/messages?id=${userId}&role=${role}`
				)

				const { data, status } = await response.json()

				if (status !== 'ok') {
					throw new Error('Error fetching messages')
				}

				setAllMessages(data ?? [])
			} catch (error) {
				console.error(error.message)
			}
		}

		fetchMessages()
	}, [role, userId])

	useEffect(() => {
		if (!selectedUserId) return

		const findMessages = () => {
			const field = role === 'client' ? 'companyId' : 'clientId'
			const selectedData = allMessages.find(
				(data) => data[field] === selectedUserId
			)
			return selectedData ? selectedData.messages : []
		}

		setSelectedUserMessages(findMessages())
	}, [selectedUserId, allMessages, role])

	useEffect(() => {
		if (!socket) return

		const newMessageHandler = (conversation) => {
			console.log(conversation)
			setAllMessages((prevMessages) => {
				const updatedMessages = [...prevMessages]
				let conversationIndex

				if (role === 'client') {
					conversationIndex = updatedMessages.findIndex(
						(m) => m.companyId === conversation.companyId
					)
				} else {
					conversationIndex = updatedMessages.findIndex(
						(m) => m.clientId === conversation.clientId
					)
				}

				if (conversationIndex > -1) {
					// Conversation exists, replace its messages
					updatedMessages[conversationIndex].messages = conversation.messages
				} else {
					// New conversation, add it
					const newConversation = {
						clientId: conversation.clientId,
						companyId: conversation.companyId,
						messages: conversation.messages,
					}
					updatedMessages.push(newConversation)
				}

				console.log(updatedMessages)
				return updatedMessages
			})
		}

		socket.on('newMessage', newMessageHandler)

		// Clean up on component unmount
		return () => {
			socket.off('newMessage', newMessageHandler)
		}
	}, [socket, role])

	const handleNewMessage = (newMessage) => {
		setAllMessages((prevMessages) => {
			const updatedMessages = [...prevMessages]
			let conversationIndex

			if (user.role === 'client') {
				conversationIndex = updatedMessages.findIndex(
					(m) => m.companyId === newMessage.companyId
				)
			} else {
				conversationIndex = updatedMessages.findIndex(
					(m) => m.clientId === newMessage.clientId
				)
			}

			if (conversationIndex > -1) {
				// Conversation exists, append the new message
				updatedMessages[conversationIndex].messages.push(newMessage)
			} else {
				// New conversation, add it
				const newConversation = {
					clientId: newMessage.clientId,
					companyId: newMessage.companyId,
					messages: [newMessage], // Start with the new message
				}
				updatedMessages.push(newConversation)
			}

			return updatedMessages
		})
	}

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
						messages={selectedUserMessages}
						isUserSelected={true}
						onNewMessage={handleNewMessage}
						receiverId={selectedUserId}
					/>
				</div>
			</div>
		</>
	)
}
