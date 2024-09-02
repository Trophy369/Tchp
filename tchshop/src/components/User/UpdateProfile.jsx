import { useState } from "react"

const UpdateProfile = () => {
    const [data, setData] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('submit')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">First Name</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="name">Last Name</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="name">City</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="name">State</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="name">Country</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="name">zipcode</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="name">Phone</label>
                <input type="text" />
            </div>
            <button>Submit</button>
        </form>
    )

}

export default UpdateProfile