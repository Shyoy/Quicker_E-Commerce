import { useEffect ,useState} from "react"
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCategories } from "../../../Redux/productsSlice";

const Categories = () => {
    let { name } = useParams();
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();
    const [filterPop, setFilterPop] = useState<Boolean>(false)
  return (
    <div>
        <h1>Categories</h1> 
        {name}
        
    </div>
  )
}

export default Categories