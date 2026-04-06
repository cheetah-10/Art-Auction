import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Palette, Save, Upload } from "lucide-react";
import Navbar from "../ui/Navbar";
import useFetch from "../hooks/useFetch";
import { API } from "../constants/endPoint";
import apiClient from "../utils/apiClient";
import { ARTWORK_STATUS } from "../constants/constants";

function ArtworkForm() {
	const { id: artworkId } = useParams();
	const navigate = useNavigate();

	const { data: categories } = useFetch(API.CATEGORY.GET_ALL_CATEGORIES);
	const { data: tags } = useFetch(API.TAG.GET_ALL_TAGS);

	const {
		data: artwork,
		isLoading,
		error: artworkError,
	} = useFetch(`${API.ARTWORK.GET_ARTWORK_BY_ID}${artworkId}`);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm();

	const titleValue = watch("title", "");

	useEffect(() => {
		if (artworkId && artwork && categories && tags) {
			setValue("title", artwork.title);
			setValue("description", artwork.description);

			const catId = artwork.category?.categoryId?.toString() || "";
			setValue("category", catId);

			setValue("initialPrice", artwork.initialPrice);
			setValue("buyNowPrice", artwork.buyNowPrice);
			setValue("imageUrl", artwork.artworkImage);

			const tagIds =
				artwork.tags?.map((tag) =>
					(tag.tagId || tag.id).toString(),
				) || [];
			setValue("tags", tagIds);
		}
	}, [artworkId, artwork, categories, tags, setValue]);

	const onSubmit = async (data) => {
		apiClient
			.put(`${API.ARTWORK.PUT_UPDATED_ARTWORK}${artworkId}`, data)
			.then(() => {
				navigate(`/artwork/${artworkId}`);
			});
	};

	// - if user hit /edit-artwork with a rejected artwork
	// - if user hit /edit-artwork with an active artwork in auction there will be a different url to edit it
	if (artwork.status === ARTWORK_STATUS.REJECTED) {
		return (
			<>
				<Navbar />
				<div className="flex justify-center items-center mt-5">
					<p className="text-red-500 font-semibold">
						Rejected artworks cannot be edited
					</p>
				</div>
			</>
		);
	} else if (artwork.status === ARTWORK_STATUS.AUCTION) {
		navigate(`/edit-auction-artwork/${artworkId}`);
	}

	if (artworkId && artworkError) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen bg-gray-50 flex items-center justify-center">
					<p className="text-red-500 font-medium">
						{artworkError}
					</p>
				</div>
			</>
		);
	}

	return (
		<>
			<Navbar />
			{!isLoading && !artworkError && (
				<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200">
						{/* Header Section */}
						<div className="mb-8">
							<div className="flex items-center space-x-2">
								<Palette className="w-6 h-6 text-gray-900" />
								<h2 className="text-2xl font-bold text-gray-900">
									Edit Artwork
								</h2>
							</div>
							<p className="mt-2 text-gray-500">
								Update the details of your artwork. Note
								that changing details will return the
								status to pending for review.
							</p>
						</div>

						{/* Form Section */}
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-6"
						>
							{/* Title */}
							<div>
								<label
									htmlFor="title"
									className="block text-sm font-semibold text-gray-900 mb-1"
								>
									Title *
								</label>
								<input
									id="title"
									type="text"
									placeholder="Enter artwork title"
									className={`w-full px-4 py-3 bg-gray-50 border ${errors.title ? "border-red-500" : "border-gray-200 hover:border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors`}
									{...register("title", {
										required: "Title is required",
										maxLength: {
											value: 150,
											message: "Title cannot exceed 150 characters",
										},
									})}
								/>
								<div className="flex justify-between mt-1">
									<span className="text-xs text-gray-500">
										{titleValue?.length || 0}/150
										characters
									</span>
									{errors.title && (
										<span className="text-xs text-red-500">
											{errors.title.message}
										</span>
									)}
								</div>
							</div>

							{/* Description */}
							<div>
								<label
									htmlFor="description"
									className="block text-sm font-semibold text-gray-900 mb-1"
								>
									Description *
								</label>
								<textarea
									id="description"
									rows="4"
									placeholder="Describe your artwork, its inspiration, techniques used, etc."
									className={`w-full px-4 py-3 bg-gray-50 border ${errors.description ? "border-red-500" : "border-gray-200 hover:border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors resize-none`}
									{...register("description", {
										required:
											"Description is required",
									})}
								/>
								{errors.description && (
									<p className="mt-1 text-xs text-red-500">
										{errors.description.message}
									</p>
								)}
							</div>

							{/* Dynamic Category (Single Select) */}
							<div>
								<label
									htmlFor="category"
									className="block text-sm font-semibold text-gray-900 mb-1"
								>
									Category *
								</label>
								<select
									id="category"
									className={`w-full px-4 py-3 bg-gray-50 border ${errors.category ? "border-red-500" : "border-gray-200 hover:border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors appearance-none`}
									{...register("category", {
										required:
											"Please select a category",
									})}
								>
									<option value="">
										Select a category
									</option>
									{categories?.map((cat) => {
										const catValue = (
											cat.categoryId || cat.id
										).toString();
										return (
											<option
												key={catValue}
												value={catValue}
											>
												{cat.name}
											</option>
										);
									})}
								</select>
								{errors.category && (
									<p className="mt-1 text-xs text-red-500">
										{errors.category.message}
									</p>
								)}
							</div>

							{/* Dynamic Tags (Multi-Select Checkboxes) */}
							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-2">
									Tags (Select all that apply)
								</label>
								<div className="flex flex-wrap gap-3">
									{tags?.map((tag) => {
										const tagValue = (
											tag.tagId || tag.id
										).toString();
										return (
											<label
												key={tagValue}
												className="flex items-center space-x-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
											>
												<input
													type="checkbox"
													value={
														tagValue
													}
													{...register(
														"tags",
													)}
													className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
												/>
												<span className="text-sm font-medium text-gray-700">
													{tag.name}
												</span>
											</label>
										);
									})}
								</div>
							</div>

							{/* Pricing Row */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Initial Price */}
								<div>
									<label
										htmlFor="initialPrice"
										className="block text-sm font-semibold text-gray-900 mb-1"
									>
										Initial Price (USD) *
									</label>
									<input
										id="initialPrice"
										type="number"
										step="0.01"
										min="10"
										placeholder="10.00"
										className={`w-full px-4 py-3 bg-gray-50 border ${errors.initialPrice ? "border-red-500" : "border-gray-200 hover:border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors`}
										{...register("initialPrice", {
											required:
												"Initial price is required",
											min: {
												value: 10,
												message: "Price must be at least $10",
											},
										})}
									/>
									<p className="mt-1 text-xs text-gray-500">
										Starting bid amount
									</p>
									{errors.initialPrice && (
										<p className="mt-1 text-xs text-red-500">
											{
												errors.initialPrice
													.message
											}
										</p>
									)}
								</div>

								{/* Buy Now Price */}
								<div>
									<label
										htmlFor="buyNowPrice"
										className="block text-sm font-semibold text-gray-900 mb-1"
									>
										Buy Now Price (USD) *
									</label>
									<input
										id="buyNowPrice"
										type="number"
										step="0.01"
										min="10"
										placeholder="10.00"
										className={`w-full px-4 py-3 bg-gray-50 border ${errors.buyNowPrice ? "border-red-500" : "border-gray-200 hover:border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors`}
										{...register("buyNowPrice", {
											required:
												"Buy now price is required",
											min: {
												value: 10,
												message: "Price must be at least $10",
											},
										})}
									/>
									<p className="mt-1 text-xs text-gray-500">
										Instant purchase price
									</p>
									{errors.buyNowPrice && (
										<p className="mt-1 text-xs text-red-500">
											{
												errors.buyNowPrice
													.message
											}
										</p>
									)}
								</div>
							</div>

							{/* Image URL */}
							<div>
								<label
									htmlFor="imageUrl"
									className="block text-sm font-semibold text-gray-900 mb-1"
								>
									Artwork Image URL *
								</label>
								<input
									id="imageUrl"
									type="url"
									placeholder="https://example.com/my-artwork.jpg"
									className={`w-full px-4 py-3 bg-gray-50 border ${errors.imageUrl ? "border-red-500" : "border-gray-200 hover:border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors`}
									{...register("imageUrl", {
										required:
											"Image URL is required",
									})}
								/>
								<p className="mt-1 text-xs text-gray-500">
									Provide a direct link to your
									artwork image
								</p>
								{errors.imageUrl && (
									<p className="mt-1 text-xs text-red-500">
										{errors.imageUrl.message}
									</p>
								)}
							</div>

							{/* Submit Button */}
							<div className="pt-4 border-t border-gray-100">
								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
								>
									{artworkId ? (
										<Save className="w-5 h-5" />
									) : (
										<Upload className="w-5 h-5" />
									)}
									<span>
										{isSubmitting
											? artworkId
												? "Saving Changes..."
												: "Uploading..."
											: artworkId
												? "Save Changes"
												: "Upload Artwork"}
									</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

export default ArtworkForm;
