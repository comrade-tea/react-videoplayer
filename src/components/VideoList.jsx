import Radio from "./Radio.jsx";

const VideoList = ({videos, selectedVideoName, selectedVideoHandler}) => {
    return (
        <ul>
            {Object.keys(videos).map((name, index) => {
                return (
                    <li key={index}>
                        <Radio
                            currentName={selectedVideoName}
                            changeHandler={selectedVideoHandler}
                            name={name}/>
                    </li>
                );
            })}
        </ul>
    )
}
export default VideoList
