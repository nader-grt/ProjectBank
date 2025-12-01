export default class clsDate {
    static DateToString(date: Date): string {
      return date.toISOString().split("T")[0];
    }
  }