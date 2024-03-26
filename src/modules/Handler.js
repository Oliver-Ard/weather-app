import Utility from "./Utility";
import DataWeather from "./DataWeather";
import DisplayWeather from "./DisplayWeather";

class Handler {
	static errorMsgEl = document.querySelector("[data-info = 'error-msg']");

	static async handleWeatherData(fetchedData) {
		try {
			Utility.showSpinner();
			const location = await DataWeather.getLocation(fetchedData);
			DisplayWeather.renderLocationInfo(location);

			const currForecast = await DataWeather.getCurrForecast(fetchedData);
			DisplayWeather.renderCurrForecast(currForecast);

			const threeDayForecast = await DataWeather.get3DayForecast(fetchedData);
			DisplayWeather.renderDayForecast(threeDayForecast);

			const astroInfo = await DataWeather.getAstroInfo(fetchedData);
			DisplayWeather.renderAstroInfo(astroInfo);

			DisplayWeather.switchBgImg(location, astroInfo);
			Utility.hideError(this.errorMsgEl);
			Utility.hideSpinner();
		} catch (error) {
			Utility.showError(this.errorMsgEl, error);
			Utility.hideSpinner();
		}
	}

	static handleWeatherForm(e) {
		e.preventDefault();

		const locationInput = document.querySelector("#location");
		Handler.handleWeatherData(locationInput.value);
		locationInput.value = "";
	}

	static handleDocumentBtns(e) {
		const { target } = e;
		const targetParent = e.target.parentNode;

		switch (target.dataset.button || targetParent.dataset.button) {
			case "switch-units": {
				DisplayWeather.switchWeatherUnits();
				break;
			}
			// no default
		}
	}
}

export default Handler;
