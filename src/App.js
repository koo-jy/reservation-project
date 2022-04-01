import List from './component/List.js';
import { api } from './api/reservation.js';

export default class App {
  constructor($target) {
    const list = new List({
      $target,
      fetchData: async () => {
        const response = await api.getReservationList();
        if (!response.isError) {
          list.setData([...list.data, ...response.data])
        } else {
          // TODO. error handling
        }
      }
    });

  }
}