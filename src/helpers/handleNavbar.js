const handleScroll = () => {
	const navbar_section = document?.querySelector("[navbar-section]");
	const navbar_main = document?.querySelector("[navbar-main]");

	window.onscroll = function () {
		let blur = navbar_section?.getAttribute("navbar-scroll");
		if (blur == "true") stickyNavbar();
	};

	function stickyNavbar() {
		if (window.scrollY >= 5) {
			navbar_section?.classList.add("sticky", "top-0", "z-40");
			navbar_main?.classList.add("backdrop-saturate-200", "backdrop-blur-2xl", "bg-white-80", "dark:bg-gray-950/80", "shadow-blur", "dark:shadow-dark-blur");
		} else {
			navbar_section?.classList.remove("sticky", "top-0", "z-40");
			navbar_main?.classList.remove("backdrop-saturate-200", "backdrop-blur-2xl", "bg-white-80", "dark:bg-gray-950/80", "shadow-blur", "dark:shadow-dark-blur");
		}
	}
};

export default handleScroll;
