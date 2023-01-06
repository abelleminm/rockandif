function Partners(props) {
  
  var partners = props.partners;
  if(partners.value !=""){
    return(
    <>
    {partners.map((partner)=> {
      if(partner != ""){
      return(
        <li id="partnersItem">{partner}</li>
      )}
    })}
    </>
    )
  }
}

export default Partners;