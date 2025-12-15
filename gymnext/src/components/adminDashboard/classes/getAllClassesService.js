import axios from 'axios';
import { notifyError} from '@/utils/toast';

export async function GetAllClassesService (setClasses)  {

    try {
      // get all categories from backend using axios action GET, to const res.
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`+'api/class/listAll')
      // if got data successfully --> change local Product.state with setCategories(res.data.data)
      // new values
      //alert('Estoy en getallClassesService - line 11 - res.data.message:'+res.data.message); // line only to test res data
      //alert('Estoy en getAllClassesService - line 12 - res.data.total:'+res?.data?.total);   // line only to test res data
      //alert('Estoy en getAllClassesService - line 13 - res.data.classes.classname:'+res?.data?.classes[0]?.classname);     
        // line only to test res data

      if (res.data.total>0) { setClasses(res.data.classes)}
    } catch (error) {
      
      notifyError(error, 'Something went wrong in getAllClasses' );
    }
  };