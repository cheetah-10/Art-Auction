import Navbar from "../ui/Navbar";
import ArtistAppsLayout from "./ArtistAppsLayout";

function ArtistsSubmitionPage() {
	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-background p-8">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8">
						<h1 className="text-2xl mb-2 text-center">
							PENDING APPLICATIONS
						</h1>
					</div>

					<ArtistAppsLayout />
				</div>
			</div>
		</>
	);
}

export default ArtistsSubmitionPage;
