import Utility from "./Utility";
import DataWeather from "./DataWeather";
import DisplayWeather from "./DisplayWeather";

class Handler {
	static errorMsg = document.querySelector("[data-info = 'error-msg']");

	static async handleWeatherData(fetchedData) {
		try {
			const location = await DataWeather.getLocation(fetchedData);
			DisplayWeather.renderLocationInfo(location);
			const currForecast = await DataWeather.getCurrForecast(fetchedData);
			DisplayWeather.renderCurrForecast(currForecast);
			const threeDayForecast = await DataWeather.get3DayForecast(fetchedData);
			DisplayWeather.renderDayForecast(threeDayForecast);
			const astroInfo = await DataWeather.getAstroInfo(fetchedData);
			DisplayWeather.renderAstroInfo(astroInfo);

			Utility.hideError(this.errorMsg);
		} catch (error) {
			Utility.showError(this.errorMsg, error);
		}
	}

	static handleWeatherForm(e) {
		e.preventDefault();

		const locationInput = document.querySelector("#location");
		if (locationInput.value === "") {
			return;
		}

		Handler.handleWeatherData(locationInput.value);
		locationInput.value = "";
	}
}

export default Handler;
