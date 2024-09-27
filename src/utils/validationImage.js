export default function validateImage() {
	const validateImg = (file) => {
		if (file.startsWith("https://") && (file.includes(".jpg") || file.includes(".png") || file.includes("images"))) {
			return true;
		} else {
			return false;
		}
	};

	return { validateImg };
}
