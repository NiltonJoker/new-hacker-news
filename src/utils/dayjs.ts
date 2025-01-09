import dayjs from 'dayjs'
import relativeTime  from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

export function getDateFromNow(date: string) {
  return dayjs(date).fromNow()
}