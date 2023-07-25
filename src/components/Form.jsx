import {useCallback, useState} from "react";

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}


const Form = () => {
    const [data, setData] = useState({name: "", email: ""});

    const handleSubmit = (e) => {
        fetch("/", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: encode({"form-name": "contact", ...data})
        })
            .then(() => alert("Success!"))
            .catch(error => alert(error));

        e.preventDefault();
    };

    const handleChange = e => setData({...data, [e.target.name]: e.target.value});

    return (
        <form data-netlify="true"
              name={"contact"}
              method={"POST"}
              className={"fixed top-20 right-10 bg-amber-100 p-4 border-2 border-amber-400"}
              onSubmit={handleSubmit}>

            <input type="hidden" name="form-name" value="contact"/>

            <ul className={"flex flex-col gap-4"}>
                <li>
                    <input className="border-2"
                           onChange={handleChange}
                           type="text"
                           name={"name"}
                           value={data.name}
                           placeholder={"name"}/>
                </li>
                <li>
                    <input className="border-2"
                           onChange={handleChange}
                           type="email"
                           name={"email"}
                           value={data.email}
                           placeholder={"email"}
                    />
                </li>
            </ul>

            <button className={"bg-green-400 py-2 px-6 mt-8"} type={"submit"}>send</button>
        </form>
    )
};

export default Form;
