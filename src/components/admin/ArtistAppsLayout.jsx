import ArtistAppCard from "./ArtistAppCard";
import { API } from "../../constants/endPoint";
import useFetch from "../../hooks/useFetch";

function ArtistAppsLayout() {
	const {
		data: artistsApps,
		isLoading,
		error,
	} = useFetch(API.USER.GET_PENDING_ARTISTS);

	return (
		<div className="flex flex-col gap-6">
			<div className="grid grid-cols-2 gap-5 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
				{isLoading && <div>Loadingggggggggggggggggggggg</div>}
				{!isLoading && error && <div>ERROR</div>}
				{!isLoading &&
					!error &&
					artistsApps.map((artist) => (
						<ArtistAppCard key={artist.id} artist={artist} />
					))}
				{!isLoading && artistsApps && artistsApps.length === 0 && <div>No current pending applications</div>}
			</div>
		</div>
	);
}

export default ArtistAppsLayout;
