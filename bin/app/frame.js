"use strict";
const React = require('react');
const windows_1 = require('react-desktop/windows');
const menu_1 = require('./menu');
const elog_1 = require('../lib/elog');
exports.UIwindow = document.getElementsByTagName("app")[0];
class WindowFrame extends React.Component {
    render() {
        elog_1.elog("foo");
        return (React.createElement(windows_1.Window, {color: this.props.color, theme: this.props.theme, chrome: true, height: "300px", padding: "12px"}, React.createElement(windows_1.TitleBar, {title: "This is EDH Title #1", controls: true}), "//", React.createElement(menu_1.Menu, null), React.createElement(windows_1.Text, {color: this.props.theme === 'dark' ? 'white' : '#333'}, "HELLO WORLD")));
    }
}
WindowFrame.defaultProps = {
    color: '#cc7f29',
    theme: 'light'
};
exports.UIlauncher = WindowFrame;
//# sourceMappingURL=frame.js.map