import Utility from "./Utility";

class DisplayWeather {
	static renderLocationInfo(objData) {
		// LOCATION
		const locationEl = document.querySelector("[data-info = 'location']");
		// --Country--
		locationEl.textContent = `, ${objData.country}`;
		// --City--
		const span = document.createElement("span");
		span.classList.add("thickening");
		span.textContent = objData.city;
		locationEl.prepend(span);

		// DATE
		const dateEl = document.querySelector("[data-info = 'date']");
		dateEl.textContent = Utility.formatDate(objData.localTime);

		// HOUR
		const hourEl = document.querySelector("[data-info = 'hour']");
		hourEl.textContent = Utility.formatHour(objData.localTime);
	}

	static renderCurrForecast(objData) {
		// FORECAST TEXT
		const forecastTextEl = document.querySelector("[data-info = 'forecast']");
		forecastTextEl.textContent = objData.weatherText;

		// DEGREES
		const degreesEl = document.querySelector("[data-info = 'degrees']");
		degreesEl.textContent = `${objData.tempC}°C`;

		// WEATHER ICON
		const weatherIconEl = document.querySelector(
			"[data-info = 'weather-icon']"
		);
		weatherIconEl.src = objData.weatherIcon;

		// FELT TEMPERATURE
		const feltTempEl = document.querySelector("[data-details = 'temp']");
		feltTempEl.textContent = `${objData.tempFeelsC}°C`;

		// HUMIDITY
		const humidityEl = document.querySelector("[data-details = 'humidity']");
		humidityEl.textContent = `${objData.humidity}%`;

		// CHANGE OF RAIN
		const rainChanceEl = document.querySelector("[data-details = 'rain']");
		rainChanceEl.textContent = `${objData.rainChance}%`;

		// WIND SPEED
		const windSpeedEl = document.querySelector("[data-details = 'wind']");
		windSpeedEl.textContent = `${objData.windKph}km/h`;
	}

	static renderAstroInfo(objData) {
		// SUNRISE
		const sunriseEl = document.querySelector("[data-details = 'sunrise']");
		sunriseEl.textContent = objData.sunrise;

		// SUNSET
		const sunsetEl = document.querySelector("[data-details = 'sunset']");
		sunsetEl.textContent = objData.sunset;
	}

	static renderDayForecast(objData) {
		// DAY
		const dayEls = document.querySelectorAll("[data-forecast = 'day']");
		dayEls[0].textContent = Utility.formatDay(objData[0].date);
		dayEls[1].textContent = Utility.formatDay(objData[1].date);
		dayEls[2].textContent = Utility.formatDay(objData[2].date);

		// MAX DEGREE
		const maxDegreeEls = document.querySelectorAll(
			"[data-forecast = 'max-degree']"
		);
		maxDegreeEls[0].textContent = `${objData[0].maxTempC}°C`;
		maxDegreeEls[1].textContent = `${objData[1].maxTempC}°C`;
		maxDegreeEls[2].textContent = `${objData[2].maxTempC}°C`;

		// MIN DEGREE
		const minDegreeEls = document.querySelectorAll(
			"[data-forecast = 'min-degree']"
		);
		minDegreeEls[0].textContent = `${objData[0].minTempC}°C`;
		minDegreeEls[1].textContent = `${objData[1].minTempC}°C`;
		minDegreeEls[2].textContent = `${objData[2].minTempC}°C`;

		// WEATHER ICON
		const iconEls = document.querySelectorAll("[data-forecast = 'icon']");
		iconEls[0].src = objData[0].weatherIcon;
		iconEls[1].src = objData[1].weatherIcon;
		iconEls[2].src = objData[2].weatherIcon;
	}

	static switchBgImg(...objects) {
		// Background image will change depending on whether it is day or night
		const localHour = Utility.formatHour(objects[0].localTime);
		const { sunrise, sunset } = objects[1];
		// Convert the hours into minutes so we can see if the local time is between sunrise and sunset
		const localHourMin = Utility.convertHrtoMin(localHour);
		const sunriseMin = Utility.convertHrtoMin(sunrise);
		const sunsetMin = Utility.convertHrtoMin(sunset);

		if (localHourMin >= sunriseMin && localHourMin <= sunsetMin) {
			document.body.classList.remove("night");
		} else {
			document.body.classList.add("night");
		}
	}
}

export default DisplayWeather;
