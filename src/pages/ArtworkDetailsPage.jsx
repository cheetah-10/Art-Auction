import { Link, useNavigate, useParams } from "react-router-dom";
import {
	ArrowLeft,
	Calendar,
	Box,
	Tags,
	DollarSign,
	Edit,
	Play,
	X,
	Check,
} from "lucide-react";
import useFetch from "../hooks/useFetch";
import { API } from "../constants/endPoint";
import ArtworkStatus from "../components/artwork/ArtworkStatus";
import Button from "../ui/Button";
import StyledLink from "../ui/StyledLink";
import { ARTWORK_STATUS, USER_ROLES } from "../constants/constants";
import apiClient from "../utils/apiClient";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import dateTimeFormat from "../utils/dateTimeFormat";

function ArtworkDetailsPage() {
	const { id: artworkId } = useParams();
	const navigate = useNavigate();
	const { user, isLoading: isUserLoading, error: userError } = useAuth();

	// =======FETCH ARTWORK=======
	const {
		data: artwork,
		isLoading,
		error,
	} = useFetch(`${API.ARTWORK.GET_ARTWORK_BY_ID}${artworkId}`);

	//=======APP STATUS (state)=======
	const [appStatus, setAppStatus] = useState(artwork.status || ARTWORK_STATUS.PENDING);

	async function handleApproveArtwork() {
		await apiClient
			.put(`${API.ARTWORK.PUT_APPROVE_ARTWORK}${artworkId}`)
			.then((res) => {
				// navigate("/artwork-application");
				console.log(res);
				toast.success(res.data.message);
				setAppStatus(ARTWORK_STATUS.APPROVED);
			})
			.catch((err) => {
				toast.error(err.response?.data?.message || err.message);
			});
	}
	async function handleRejectArtwork() {
		await apiClient
			.put(`${API.ARTWORK.PUT_REJECT_ARTWORK}${artworkId}`)
			.then((res) => {
				console.log(res);
				toast.success(res.data.message);
				setAppStatus(ARTWORK_STATUS.REJECTED);
			})
			.catch((err) => {
				toast.error(err.response?.data?.message || err.message);
			});
	}

	async function handleDeletion() {
		await toast.promise(
			apiClient.delete(`${API.ARTWORK.DELETE_ARTWORK}${artworkId}`),
			{
				loading: "WAIT!!!",
				success: "Artwork was deleted",
				error: (err) => err.response?.data?.message || err.message,
			},
		);
		navigate("/my-art");
	}

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(amount);
	};

	if (isLoading) return <div>Loading</div>;
	if (error) return <div>{error}</div>;

	return (
		!isLoading &&
		!error && (
			<div className="min-h-screen bg-white text-gray-900">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{/* Back */}
					<Link
						to={
							user.role === USER_ROLES.ADMIN
								? "/artwork-application"
								: "/my-art"
						}
						className="inline-flex items-center text-sm font-medium mb-8"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						{user.role === USER_ROLES.ADMIN
							? "Back to Artworks Applications"
							: "Back to My Artworks"}
					</Link>

					{/* Content*/}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Image */}
						<div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
							<img
								src={artwork.artworkImage}
								alt={artwork.title}
								className="w-full h-full object-cover"
							/>
						</div>

						{/* Details */}
						<div className="flex flex-col">
							{/* Header Section */}
							<div>
								<div className="flex justify-between items-start gap-4 mb-3">
									<h1 className="text-3xl font-bold text-gray-900 leading-tight">
										{artwork.title}
									</h1>
									<ArtworkStatus
										artwork={artwork}
										appStatus={appStatus}
									/>
								</div>

								{artwork.approvalDate && (
									<div className="flex items-center text-gray-500 text-sm">
										<Calendar className="w-4 h-4 mr-2" />
										Reviewed on{" "}
										{dateTimeFormat(artwork.approvalDate)}
									</div>
								)}
							</div>

							<hr className="border-gray-100 my-6" />

							{/* Classification Section */}
							<div className="space-y-6">
								{/* Category */}
								<div className="flex items-start gap-3">
									<Box className="w-5 h-5 text-gray-400 mt-0.5" />
									<div>
										<h3 className="text-sm font-medium text-gray-500 mb-2">
											Category
										</h3>
										<span className="inline-block px-3 py-1 bg-white border border-gray-200 text-gray-800 text-sm font-medium rounded-full shadow-sm">
											{artwork.category?.name}
										</span>
									</div>
								</div>

								{/* Tags */}
								<div className="flex items-start gap-3">
									<Tags
										size={200}
										className="w-5 h-5 text-gray-400 mt-0.5"
									/>
									<div>
										<h3 className="text-sm font-medium text-gray-500 mb-2">
											Tags
										</h3>
										<div className="flex flex-wrap gap-2">
											{artwork.tags?.map(
												(tag, index) => (
													<span
														key={
															index
														}
														className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
													>
														{tag.name}
													</span>
												),
											)}
										</div>
									</div>
								</div>
							</div>

							<hr className="border-gray-100 my-6" />

							{/* Pricing Section */}
							<div className="flex flex-row gap-5">
								<div className="flex items-start gap-3">
									<DollarSign className="w-5 h-5 text-gray-400 mt-1" />
									<div>
										<h3 className="text-sm font-medium text-gray-500 mb-1">
											Initial Price
										</h3>
										<p className="text-2xl font-medium text-gray-900">
											{formatCurrency(
												artwork.initialPrice,
											)}
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<DollarSign className="w-5 h-5 text-gray-400 mt-1 text-green-500" />
									<div>
										<h3 className="text-sm font-medium text-gray-500 mb-1">
											Buy Now Price
										</h3>
										<p className="text-2xl font-medium text-gray-900 ">
											{formatCurrency(
												artwork.buyNowPrice,
											)}
										</p>
									</div>
								</div>
							</div>

							<hr className="border-gray-100 my-6" />

							{/* Description Section */}
							<div className="mb-8">
								<h3 className="text-base font-bold text-gray-900 mb-3">
									Description
								</h3>
								<p className="text-gray-500 leading-relaxed text-sm">
									{artwork.description}
								</p>
							</div>

							{/*===================BUTTONS FINALLYYYYYYYYYYYYY===================*/}
							{/* ARTIST BUTTONS */}
							{!isUserLoading &&
								user.role === USER_ROLES.ARTIST && (
									<div className="mt-auto pt-4 flex flex-col gap-3">
										{artwork.status !==
											ARTWORK_STATUS.REJECTED &&
											artwork.status !==
												ARTWORK_STATUS.AUCTION && (
												<StyledLink
													url={`/edit-artwork/${artworkId}`}
												>
													<Edit className="w-4 h-4" />
													Edit Artwork
												</StyledLink>
											)}

										{artwork.status ===
											ARTWORK_STATUS.AUCTION && (
											<StyledLink
												url={`/edit-auction-artwork/${artworkId}`}
											>
												<Edit className="w-4 h-4" />
												Edit Auction
											</StyledLink>
										)}

										{artwork.status ===
											ARTWORK_STATUS.APPROVED && (
											<Button className="w-full flex gap-2 px-6 py-3.5 bg-black text-white font-medium rounded-xl transition-colors shadow-sm">
												<Play className="w-4 h-4" />
												Start Auction
											</Button>
										)}

										{artwork.status !==
											ARTWORK_STATUS.AUCTION && (
											<Button
												className="w-full flex gap-2 px-6 py-3.5 bg-[#d32f2f] text-white font-medium rounded-xl transition-colors shadow-sm"
												onClick={
													handleDeletion
												}
											>
												<X className="w-4 h-4" />
												Delete Artwork
											</Button>
										)}
									</div>
								)}

							{/* ADMIN BUTTONS */}
							{appStatus !==
								ARTWORK_STATUS.PENDING && (
								<div className="flex justify-center text-red-500 font-semibold">
									Artwork was reviewed
								</div>
							)}
							{!isUserLoading &&
								user.role === USER_ROLES.ADMIN &&
								appStatus ===
									ARTWORK_STATUS.PENDING && (
									<div className="mt-auto pt-4 flex flex-row gap-3">
										<Button
											onClick={
												handleApproveArtwork
											}
											className="w-full flex gap-2 px-6 py-3.5 bg-green-600 text-white font-medium rounded-xl transition-colors shadow-sm"
										>
											<Check className="w-4 h-4" />
											Approve Artwork
										</Button>

										<Button
											className="w-full flex gap-2 px-6 py-3.5 bg-[#d32f2f] text-white font-medium rounded-xl transition-colors shadow-sm"
											onClick={
												handleRejectArtwork
											}
										>
											<X className="w-4 h-4" />
											Reject Artwork
										</Button>
									</div>
								)}
						</div>
					</div>
				</div>
			</div>
		)
	);
}

export default ArtworkDetailsPage;
