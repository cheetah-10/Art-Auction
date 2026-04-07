import { useState, useEffect } from "react";

export default function useCountdown(endTime) {
	const [timeLeft, setTimeLeft] = useState("");

	useEffect(() => {
		const timer = setInterval(() => {
			const diff = new Date(endTime) - new Date();
			if (diff <= 0) return setTimeLeft("");

			const d = Math.floor(diff / 86400000);
			const h = Math.floor((diff / 3600000) % 24);
			const m = Math.floor((diff / 60000) % 60);
			const s = Math.floor((diff / 1000) % 60);

			setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
		}, 0);

		return () => clearInterval(timer);
	}, [endTime]);

	return timeLeft;
}
