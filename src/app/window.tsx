import * as React from 'react';
import { Window, TitleBar, Text } from 'react-desktop/windows';
import { Menu } from './menu';

import { elog } from '../lib/elog';


export const UIwindow = document.getElementsByTagName("app")[0];

export { WindowFrame as UIlauncher };

class WindowFrame extends React.Component<any, void> {
	static defaultProps = {
		color: '#cc7f29',
		theme: 'light'
	};
/**
 * Setting 
 * 	height
 * 	width
 * 	works in pixels not percentages
 * Not setting them causes them to expand to fit the entire body.
 * 
 * Chrome being set (boolean) means there is a goldish border on focus
 */
	render() {
		return (
			<Window
				color={this.props.color}
				theme={this.props.theme}
				chrome
				padding="12px"
				>
				<TitleBar title="This is EDH Title #1" controls/>
				<Menu></Menu>
				<Text color={this.props.theme === 'dark' ? 'white' : '#333'}>HELLO WORLD</Text>
			</Window>
		);
	}
}


