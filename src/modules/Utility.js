import { format } from "date-fns";

class Utility {
	static formatDate(date) {
		const formattedDate = format(date, "MMMM dd, yyyy");
		return formattedDate;
	}

	static formatHour(hour) {
		// 24h format
		const formattedHour = format(hour, "HH:mm");
		return formattedHour;
	}

	static formatDay(day) {
		const formattedDay = format(day, "iiii, do");
		return formattedDay;
	}

	static convertHrtoMin(timeStr) {
		// Split the time string into hours and minutes
		const [hourStr, minuteStr] = timeStr.split(":");

		// Extract the hour and minute values
		let hour = parseInt(hourStr, 10);
		const minute = parseInt(minuteStr, 10);
		// Adjust the hour if it's PM (assuming 12-hour format)
		if (timeStr.toLowerCase().includes("pm")) {
			hour += 12;
		}

		// Calculate the total minutes past midnight
		const totalMinutes = hour * 60 + minute;

		return totalMinutes;
	}

	static convert12hTo24h(time12h) {
		// Split the time string into hours, minutes, and AM/PM indicator
		const [time, indicator] = time12h.split(" ");
		// Split the hours and minutes
		const [hours, minutes] = time.split(":");
		// Convert hours to number
		let hours24 = parseInt(hours, 10);
		// Adjust hours for PM
		if (indicator.toLowerCase() === "pm") {
			hours24 += 12;
		}
		// Convert hours back to string and pad with leading zero if necessary
		hours24 = hours24 < 10 ? `0${hours24}` : hours24.toString();
		// Return the converted time string in 24-hour format
		return `${hours24}:${minutes}`;
	}

	static convertTemperature(degrees) {
		const [value, unit] = degrees.split("°");
		let convertedDegrees = parseFloat(value);

		// Covert Celsius degrees into Fahrenheit degrees
		if (unit === "C") {
			convertedDegrees = (convertedDegrees * (9 / 5) + 32).toFixed(2);
			const fahrenheit = `${Utility.limitDecimals(convertedDegrees)}°F`;
			return fahrenheit;
		}

		// Covert Fahrenheit degrees into Celsius degrees
		convertedDegrees = ((convertedDegrees - 32) / (9 / 5)).toFixed(2);
		const celsius = `${Utility.limitDecimals(convertedDegrees)}°C`;
		return celsius;
	}

	static convertSpeed(speed) {
		const [value, unit] = speed.split(" ");
		let convertedSpeed = parseFloat(value);

		// Covert km/h to mph
		if (unit === "km/h") {
			convertedSpeed = (convertedSpeed * 0.621371).toFixed(2);
			const mph = `${Utility.limitDecimals(convertedSpeed)} mph`;
			return mph;
		}

		// // Covert mph to km/h
		convertedSpeed = (convertedSpeed * 1.60934).toFixed(2);
		const kmph = `${Utility.limitDecimals(convertedSpeed)} km/h`;
		return kmph;
	}

	static limitDecimals(number) {
		// Limit digits after the comma if the the second digit is a 0;
		let newNumber = number.toString();
		const lastChar = newNumber[newNumber.length - 1];

		if (lastChar === "0") {
			newNumber = parseFloat(newNumber).toFixed(1);

			return newNumber;
		}

		return newNumber;
	}

	static showError(element, msg) {
		const msgEl = element;
		msgEl.classList.add("active");

		// Split the error message into two sentences, this way it will look better in the 'p' element.
		const index = msg.indexOf("!");
		const msgPart1 = msg.slice(0, index + 1);
		const msgPart2 = msg.slice(index + 1);
		msgEl.innerHTML = `
						${msgPart1} <br />
						${msgPart2}
					`;
	}

	static hideError(element) {
		const msgEl = element;
		msgEl.textContent = "";
		msgEl.classList.remove("active");
	}
}

export default Utility;
