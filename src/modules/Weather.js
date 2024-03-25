class Weather {
	static async fetchData(locationData) {
		const response = await fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=75424e2741b34276a2475719242403&q=${locationData}&days=3&aqi=no&alerts=no`
		);

		if (!response.ok) {
			throw "Location not found!";
		}

		const data = await response.json();
		return data;
	}

	static async getLocation(fetchedData) {
		const data = await this.fetchData(fetchedData);

		const locationObj = {
			country: data.location.country,
			city: data.location.name,
			region: data.location.region,
			localTime: data.location.localtime,
		};
		return locationObj;
	}

	static async getCurrForecast(fetchedData) {
		const data = await this.fetchData(fetchedData);

		const currForecastObj = {
			tempC: data.current.temp_c,
			tempF: data.current.temp_f,
			tempFeelsC: data.current.feelslike_c,
			tempFeelsF: data.current.feelslike_f,
			humidity: data.current.humidity,
			windKph: data.current.wind_kph,
			windMph: data.current.wind_mph,
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
				maxTempF: dayData.day.maxtemp_f,
				minTempC: dayData.day.mintemp_c,
				minTempF: dayData.day.mintemp_f,
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

export default Weather;
