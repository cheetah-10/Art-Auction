import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../ui/Navbar";
import useFetch from "../hooks/useFetch";
import { API } from "../constants/endPoint";

function UploadArtworkForm() {
	const { data: categories } = useFetch(API.CATEGORY.GET_ALL_CATEGORIES);
	const { data: tags } = useFetch(API.TAG.GET_ALL_TAGS);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm();

	// Watch the title to update the character count
	const titleValue = watch("title", "");

	const onSubmit = async (data) => {
		console.log("Artwork Submitted:", data);
		// Add your API call here
		// await apiClient.post('/api/artworks', data);
	};

	return (
		<>
			<Navbar />
			<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200">
					{/* Header Section */}
					<div className="mb-8">
						<div className="flex items-center space-x-2">
							<svg
								className="w-6 h-6 text-gray-900"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
								/>
							</svg>
							<h2 className="text-2xl font-bold text-gray-900">
								Upload Artwork
							</h2>
						</div>
						<p className="mt-2 text-gray-500">
							Submit your artwork for auction. Your
							submission will be reviewed by our admin team
							before going live.
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
								className={`w-full px-4 py-3 bg-gray-50 border ${
									errors.title
										? "border-red-500"
										: "border-gray-200 hover:border-gray-300"
								} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors`}
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
									{titleValue.length}/150 characters
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
								className={`w-full px-4 py-3 bg-gray-50 border ${
									errors.description
										? "border-red-500"
										: "border-gray-200 hover:border-gray-300"
								} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors resize-none`}
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
								className={`w-full px-4 py-3 bg-gray-50 border ${
									errors.category
										? "border-red-500"
										: "border-gray-200 hover:border-gray-300"
								} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors appearance-none`}
								{...register("category", {
									required:
										"Please select a category",
								})}
							>
								<option value="">
									Select a category
								</option>
								{categories?.map((cat) => (
									<option
										key={cat.id}
										value={cat.id}
									>
										{cat.name}
									</option>
								))}
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
								{/* Dynamically map over the fetched tags */}
								{tags?.map((tag) => (
									<label
										key={tag.id}
										className="flex items-center space-x-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
									>
										<input
											type="checkbox"
											value={tag.id}
											{...register("tags")}
											className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
										/>
										<span className="text-sm font-medium text-gray-700">
											{tag.name}
										</span>
									</label>
								))}
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
									min="0"
									placeholder="0.00"
									className={`w-full px-4 py-3 bg-gray-50 border ${
										errors.initialPrice
											? "border-red-500"
											: "border-gray-200 hover:border-gray-300"
									} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors`}
									{...register("initialPrice", {
										required:
											"Initial price is required",
										min: {
											value: 0,
											message: "Price cannot be negative",
										},
									})}
								/>
								<p className="mt-1 text-xs text-gray-500">
									Starting bid amount
								</p>
								{errors.initialPrice && (
									<p className="mt-1 text-xs text-red-500">
										{errors.initialPrice.message}
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
									min="0"
									placeholder="0.00"
									className={`w-full px-4 py-3 bg-gray-50 border ${
										errors.buyNowPrice
											? "border-red-500"
											: "border-gray-200 hover:border-gray-300"
									} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors`}
									{...register("buyNowPrice", {
										required:
											"Buy now price is required",
										min: {
											value: 0,
											message: "Price cannot be negative",
										},
									})}
								/>
								<p className="mt-1 text-xs text-gray-500">
									Instant purchase price
								</p>
								{errors.buyNowPrice && (
									<p className="mt-1 text-xs text-red-500">
										{errors.buyNowPrice.message}
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
								className={`w-full px-4 py-3 bg-gray-50 border ${
									errors.imageUrl
										? "border-red-500"
										: "border-gray-200 hover:border-gray-300"
								} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors`}
								{...register("imageUrl", {
									required: "Image URL is required",
								})}
							/>
							<p className="mt-1 text-xs text-gray-500">
								Provide a direct link to your artwork
								image
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
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
									/>
								</svg>
								<span>
									{isSubmitting
										? "Uploading..."
										: "Upload Artwork"}
								</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default UploadArtworkForm;
