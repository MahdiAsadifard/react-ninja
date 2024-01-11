import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, {
                signal: abortCont.signal,
            })
                .then(resp => {
                    if(!resp.ok) throw Error(`Couldn't fetch data`);

                    return resp.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch((err) => {
                    if(err.name === 'AbortError'){
                        console.log('Fetch Aborted.');
                    } else {
                        setError(err.message);
                        setIsPending(false);
                    }
                });
        }, 500);
        return () => {
            abortCont.abort('Reason');
        };
    }, [url]);

    return {
        data, isPending, error
    };
};

export default useFetch;