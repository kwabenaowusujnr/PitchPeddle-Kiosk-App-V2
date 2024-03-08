import axios from "axios";


export const fetchEventReservations = async (currentEventId) => {
    try {
        const response = await axios.post('https://ppevent.azurewebsites.net/api/geteventreservation', {
            eventid: currentEventId
        });
        return response.data.reservation;
    } catch (error) {
        console.log('Error:', error);
    }
}


export const doCheckin = async (eventid, eventCode, attendantName, phoneNo) => {
    try {
        const response = await axios.post('https://ppevent.azurewebsites.net/api/checkin', {
            eventid: eventid,
            code: eventCode.toUpperCase(),
            name: attendantName,
            phonenumber: phoneNo
        });

        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}
