import { Link } from 'react-router-dom';

function FormerGroups(props) {

    const formerbandindex = props.formerbandindex;
    const formerbands = props.formerbands;
    if (formerbandindex) {   
        return(
        <div id="formerBands">
        <h3 id="formerBandsTitle">Former Bands</h3>
        <ul id="formerBandsList">
            {formerbands.map((item) => {
                    var groupLink = "/group/" + item;
                    return(
                    <Link to={groupLink}>
                            <li id="formerBandItem">{item}</li>
                    </Link>
                    )
            })}
        </ul>
        </div>
        );
    }  return;}

export default FormerGroups;