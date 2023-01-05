function Singles(props) {

    var singles = props.singles;
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

export default Singles;