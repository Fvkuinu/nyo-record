// /lib/holidayApi.js
import axios from 'axios';

export const getJapaneseHolidays = async () => {
    try {
        const response = await axios.get('https://holidays-jp.github.io/api/v1/date.json');
        const holidays = response.data; // 祝日データをそのまま取得
        return holidays;
    } catch (error) {
        console.error("Error fetching holidays:", error);
        return {};
    }
};
