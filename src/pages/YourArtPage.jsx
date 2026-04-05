import { Link } from "react-router-dom";
import Navbar from "../ui/Navbar";
import { Plus } from "lucide-react";
import ArtworkLayout from "../components/artwork/ArtworkLayout";

function YourArtPage() {
	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-background p-8">
				<div className="max-w-7xl mx-auto">
					<ArtworkLayout />
				</div>
			</div>
		</>
	);
}

export default YourArtPage;
