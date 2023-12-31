import { Outlet } from "react-router-dom";
import UserChatComponent from "./UserChatComponent";

const RoutWithUserChatComponent=()=>{
return (
<>
 <UserChatComponent/> <Outlet/>
</>
);
}
export default RoutWithUserChatComponent;