import React, { useState } from 'react';
import './AppointmentCalendar.css';
import Days from './Days';
import Weeks from './Weeks';
import Months from './Months';
import { useDispatch, useSelector } from 'react-redux';


function AppoinmentCalendar( ) {
    const [selectedOptioncalender, setSelectedOptioncalender] = useState('Monthly');


    const userRecord = useSelector(state=>state.userRecord?.UserData);

    

  
    const handleOptionChange = (event) => {
        setSelectedOptioncalender(event.target.value);
    };

    return (
        <div className='total_calendar'>
        <div className="h_head h_head_h_2">
                <h4>{selectedOptioncalender} view </h4>
                <div className="calender_select_opt slect-view-blk selt-dctr-nse">
                    <label htmlFor="Calender"> Select :</label>
                    <select className='calender_select_colr' value={selectedOptioncalender} onChange={handleOptionChange}>
                        <option value="Monthly">Months</option>
                        <option value="Weekly">Weeks</option>
                        <option value="Day">Days</option>
                    </select>
                </div>

            </div>

            {selectedOptioncalender === 'Monthly' && <Months />}
            {selectedOptioncalender === 'Weekly' && <Weeks />}
            {selectedOptioncalender === 'Day' && <Days />}
        </div>
    );
}



export default AppoinmentCalendar;









