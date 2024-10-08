import { combineReducers } from "redux";
import Userdata from "./Userdata";
import Frontoffice from "./frontoffice";
import Inventory from "./Inventory";




const Rootreducer = combineReducers({
  userRecord: Userdata,
  Frontoffice: Frontoffice,
  Inventorydata:Inventory,


});
export default Rootreducer;
