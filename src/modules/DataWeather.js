class DataWeather {
	static async fetchData(locationData) {
		// For this project, it is ok for the API key to appear in the code, because it is a free key. Normally, it must be stored somewhere safe so that it does not appear in the code.
		const response = await fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=75424e2741b34276a2475719242403&q=${locationData}&days=3&aqi=no&alerts=no`
		);

		if (!response.ok) {
			throw "Location not found! Location must be in the form of 'City', 'Country' or 'City and Country'.";
		}

		const data = await response.json();
		return data;
	}

	static async getLocation(fetchedData) {
		const data = await this.fetchData(fetchedData);

		const locationObj = {
			country: data.location.country,
			city: data.location.name,
			localTime: data.location.localtime,
		};
		return locationObj;
	}

	static async getCurrForecast(fetchedData) {
		const data = await this.fetchData(fetchedData);

		const currForecastObj = {
			tempC: data.current.temp_c,
			tempFeelsC: data.current.feelslike_c,
			humidity: data.current.humidity,
			windKph: data.current.wind_kph,
			rainChance: data.forecast.forecastday[0].day.daily_chance_of_rain,
			weatherText: data.current.condition.text,
			weatherIcon: data.current.condition.icon,
		};
		return currForecastObj;
	}

	static async get3DayForecast(fetchedData) {
		const data = await this.fetchData(fetchedData);
		const forecastDays = data.forecast.forecastday;
		const days = [];

		forecastDays.forEach((dayData) => {
			const dayForecastObj = {
				date: dayData.date,
				maxTempC: dayData.day.maxtemp_c,
				minTempC: dayData.day.mintemp_c,
				weatherIcon: dayData.day.condition.icon,
			};

			days.push(dayForecastObj);
		});
		return days;
	}

	static async getAstroInfo(fetchedData) {
		const data = await this.fetchData(fetchedData);
		const astroObj = {
			sunrise: data.forecast.forecastday[0].astro.sunrise,
			sunset: data.forecast.forecastday[0].astro.sunset,
		};
		return astroObj;
	}
}

export default DataWeather;
