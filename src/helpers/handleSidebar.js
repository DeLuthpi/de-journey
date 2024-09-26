const sidebarMini = () => {
	const sidebar = document.querySelector("aside");
	const mini_trigger = document.querySelector("[mini-trigger]");
	const mini_open = document.querySelector("[mini-open]");
	const mini_close = document.querySelector("[mini-close]");
	const normal_spans = sidebar.querySelectorAll("span");
	const mini_spans = sidebar.querySelectorAll("span.opacity-0");
	const logo_collapse = sidebar.querySelector("[logo-collapse]");

	const main = document.querySelector("main");
	if (!main) {
		const main = document.querySelector("[main-content]");
	}

	if (mini_trigger.getAttribute("aria-expanded") == "true") {
		mini_trigger.setAttribute("aria-expanded", "false");
		sidebar.setAttribute("mini", "true");
		sidebar.classList.add("max-w-24", "overflow-hidden");
		sidebar.classList.remove("max-w-64", "overflow-y-auto");
		mini_sidebar();
		mini_open.classList.remove("inline");
		mini_open.classList.add("hidden");
		mini_close.classList.remove("hidden");
		mini_close.classList.add("inline");
	} else {
		mini_trigger.setAttribute("aria-expanded", "true");
		sidebar.setAttribute("mini", "false");
		sidebar.classList.add("max-w-64", "overflow-y-auto");
		sidebar.classList.remove("max-w-24", "overflow-hidden");
		normal_sidebar();
		mini_open.classList.remove("hidden");
		mini_open.classList.add("inline");
		mini_close.classList.remove("inline");
		mini_close.classList.add("hidden");
	}

	function mini_sidebar() {
		main.classList.add("xl:ml-28");
		main.classList.remove("xl:ml-72");
		logo_collapse.classList.remove("inline");
		logo_collapse.classList.add("hidden");

		normal_spans.forEach((normal_span) => {
			normal_span.classList.add("max-w-0");
			normal_span.classList.add("opacity-0");
			normal_span.classList.remove("opacity-100");
		});

		mini_spans.forEach((mini_span) => {
			mini_span.classList.add("ml-0.75");
			mini_span.classList.add("min-w-7");
			mini_span.classList.add("opacity-100");
			mini_span.classList.remove("opacity-0");
		});
	}

	function normal_sidebar() {
		main.classList.add("xl:ml-72");
		main.classList.remove("xl:ml-28");
		logo_collapse.classList.add("inline");
		logo_collapse.classList.remove("hidden");

		mini_spans.forEach((mini_span) => {
			mini_span.classList.add("opacity-0");
			mini_span.classList.remove("opacity-100");
			mini_span.classList.remove("min-w-7");
			mini_span.classList.remove("ml-0.75");
		});

		normal_spans.forEach((normal_span) => {
			normal_span.classList.add("opacity-100");
			normal_span.classList.remove("opacity-0");
			normal_span.classList.remove("max-w-0");
		});
	}
};

const sidebarExpand = () => {
	const sidebar = document.querySelector("aside");
	const expand_trigger = document.querySelector("[expand-trigger]");
	const expand_open = document.querySelector("[expand-open]");
	const expand_close = document.querySelector("[expand-close]");

	if (expand_trigger.getAttribute("aria-expanded") == "false") {
		expand_trigger.setAttribute("aria-expanded", "true");
		sidebar.classList.add("translate-x-0");
		sidebar.classList.remove("-translate-x-full");
		sidebar.classList.add("shadow-xl");
		expand_open.classList.remove("inline");
		expand_open.classList.add("hidden");
		expand_close.classList.remove("hidden");
		expand_close.classList.add("inline");
	} else {
		expand_trigger.setAttribute("aria-expanded", "false");
		sidebar.classList.remove("translate-x-0");
		sidebar.classList.add("-translate-x-full");
		sidebar.classList.remove("shadow-xl");
		expand_open.classList.remove("hidden");
		expand_open.classList.add("inline");
		expand_close.classList.remove("inline");
		expand_close.classList.add("hidden");
	}
};

export { sidebarMini, sidebarExpand };
