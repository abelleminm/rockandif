function Singles(props) {

    var singles = props.singles;
    if(singles.value!=""){
        return(
        <>
        {singles.map((single)=> {
        if(single != ""){
        return(
            <li id="singlesItem">{single}</li>
        )}
        })}
        </>
        )
    }
}

export default Singles;