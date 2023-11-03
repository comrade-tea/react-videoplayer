import {FaGithub} from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-black text-white mt-auto">
            <div className="container px-2 py-4 mx-auto">

                <div className="flex">
                    <a className="flex link" href="https://github.com/comrade-tea/react-videoplayer" target="_blank" rel="noreferrer">
                        <FaGithub className="me-2"/> source code
                    </a>

                    <div className="ms-auto">create by <a className="link"
                                                          href="https://comrade-tea-projects.netlify.app"
                                                          target="_blank" rel="noreferrer">
                        comrade-tea
                    </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
