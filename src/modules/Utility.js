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
}

export default Utility;
