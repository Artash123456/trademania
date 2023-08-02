declare global {
  interface DateC {
    DateDYMHM: string;
  }
}
class DateContstructor {
  public DateDYMHM(date?: string | Date | null | number) {
    if (!date) return '-';
    return new Date(date).toLocaleString('UTC', {
      day: '2-digit',
      year: 'numeric',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  public DateMYD(date?: string | Date | null) {
    if (!date) return '-';
    return new Date(date).toLocaleString('UTC', {
      day: '2-digit',
      year: 'numeric',
      month: '2-digit',
    });
  }
  public CountDate(date?: string | Date | null): number {
    if (!date) return 0;
    return Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / (24 * 60 * 60 * 1000)
    );
  }
}

const DateC = new DateContstructor();
export { DateC };
