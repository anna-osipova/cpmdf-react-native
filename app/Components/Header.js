import React from 'react';
import { SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';

const Header = (props) => (
  <SearchBar
    lightTheme
    placeholder="Search..."
    onChangeText={(text) => props.searchCb(text)}
  />
);

Header.propTypes = {
  searchCb: PropTypes.func
};

export default Header;
