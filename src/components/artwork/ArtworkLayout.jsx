import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { API } from "../../constants/endPoint";
import ArtworkCard from "./ArtworkCard";

function ArtworkLayout() {
	const { data: artworks } = useFetch(API.ARTWORK.GET_MY_ARTWORK);
	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-900">
					My Portfolio
				</h2>
				<Link
					to="/upload-artwork"
					className="inline-flex items-center px-5 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
				>
					<Plus className="w-5 h-5 mr-2" />
					Upload New Artwork
				</Link>
			</div>

			{artworks && artworks.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{artworks.map((artwork) => (
						<ArtworkCard
							key={artwork.artworkId}
							artwork={artwork}
						/>
					))}
				</div>
			)}

			{artworks.length === 0 && <div>Upload your art </div>}
		</div>
	);
}

export default ArtworkLayout;
