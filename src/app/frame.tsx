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

	render() {
		elog("foo")
		return (
			<Window
				color={this.props.color}
				theme={this.props.theme}
				chrome
				height="300px"
				padding="12px"
				>
				<TitleBar title="This is EDH Title #1" controls/>
				//<Menu></Menu>
				<Text color={this.props.theme === 'dark' ? 'white' : '#333'}>HELLO WORLD</Text>
			</Window>
		);
	}
}


