declare module 'react-desktop/windows' {


	interface defaultProps {
		color?: string,
		theme?: string
	}
		/**
	type __CheckboxProps = {
		defaultValue?: string,
		defaultChecked?: boolean,
		hidden?: boolean,
		label?: string,
		onChange?: any
	}
	**/

	// React.HTMLAttributes

	//interface __TextProps extends __AlignedProps {
	interface __TextProps extends __AlignedProps {
		hidden?: boolean;
		height?: number;

	}

	interface __AlignedProps extends defaultProps {
		background?: string | boolean;
		verticalAlignment?: "top" | "center" | "bottom";
		padding?: string;
		margin?: string;
		horizontalAlignment?: "left" | "center" | "right";
	}

	type __ElementsType = string | JSX.Element | string[] | JSX.Element[];
	/**
	 * @function render()
	 * @returns {JXS.Element}
	 */
	//type render = () => JSX.Element

	class Checkbox extends React.Component<React.HTMLAttributes,void> { }


	/** START file: navPane/windows/navPane.js */
	interface __NavPaneProps extends defaultProps {
		canPaneToggle?: boolean;
		defaultIsPaneExpanded?: string;
		onPaneToggle?: React.EventHandler<any>;
		paneCompactedLength?: string | number;
		paneExpandedLength?: string | number;
		openLength: string | number;
		push: boolean;
	}

	export class NavPane extends React.Component<__NavPaneProps,void> {
		propTypes: __NavPaneProps
		contextTypes: themeContextTypes;
		render(): JSX.Element
		renderContent(): any
	}
	/** END file: navPane/windows/navPane.js */

	/** START file: navPane/windows/pane/pane.js */
	export class Pane extends React.Component<__NavPaneProps,void> {
		constructor(props,...any)
		propTypes: {
			items: __ElementsType
			canPaneToggle: boolean
			onPaneToggle: Function
			defaultIsPaneExpanded: boolean
			paneCompactedLength: string | number
			paneExpandedLength: string | number
		}
		defaultProps: {
			canPaneToggle: boolean
			defaultIsPaneExpanded: boolean
			paneCompactedLength: string | number
			paneExpandedLength: string | number
		}
		toggleOpen:Function;
		render(): JSX.Element
		renderItems(): JSX.Element | JSX.Element[]
	}
	/** END file: navPane/windows/pane/pane.js */

	/** START file: navPane/windows/item/item.js */
	interface __NavPaneItemState {
		prevTitle: __ElementsType;
	}
	interface __NavPaneItemProps extends __AlignedProps {
		title?: __ElementsType
		icon?: __ElementsType
		push?: boolean;
		onSelect?: React.EventHandler<any>;
		selected?: boolean;
		paneTheme?: string;
	}

	class NavPaneItem extends React.Component<__NavPaneItemProps,__NavPaneItemState> {
		constructor()
		componentWillReceiveProps(nextProps);
	 }
	/** END file: navPane/windows/item/item.js */

	/** START file: style/hidden.js */

	type hiddenPropTypes = { 
		hidden: boolean
	}

	function removeHiddenProps(props: props): {string: any}

	function mapHiddenStyle(key: any, value: any): any

	//function styleHelper(...options, hiddenPropTypes, mapHiddenStyle):
	class styleHelper {
		constructor(any,propTypes,mapStyleCallback,mapStylesCallback,mapProps) 

		doStyleHelper(WrappedComponent): JSX.Element
	}

	/** END file: style/hidden.js */

	/** START file: style/color/windows */

	type colorPropTypes = string | boolean;

	type colorContextType = string | boolean;

	type applyColorProps = ( props: props, context: context ) => { applyDefaultProps(props: props,context: context, {color: string}) }

	/**
	 * @function ColorContext
	 * @param {boolean} preserveProperty
	 */
	function ColorContext(preserveProperty: boolean): ComposedComponent;

	/** END file: style/color/windows */

	/** START file: src/button/windows/button.js */

	class Button extends React.Component<__NavPaneItemProps,__NavPaneItemState> {
		propTypes:
			colorPropTypes |
			themePropTypes | 
			{
				type: string
				push: boolean
				onClick: Function
			}

			contextTypes: {

			}

	}

	/** END file: src/button/windows/button.js */

	class Text extends React.Component<__TextProps,void> { }

	/** START file: Style/theme/windows */

	type themePropTypes = {
		theme: string
	};

	type themeContextTypes = {
		theme: string
	}

	type props = {};
	type context = {};

	/**
	 * @function
	 * @return {props} applyDefaultProps()
	 */
	interface applyThemeProps { ( props: props , context: context ): applyDefaultProps }

	function ThemeContext(): ComposedComponent;

	class ComposedComponent extends React.Component<themePropTypes,void> {
		propTypes: themePropTypes;
		contextTypes: themeContextTypes;
		childContextTypes: themeContextTypes;

		getChildContext(): themePropTypes;
		/**
		 * @function render
		 * @returns {JSX.Element} | returns ComposedComponent
		 */
		render(): JSX.Element;
	}

	/** END file: Style/theme/windows */


	/** file: styleHelper */

	/**
	 * @function applyDefaultProps
	 * @param {props} props
	 * @param {context} context
	 * @param {defaultProps} defaultProps | set to { theme: 'light' } by default
	 * @return {props} finalProps;
	 */
	type applyDefaultProps = ( props: props , context: context , defaultProps: props ) => props

	/**
	 * @function extractProps
	 * @return {[props,props]} finalProps,extractedProps
	 */
	function extractProps(props: props, proptypes: props): [props, props]





}