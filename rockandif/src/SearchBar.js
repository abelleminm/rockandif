import React from 'react';
import { MDBInputGroup, MDBInput, MDBIcon, MDBAlert, MDBBtn } from 'mdb-react-ui-kit';

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {showSearchAlert: false};

    this.handleSearch = this.handleSearch.bind(this);
    this.setShowSearchAlert = this.setShowSearchAlert.bind(this);
  }

  handleSearch() {
    this.setState({showSearchAlert: true});
  }

  setShowSearchAlert(showSearchAlert) {
    this.setState({showSearchAlert: showSearchAlert});
  }
  
  render() {
    return (
      <>
        <MDBInputGroup>
          <MDBInput label='Search' />
          <MDBBtn onClick={() => this.setShowSearchAlert(true)} rippleColor='dark'>
            <MDBIcon icon='search' />
          </MDBBtn>
        </MDBInputGroup>

        {/* <MDBAlert delay={1000} position='top-right' autohide appendToBody show={this.state.showSearchAlert}>
          Search!
        </MDBAlert> */}
      </>
      );
    }
}

export default SearchBar;