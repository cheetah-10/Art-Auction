import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

function StyledLink({ url }) {
	return (
		<Link
			to={url}
			className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-white font-medium rounded-xl hover:bg-black transition-colors shadow-sm"
		>
			<Edit className="w-4 h-4" />
			Edit Artwork
		</Link>
	);
}

export default StyledLink;
