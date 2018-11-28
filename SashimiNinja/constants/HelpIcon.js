import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Colors from './Colors';

// this class is for the help icon on the top right to access resources
// add clickable qualities later
export default class HelpIcon extends React.Component {
  constructor( props ) {
    super( props )
  }

  render() {
    return (
      <Text 
        style={{ 
          fontSize: 30, 
          fontWeight: 'bold',
          marginRight: 22.5, 
          color: Colors.altColor
        }}
      >?</Text>
    );
  }
}