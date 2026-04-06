export default function dateTimeFormat(date) {
	const dateObject = new Date(date + "Z");

	const readableDate = dateObject.toLocaleString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
	
	return readableDate;
}
