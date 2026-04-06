import ArtistAppsLayout from "../components/admin/ArtistAppsLayout";
import Navbar from "../ui/Navbar";

function ArtistAppsPage() {
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

export default ArtistAppsPage;
