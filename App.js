/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import MathView from 'react-native-math-view'
import { WebView} from 'react-native-webview'

import katexStyle from './src/katex/katex-style';
import katexScript from './src/katex/katex-script';
import { bool, func, object, string } from 'prop-types';

function getContent({ inlineStyle, expression = '', ...options }) {
  const tryOutExpression = 'Here is a normal text with some math in it using Katex \\frac{1}{2}'
  return `<!DOCTYPE html>
<html>
<head>
<style>
${katexStyle}
${inlineStyle}
</style>
<script>
window.onerror = e => document.write(e);
window.onload = () => katex.render(${JSON.stringify(tryOutExpression)}, document.body, ${JSON.stringify(options)});
${katexScript}
</script>
</head>
<body>
</body>
</html>
`;
}

const defaultStyle = StyleSheet.create({
  root: {
    height: 40,
  },

});
const defaultInlineStyle = `
html, body {
  

  margin: 0;
  padding: 0;
}
.katex {
  margin: 0;
   
  font-size:3em;


}
`;

export default class App extends React.Component {

  static propTypes = {
    expression: string.isRequired,
    displayMode: bool,
    throwOnError: bool,
    errorColor: string,
    inlineStyle: string,
    macros: object,
    colorIsTextColor: bool,
    onLoad: func,
    onError: func,
  };

  static defaultProps = {
    expression: '',
    displayMode: false,
    throwOnError: false,
    errorColor: '#f00',
    inlineStyle: defaultInlineStyle,
    style: defaultStyle,
    macros: {},
    colorIsTextColor: false,
    onLoad: () => {},
    onError: () => {},
  };
  
  
  render() {
    const { style, onLoad, onError, ...options } = this.props;
 
    return(
        <View style={{flex:1, display:'flex'}}>
            <Text>The following is rendered using Math View</Text>
            <MathView math={'\\text{Here is a normal text with some math in it using MathView } \\frac{1}{2} '} />
            
            
            <Text>The following is rendered using Katex</Text>
            <WebView
              style={style}
              source={{ html: getContent(options) }}
              onLoad={onLoad}
              onError={onError}
              renderError={onError}
          />
          
        </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1, 
    justifyContent: 'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'black',
    margin:20,
  },
   text:{
      fontSize: 50,
      color:'black'
    }

})
