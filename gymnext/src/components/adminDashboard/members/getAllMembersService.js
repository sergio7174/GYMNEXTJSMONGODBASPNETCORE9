import axios from 'axios';
import { notifyError} from '@/utils/toast';

export async function GetAllMembersService (setMembers, SetDaysLeft_mathFloor, setTotalmembers)  {

const Finish_day = [];
const MinisecondsLeft = [];
const DaysLeft = [];
const DaysLeft_mathFloor = [];
const currentDate = new Date();
const today=currentDate.getTime();
const MillisecondsPerDay = (1000 * 60 * 60 * 24);

    try {
      // get all categories from backend using axios action GET, to const res.
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`+'api/member/listAll')
      // if got data successfully --> change local Product.state with setCategories(res.data.data)
      // new values
      alert('Estoy en getallmembersSErvice - line 19 - res.data.message:'+res.data.message); // line only to test res data
      alert('Estoy en getAllMembersService - line 20 - res.data.total:'+res?.data?.total);   // line only to test res data
        //alert('Estoy en getAllMembersService - line 13 - res.data.members.nameplan:'+res?.data?.members[0]?.nameplan);     
        // line only to test res data

      if (res.data.total>0) { 
        
       // alert('Estoy en getallmembersSErvice - line 27 - res.data.total:'+res.data.total);
        
        setTotalmembers(res.data.total)
        setMembers(res.data.members)

        for (let index = 0; index < res?.data?.total; index++) {

     // alert("Estoy en ListMembersArea - line 123 - members.length: "+members?.data?.length);
     //alert("Estoy en GetAllMembersService - line 33 - index: "+index);
      
      //Finish_day[index]= new Date(members[index].finishAt).getTime();

      Finish_day[index]=(new Date(res?.data?.members[index]?.finishAt).getTime());

      //alert("Estoy en GetAllMembersService - line 42 - Finish_day[index]: "+Finish_day[index]);

      MinisecondsLeft[index]=((Finish_day[index] - today))

    //alert("Estoy en GetAllMembersService - line 46 - minisecondLeft[index]: "+MinisecondsLeft[index]);

    DaysLeft[index]=(MinisecondsLeft[index]/MillisecondsPerDay);
      
     //alert("Estoy en GetAllMembersService - line 51 -DaysLeft[index]: "+DaysLeft[index]);

     DaysLeft_mathFloor[index]=(Math.floor(DaysLeft[index]));
     //alert( "Estoy en GetAllMembersService - line 54 - DaysLeft_mathFloor: "+DaysLeft_mathFloor[index])

     SetDaysLeft_mathFloor(DaysLeft_mathFloor);
    
    }}

    } catch (error) {
      
      notifyError(error, 'Something went wrong in getAllMembers' );
    }
  };