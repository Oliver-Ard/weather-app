import "./main.css";

import Handler from "./modules/Handler";

function initApp() {
	const weatherForm = document.querySelector("[data-form = 'weather']");

	// EVENT LISTENERS
	weatherForm.addEventListener("submit", Handler.handleWeatherForm);
	window.addEventListener("DOMContentLoaded", () => {
		Handler.handleWeatherData("Bucharest");
	});
}

initApp();
