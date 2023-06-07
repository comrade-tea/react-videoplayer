const Checkbox = ({name, isChecked, toggleHandler}) => {
    return (
        <label style={{
            userSelect: "none",
            cursor: "pointer"
        }}>
            <input
                onChange={() => toggleHandler(name, isChecked)}
                checked={isChecked}
                type="checkbox"
            />
            <span className="ms-2">
                {name}: {isChecked.toString()}
            </span>
        </label>
    )
}
export default Checkbox
