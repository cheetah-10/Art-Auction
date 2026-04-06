import ArtistAppCard from "./ArtistAppCard";
import { API } from "../../constants/endPoint";
import useFetch from "../../hooks/useFetch";
import ArtworkCard from "../artwork/ArtworkCard";

function ArtworkAppsLayout() {
	const {
		data: artworkApps,
		isLoading,
		error,
	} = useFetch(API.ARTWORK.GET_PENDING_ARTWORK);

	return (
		<div className="flex flex-col gap-6">
			<div className="grid grid-cols-2 gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
				{isLoading && <div>Loadingggggggggggggggggggggg</div>}
				{!isLoading && error && <div>ERROR</div>}
				{!isLoading &&
					!error &&
					artworkApps.map((artwork) => (
						<ArtworkCard key={artwork.artworkId} artwork={artwork} />
					))}
				{!isLoading && artworkApps && artworkApps.length === 0 && <div>No current pending applications</div>}
			</div>
		</div>
	);
}

export default ArtworkAppsLayout;
