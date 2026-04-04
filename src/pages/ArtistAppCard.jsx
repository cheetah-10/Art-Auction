import { User, Mail, Check, X, IdCard } from "lucide-react";
import Button from "../ui/Button";
import apiClient from "../utils/apiClient";
import { API } from "../constants/endPoint";
import { useState } from "react";
import { ACCOUNT_STATUS } from "../constants/constants";

const appStatusStyle = {
	[ACCOUNT_STATUS.APPROVED]: " bg-green-500 text-white",
	[ACCOUNT_STATUS.PENDING]: "bg-gray-100 text-white-700",
	[ACCOUNT_STATUS.REJECTED]: "bg-red-500 text-white",
};

function ArtistAppCard({ artist }) {
	const [appStatus, setAppStatus] = useState(artist.status);

	const handleApprove = async () => {
		apiClient.put(`${API.USER.PUT_APPROVE_ARTIST_BY_ID}${artist.id}`);
		setAppStatus(ACCOUNT_STATUS.APPROVED);
	};

	const handleReject = async () => {
		apiClient.put(`${API.USER.PUT_REJECT_ARTIST_BY_ID}${artist.id}`);
		setAppStatus(ACCOUNT_STATUS.REJECTED);
	};

	return (
		<div className="border border-gray-200 shadow-sm rounded-2xl p-6 flex flex-col">
			{/* Header*/}
			<div className="flex justify-between items-start mb-6 gap-3">
				<div className="min-w-0 flex-1">
					{/* Artist Name */}
					<div className="flex items-center gap-2 mb-1">
						<User className="w-5 h-5 text-gray-700 shrink-0" />
						<h3 className="text-lg font-semibold text-gray-900">
							{artist.name}
						</h3>
					</div>
					{/* Artist ID */}
					<div className="flex items-center gap-2 text-gray-500">
						<IdCard className="w-4 h-4 shrink-0" />
						<p className="text-sm">{artist.id}</p>
					</div>
					{/* Email */}
					<div className="flex items-center gap-2 text-gray-500">
						<Mail className="w-4 h-4 shrink-0" />
						<p className="text-sm" title={artist.email}>
							{artist.email}
						</p>
					</div>
				</div>

				<span
					className={`${appStatusStyle[appStatus]} px-3 py-1 text-xs font-semibold rounded-md`}
				>
					{appStatus}
				</span>
			</div>

			{/* Portfolio URL Section */}
			<div className="mb-6">
				<h4 className="text-base font-medium text-gray-900 mb-2">
					Portfolio
				</h4>
				<a
					href={artist.portfolio}
					target="_blank"
					className="text-blue-600 hover:underline text-sm break-all"
				>
					{artist.portfolio || "No portfolio link provided"}
				</a>
			</div>

			{/* Action Buttons */}
			{appStatus === ACCOUNT_STATUS.PENDING && (
				<div className="flex flex-col 2xl:flex-row items-center gap-3 w-full">
					<Button
						onClick={handleApprove}
						size="lg"
						className="flex-1 flex justify-center items-center gap-2 text-white bg-black w-full"
					>
						<Check className="w-4 h-4" />
						Approve
					</Button>
					<Button
						onClick={handleReject}
						size="lg"
						className="flex-1 flex justify-center items-center gap-2 text-white bg-[#d32f2f] w-full "
					>
						<X className="w-4 h-4" />
						Reject
					</Button>
				</div>
			)}

			{appStatus !== ACCOUNT_STATUS.PENDING && (
				<div className="flex justify-center text-green-600 font-semibold">
					Application was reviewed
				</div>
			)}
		</div>
	);
}

export default ArtistAppCard;
