function Partners(props) {
    var partners = props.partners;
    if(partners.value !="")
    {
      partners = partners.value.split("*");
    return(
    <ul id="partnersList">
    {partners.map((partner)=> {
      if(partner != ""){
      return(
      <li id="partnersItem">{partner}</li>
      )}
    })}
    </ul>
    )
    }
    return;
}

export default Partners;