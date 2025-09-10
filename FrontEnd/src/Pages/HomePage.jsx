import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function HomePage(props) {
    const [url, setUrl] = useState();
    const [allUrl, setAllUrl] = useState([]);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            console.log(url);
            const response = await axios.post("http://localhost:3000/shortUrl", { url });
            if (response.status == 200) {
                console.log(response);
            }
            else {
                console.log("Error");
            }
        }
        catch (e) {
            console.log("Error Occurs");
            console.log(e);
        }
    }

    const functionCall = async () => {
        const response = await axios.get('http://localhost:3000/allUrl', {});
        if (response.data.success === true) {
            console.log(response.data);
            setAllUrl((prev) => [...prev, ...response.data.savedUrl]);
        }
        else {
            console.log("Error while fetching...");
        }
    }

    useEffect(() => {
        functionCall();
    }, [])

    return (
        <>
            <div>
                <h1>URL Shortener</h1>
                <div>
                    <input placeholder='Enter URL' onChange={(e) => setUrl(e.target.value)}></input>
                    <button type='submit' onClick={submitForm}>Submit</button>
                </div>
                <div>
                    {/* {
                        allUrl.map(url=>(){

                        })
                    } */}
                </div>
            </div>
        </>
    )
}
