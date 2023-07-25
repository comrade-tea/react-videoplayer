import {useCallback} from "react";

const Form = () => {
    const onFormSubmit = useCallback((event) => {
        event.preventDefault();

        const myForm = event.target;
        const formData = new FormData(myForm);

        fetch("/", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams(formData).toString(),
        })
            .then(() => console.log("Form successfully submitted"))
            .catch((error) => alert(error));
    }, []);

    return (
        <form data-netlify="true"
              name={"contact"}
              id="form"
              method={"POST"}
              className={"fixed top-20 right-10 bg-amber-100 p-4 border-2 border-amber-400"} 
              onSubmit={onFormSubmit}>

            <ul className={"flex flex-col gap-4"}>
                <li><input className="border-2" type="text" name={"name"} placeholder={"name"}/></li>
                <li><input className="border-2" type="email" name={"email"} placeholder={"email"}/></li>
            </ul>

            <button className={"bg-green-400 py-2 px-6 mt-8"} type={"submit"}>send</button>
        </form>
    )
};

export default Form;
