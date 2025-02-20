import axios from 'axios';
import { reactive, toRefs } from 'vue';

interface IResult<T> {
    result: T | null;
    loading:boolean;
    error:any; 
}
function useURLLoader<T>(url: string){

    const data: IResult<T> = reactive({
        result: null,
        loading: true,
        error: null
    });

    axios.get(url).then(
        rawData => {
            data.result = rawData.data;
        }
    ).catch(
        e => {
            data.error = e;
        }
    ).finally(
        () => {
            data.loading = false;     
        }
    );
    return toRefs(data)

}

export default useURLLoader;