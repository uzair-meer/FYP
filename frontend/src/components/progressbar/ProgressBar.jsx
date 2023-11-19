import PropTypes from 'prop-types'

ProgressBar.propTypes = {
	steps: PropTypes.array,
	currentStepIndex: PropTypes.number,
	className: PropTypes.string,
}

export default function ProgressBar({ steps, currentStepIndex, className }) {
	const currentIndex = currentStepIndex // as we passed 0 indexed indexes here we needed to index to start form 1

	return (
		<div
			className={`flex w-full justify-center items-center mb-16 mt-5 ${className}`}
		>
			<div className="w-[92%] bg-[#D9D9D9] h-1.5 relative">
				{/* completed Line */}
				<div
					className="absolute h-1.5 bg-primary"
					style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
				></div>
				{steps.map((step, index) => (
					// DOT
					<div
						key={index}
						// first color is completed dots color next color is remaining dots color
						className={`absolute -mt-3 transform -translate-x-1/2 w-6 h-6 top-1 ${
							index <= currentIndex - 1
								? 'bg-primary border-primary'
								: 'bg-[#D9D9D9] border-[#D9D9D9]'
							//ring color
						} border-2 rounded-full`}
						style={{
							left: `${(index / (steps.length - 1)) * 100}%`,
						}}
					>
						<p className="absolute mt-12 left-[-3.2rem] text-center min-w-[8rem] text-lg">
							{step}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}
