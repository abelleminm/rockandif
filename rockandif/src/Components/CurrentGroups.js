import { Link } from 'react-router-dom';

function CurrentGroups(props) {

    const bandindex = props.bandindex;
    const bands = props.bands;
    if (bandindex) {   
        return(
        <div id="bands">
        <h3 id="bandsTitle">Current Bands</h3>
        <ul id="bandsList">
            {bands.map((item) => {
                    var index = item.lastIndexOf('/');
                    var linkEnd = item.substring(index+1);
                    var groupLink = "/group/" + linkEnd;
                    return(
                    <Link to={groupLink}>
                            <li id="bandItem">{linkEnd}</li>
                    </Link>
                    )
            })}
        </ul>
        </div>
        );
    }  return;}

export default CurrentGroups;