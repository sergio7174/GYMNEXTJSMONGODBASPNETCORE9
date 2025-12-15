import axios from 'axios';
import { notifyError} from '@/utils/toast';

export async function GetAllStaffsService (setStaffs)  {

    try {
      // get all categories from backend using axios action GET, to const res.
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}`+'api/staff/listAll')
      // if got data successfully --> change local Product.state with setCategories(res.data.data)
      // new values
      //alert('Estoy en getallproductsSErvice - line 11 - res.data.message:'+res.data.message); // line only to test res data
        //alert('Estoy en getAllPacksService - line 12 - res.data.total:'+res?.data?.total);   // line only to test res data
        //alert('Estoy en getAllPacksService - line 13 - res.data.packs.nameplan:'+res?.data?.packs[0]?.nameplan);     
        // line only to test res data

      if (res.data.total>0) { setStaffs(res.data.Staffs)}
    } catch (error) {
      
      notifyError(error, 'Something went wrong in getAllStaffs' );
    }
  };