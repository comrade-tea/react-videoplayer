import Checkbox from "./Checkbox.jsx";

const OptionsEditor = ({videoOptions, toggleHandler}) => {
    return (
        <ul>
            {Object.entries(videoOptions).map((item, index) => {
                const key = item[0];
                const value = item[1];

                return (
                    <li key={index}>
                        <Checkbox name={key} toggleHandler={toggleHandler} isChecked={value}/>
                    </li>
                )
            })}
        </ul>
    )
}
export default OptionsEditor
