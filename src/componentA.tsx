//import ProgressCircle = require("react-desktop/windows");
import * as React from 'react';
//import { Checkbox } from 'react-desktop/windows';

import { Menu } from './menu';


/**
interface IAppProps {
	model : ITodoModel;
}

interface ITodoModel {
  key : any;
  todos : Array<ITodo>;
  onChanges : Array<any>;
  subscribe(onChange);
  inform();
  addTodo(title : string);
  toggleAll(checked);
  toggle(todoToToggle);
  destroy(todo);
  save(todoToSave, text);
  clearCompleted();
}

interface IAppState {
  editing? : string;
  nowShowing? : string
}

class EndlessWaiting extends React.Component<IAppProps, IAppState> {

} 
*/
//document.getElementsByTagName("app")[0];
//export const UIwindow = document.getElementById('app');
export const UIwindow = document.getElementsByTagName("app")[0];

export class UIlauncher extends React.Component<any,any> {

  constructor(props: any) {
    super(props);
  }
  render() {
    return (
     <Menu></Menu>
    );
  }
}

/**
export class checkster extends React.Component<any,any> {
  static defaultProps = {
    color: '#cc7f29',
    theme: 'light'
  };

  render() {
    return (
      <Checkbox
        label="Check me!"
        onChange={(e) => console.log(e.target)}
        defaultValue="I got checked!"
        defaultChecked
      />
    );
  }
}
**/
document.title = 'React in Electron!';

