const Modal = ({ children }) => {
	return (
		<div className="fixed inset-0 bg-black/50 flex justify-center items-center">
			<div className="bg-white rounded-lg p-4 w-[400px] relative">
				{children}
			</div>
		</div>
	);
};

function ModalHeader({ children }) {
	return <div className="text-bold mb-4">{children}</div>;
}

function ModalBody({ children }) {
	return <div className="modal-body">{children}</div>;
}

function ModalFooter({ children }) {
	return (
		<div className="flex justify-end gap-2 mt-4">
			{children}
		</div>
	);
}

// custom names
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
