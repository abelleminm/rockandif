function Spouses2(props) {
    var spouses2 = props.spouses2;
    if(spouses2.value !="")
    {
      spouses2 = spouses2.value.split("*");
    return(
    <ul id="spouses2List">
    {spouses2.map((spouse2)=> {
      if(spouse2 != ""){
      return(
      <li id="spouses2Item">{spouse2}</li>
      )}
    })}
    </ul>
    )
    }
    return;
}

export default Spouses2;