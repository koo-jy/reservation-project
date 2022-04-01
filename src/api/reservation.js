const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (e) {
    throw {
      message : e.message,
      status : e.status
    };
  }
};

const api = {
  getReservationList: async () => {
    try {
      const list = await request(
        'https://frontend.tabling.co.kr/v1/store/9533/reservations'
      );
      return {
        isError: false,
        data: list.reservations
        // data: list?.data?.list
      }
    } catch (e) {
      return {
        isError: true,
        data: e
      }
    }
  }
};

export { api };

