import React from 'react'
import { useSelector } from 'react-redux';

const NewGeneralBilling = () => {


    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const UserData = useSelector((state) => state.userRecord?.UserData);
    const OP_BillingData = useSelector((state) => state.Frontoffice?.OPBillingData)
    const toast = useSelector(state => state.UserData?.toast);
    const ClinicDetails = useSelector(state => state.userRecord?.ClinicDetails);
    const blockInvalidChar = (e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
    
    return (
        <>

        </>
    )
}

export default NewGeneralBilling;