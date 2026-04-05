import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import ArtworkStatus from "./ArtworkStatus";

function ArtworkCard({ artwork }) {
	return (
		<Link
			to={`/artwork/${artwork.artworkId}`}
			className="group relative block w-full aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100"
		>
			{/* status indicator */}
			<ArtworkStatus artwork={artwork} className="absolute top-2 right-2 z-10"/>

			{/*  Image */}
			<img
				src={artwork.artworkImage}
				alt={artwork.title}
				className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>

			{/* Link symbol */}
			<div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 duration-300 flex items-center justify-center">
				<ExternalLink
					size={50}
					className="text-5xl drop-shadow-md transform scale-50 group-hover:scale-100 transition-transform duration-300 text-white "
				/>
			</div>
		</Link>
	);
}

export default ArtworkCard;
