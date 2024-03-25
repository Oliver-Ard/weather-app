import { format } from "date-fns";

class Utility {
	static formatDate(date) {
		const formattedDate = format(date, "MMMM dd, yyyy");
		return formattedDate;
	}

	static formatHour(hour) {
		const formattedHour = format(hour, "h:mm a");
		return formattedHour;
	}

	static formatDay(day) {
		const formattedDay = format(day, "iiii, do");
		return formattedDay;
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
		msgEl.classList.remove("active");
	}
}

export default Utility;
