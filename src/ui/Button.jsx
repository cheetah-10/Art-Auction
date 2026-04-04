function Button({ size, className = "", onClick, children, disabled, ...props }) {
	const sizeClasses = {
		sm: "h-8 rounded-md gap-1.5 px-3 ",
		md: "h-9 px-4 py-2 ",
		lg: "h-10 rounded-md px-6 py-2",
		default: "",
	};

	const chosenSize = sizeClasses[size] || sizeClasses.default;

	return (
		<button
			disabled={disabled}
			className={`duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 ${chosenSize} ${className}`}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
