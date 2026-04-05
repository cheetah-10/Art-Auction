import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

function StyledLink({ url, children }) {
	return (
		<Link
			to={url}
			className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-white font-medium rounded-xl hover:bg-black transition-colors shadow-sm"
		>
			{children}
		</Link>
	);
}

export default StyledLink;
