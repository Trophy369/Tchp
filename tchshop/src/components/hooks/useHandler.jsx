import { useState } from "react";

const useHandler = (requestData, applyData) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendReq = async () => {
        setIsLoading(true);
        setError(null)
        try {
            const response = await fetch(
                requestData.url, {
                    method: requestData.method,
                    headers: requestData.headers,
                    body: JSON.stringify(requestData.body)
                }
            )
            
            if (!response.ok) {
                throw new Error('Request Failed')
            }

            const data = await response.json()
            applyData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!')
        }
        setIsLoading(false)
    }

    return {isLoading, error, sendReq}
}

export default useHandler