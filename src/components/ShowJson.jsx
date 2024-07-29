import { useEffect, useState } from "react"
import { BarLoader } from 'react-spinners'

export const ShowJson = () => {

    const [responses, setResponses] = useState()

    useEffect(() => {
        const getResponses = async () => {
            try {
                const responses = await fetch(`https://json-database-gray.vercel.app/responses`)
                if (!responses.ok) {
                    throw new Error(`HTTP error! status: ${responses.status}`)
                }
                const data = await responses.json()
                setResponses(data)
                console.log(data)
            } catch (error) {
                console.log(error.message)
            }
        }

        getResponses()
    }, [])

    return (
        <>
            <div className="container my-5">
                <div className="card">
                    <div className="card-body">
                        {responses ? (
                            <pre className="bg-dark text-white p-3">
                                {JSON.stringify(responses, null, 2)}
                            </pre>
                        ) : (
                            <d className="d-flex justify-content-center">
                                <BarLoader />
                            </d>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}