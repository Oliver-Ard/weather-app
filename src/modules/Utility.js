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
