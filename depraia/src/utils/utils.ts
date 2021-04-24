export default class Utils {
	static convertDateToDayAndMonth = (date: Date) => {
		var newDate = new Date(date),
      dia = newDate.getDate().toString().padStart(2, "0"),
      mes = (newDate.getMonth() + 1).toString().padStart(2, "0");
    return dia + "/" + mes;
	}
}