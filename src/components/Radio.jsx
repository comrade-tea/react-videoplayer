const Radio = ({changeHandler, name, currentName}) => {
    return (
        <label>
            <input type="radio"
                   onChange={(e) => changeHandler(e.target.value)}
                   checked={name === currentName}
                   value={name}
                   name="radio-group"
            />
            <span className="ml-2">{name}</span>
        </label>
    );
}
export default Radio
