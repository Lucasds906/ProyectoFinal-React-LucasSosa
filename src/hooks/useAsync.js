// import { useState, useEffect } from "react"

// export const useAsync = (asyncFn, dependencies = []) =>  {

//     const [data, setData] = useState()
//     const [error, setError] = useState()
//     const [loading, setLoading] = useState(true)

//     useEffect( ()=> {
//         setLoading(true)
//         asyncFn()
//             .then((resp) => {
//                 setData(resp)
//             }).catch(error => {
//                 setError(error)
//             }).finally(() => {
//                 setLoading(false)
//             })
//         }, dependencies)
//         console.log(data)

//     return [data, error, loading];
// }

import { useState, useEffect } from "react";

export const useAsync = (asyncFn, dependencies = []) =>  {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const resp = await asyncFn();
                setData(resp);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, dependencies);
    return { data, error, loading };
};