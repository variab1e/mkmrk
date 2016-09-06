import * as React from 'react';
import { Window, TitleBar, Text } from 'react-desktop/windows';
import { Menu } from './menu';
import { CONFIG } from '../config';

import { elog } from '../lib/elog';

import electron = require("electron");
let remote = electron.remote;
//let BrowserWindow = remote.require('BrowserWindow'); 

export const UIwindow = document.getElementsByTagName("app")[0];

export { WindowFrame as UIlauncher };

class WindowFrame extends React.Component<any, any> {
	static defaultProps = {
		color: '#cc7f29',
		theme: 'light'
	};

	state = {
		isMaximized: false
	}

	constructor() {
		super();
	}

	close(){
		elog('close window');
		let window = remote.BrowserWindow.getFocusedWindow();
		window.close();

	}

	minimize(){
		elog('minimize window');
		let window = remote.BrowserWindow.getFocusedWindow();
		window.minimize();
	}

	maximize(){
		elog('minimize window');
		let window = remote.BrowserWindow.getFocusedWindow();
		window.maximize();
	}

	toggleMaximize(){
		elog('maximize window');
		this.setState({ isMaximized: !this.state.isMaximized });
		elog(`${this.state.isMaximized}`)
	}

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
				<TitleBar
					title={CONFIG.Title}
					controls
					isMaximized={this.state.isMaximized}
					theme={this.props.theme}
					background={this.props.color}
					onCloseClick={this.close}
					onMinimizeClick={this.minimize}
					onMaximizeClick={this.toggleMaximize}
					onRestoreDownClick={this.toggleMaximize}
					/>				
	  			<Menu></Menu>
				<Text color={this.props.theme === 'dark' ? 'white' : '#333'}>HELLO WORLD</Text>
			</Window>
		);
	}
}


