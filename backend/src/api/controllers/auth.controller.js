import User from '../models/User.model.js'

export async function postLogin(req, res, next) {
	const email = req.body.email
	const password = req.body.password

	try {
		const user = await User.findOne({ email: email })

		//? check email
		if (!user) {
			res.status(400).json({ status: 'error', message: 'email is not correct' })
			return
		}
		//? match passwords
		if (user.password !== password) {
			res
				.status(422)
				.json({ status: 'error', message: 'passwords are not matched' })
			return
		}

		res.status(200).json({
			status: 'ok',
			data: {
				userId: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				phone: user.phone,
			},
		})
	} catch (error) {
		next(error)
	}
}
