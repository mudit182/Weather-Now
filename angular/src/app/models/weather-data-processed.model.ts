import * as moment from 'moment';

export class WeatherDataProcessed {
  city: string;
  timeFetched: moment.Moment;
  data: {type: string; value: string}[];
}
