import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Company from '../models/Company.model.js'
import User from '../models/User.model.js'
import createError from '../utils/createError.js'

//FIXME: register user and register company both cases should be handeled in this single api
export const registerUser = async (req, res, next) => {
	try {
		//FIXME: use hash passwords
		// const hash = bcrypt.hashSync(req.body.password, 5);
		const { name, email, password, phone, cnic, role } = req.body

		const user = new User({
			name,
			email,
			password,
			phone,
			cnic,
			role,
		})

		await user.save()

		const { _id } = user._doc

		if (role === 'company') {
			const company = new Company({
				_id,
			}) // we can get addionatl info from front end and add it here status will be requested by default
			await company.save()
		}

		res.status(201).json({ message: 'User has been created.' })
	} catch (err) {
		//FIXME:by looking error we can check if email is not same or type of and appropriate response
		next(err)
	}
}

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email })

		if (!user) return next(createError(404, 'User not found!'))

		//FIXME: hashed pswds should match
		// const isCorrect = bcrypt.compareSync(req.body.password, user.password)
		const isCorrect = req.body.password === user.password

		if (!isCorrect) return next(createError(400, 'Wrong password or username!'))

		//check if company status is not approved then throw error
		if (user.role === 'company') {
			const company = await Company.findOne({ _id: user._id })

			if (company.status !== 'approved')
      //! FIXME: important show proper error in catch block and handle them on frontend
				return next(
					createError(
						400,
						`company cannot be login because its status is ${company.status}`
					)
				)
		}

		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_KEY,
			{ expiresIn: '60d' }
		)
		const { password, ...info } = user._doc
		// console.log("user ID : ", req.userId)
		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.send(info)
	} catch (err) {
		next(err)
	}
}

export const logout = async (req, res) => {
	res
		.clearCookie('access_token', {
			sameSite: 'none',
			secure: true,
		})
		.status(200)
		.send('User has been logged out.')
}

// export const registerCompany = async (req, res, next) => {
// 	// console.log(req.body)
// 	//#FIXME role must be in [client, company, employee, admin]
//   const {}
// 	// #fix me date needs to eb sent t ot coapny colelction
// 	try {
// 		// const hashedPassword = bcrypt.hashSync(req.body.password, 5)
// 		const new_company = new User({
// 			...req.body,
// 			role: 'company',
// 			status: 'approved',
// 			password: hashedPassword,
// 		})

// 		await new_company.save()
// 		res.status(201).send({ message: 'Compnay has been created.' })
// 	} catch (err) {
// 		next(err)
// 	}
// }
