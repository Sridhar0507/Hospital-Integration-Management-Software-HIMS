// Sidebar imports

import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";
import Treatments from "../imgs/Treatments.avif";
import InputOutput from "../imgs/InputOutput.avif";

import Radiology from "../imgs/Radiology.jpg";
import Drug from "../imgs/Drug.webp";
import OTBooking from "../imgs/OTBooking.jpg";
import NurseProgress from "../imgs/NurseProgress.jpg";
import ConsentForm from "../imgs/ConsentForm.webp";
import Billing from "../imgs/Billing.jpg";
import DischargeSum from "../imgs/DischargeSum.jpg";

import OperationPro from "../imgs/OperationPro.jpg";
import Vitalss from "../imgs/Vitalss.webp";
import LabReport from "../imgs/LabReport.jpg";
// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";



export const cardsData = [

  
  {
    title: "Treatment",
    color: {
      backgroundImage: Treatments,
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "2px 10px 15px -6px",
    },

    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Treatment",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
    chartType: "pie", // Pie chart
  },

  {
    title: "Operation Procedure",
    color: {
      backgroundImage: OperationPro,
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "2px 10px 15px -6px",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Operation Procedure",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
    chartType: "bar", // Bar chart
  },

  {
    title: "Vitals",
    color: {
      backgroundImage: Vitalss,
      backGround:
        "linear-gradient(rgb(142 152 225) -146.42%, rgb(135 144 255) -46.42%)",
      boxShadow: "2px 10px 15px -6px",
    },

    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Vitals",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
    chartType: "line", 
  },

  {
    title: "Lab Request & Report",
    color: {
      backgroundImage: LabReport,

      backGround:
        "linear-gradient(rgb(173 240 215) -146.42%, rgb(110 222 156) -46.42%)",
      boxShadow: "2px 10px 15px -6px",
    },

    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Lab Request & Report",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
    chartType: "radialBar", 
  },

  {
    title: "Radiology Request & Report",
    color: {
      backgroundImage: Radiology,
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "2px 10px 15px -6px",
    },

    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Radiology Request & Report",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },

  {
    title: "Drug Administration",
    color: {
      backgroundImage: Drug,
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "2px 10px 15px -6px",
    },

    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Drug Administration",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },

  {
    title: "Input Output Chart",
    color: {
      backgroundImage: InputOutput,
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "2px 10px 15px -6px",
    },
    png: UilUsdSquare,
    series: [
      {
        name: "Input Output Chart",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },

  {
    title: "OT Booking Details",
    color: {
      backgroundImage: OTBooking,
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "2px 10px 15px -6px",
    },

    png: UilMoneyWithdrawal,
    series: [
      {
        name: "OT Booking Details",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },

  {
    title: "Consent Forms",
    color: {
      backgroundImage: ConsentForm,
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "2px 10px 15px -6px",
    },

    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Consent Forms",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },

  {
    title: "Nurse Progress Notes",
    color: {
      backgroundImage: NurseProgress,
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "2px 10px 15px -6px",
    },

    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Nurse Progress Notes",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },

  {
    title: "Billing",
    color: {
      backgroundImage: Billing,
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "2px 10px 15px -6px",
    },

    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Billing",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },

  {
    title: "Discharge Summary",
    color: {
      backgroundImage: DischargeSum,
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "2px 10px 15px -6px",
    },

    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Discharge Summary",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
];

