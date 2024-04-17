import './Button.css';

const Button = ({ children, onClick, type}) => {
	const buttonType = type || 'button';

	return (
		<button
			type={buttonType}
			className='button'
			onClick={onClick}>
				{children}
		</button>
	);
}
 
export default Button;