import Chat from '../models/Chat.modal.js'

export const saveChatMessage = async ({
	clientId,
	recipientId,
	role,
	message,
}) => {
	const chatMessage = {
		sender: role,
		message: message,
	}

	// Try to find an existing chat document for the given clientId and companyId
	let chat = await Chat.findOne({
		clientId: clientId,
		companyId: recipientId,
	})

	if (!chat) {
		// If no document found, create a new one
		chat = new Chat({
			clientId: clientId,
			companyId: recipientId,
			messages: [chatMessage],
		})
	} else {
		// If a document is found, push the new message to the messages array
		chat.messages.push(chatMessage)
	}

	// Save the chat document (either the newly created one or the updated one)
	const result = await chat.save()

	return result
}
