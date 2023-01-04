function Spouses(props) {
    var spouses = props.spouses;
    if(spouses.value !="")
    {
      spouses = spouses.value.split("*");
    return(
    <ul id="spousesList">
    {spouses.map((spouse)=> {
      if(spouse != ""){
      return(
      <li id="spousesItem">{spouse}</li>
      )}
    })}
    </ul>
    )
    }
    return;
}

export default Spouses;