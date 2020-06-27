import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/en' // load on demand

export default async () => {
	dayjs.locale('en') // use English locale globally
	dayjs.extend(localeData)
	dayjs.extend(localizedFormat)
	dayjs.extend(utc)
}
