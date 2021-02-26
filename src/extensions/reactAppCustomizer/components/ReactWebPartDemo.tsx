// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import styles from './ReactWebPartDemo.module.scss';
import { IReactWebPartDemoProps } from './IReactWebPartDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';


export default class ReactWebPartDemo extends React.Component<IReactWebPartDemoProps, 
{ panelVisible: boolean }> {
  
  constructor(props: IReactWebPartDemoProps) {
    super(props);
    this.state = { panelVisible: false };
  }

  public render(): React.ReactElement<IReactWebPartDemoProps> {

    
    const items: [] = this.props.listItems;
    return (
      <div>
      <Panel 
        headerText="PnpJs + React Office Ui Fabric Panel + Application customizer"
        type={PanelType.extraLarge}        
        isOpen={this.state.panelVisible} 
        onDismiss={event => { this.setState({panelVisible: false})}}>
        <div className={styles.reactWebPartDemo}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.column}>
              <span className={styles.title}>Ideat lista</span>
                {items.map((item: any) => (
                  <div>{item.Title}</div>
                ))}                
                
              </div>
            </div>
          </div>
        </div>
      </Panel>
      <DefaultButton         
        onClick={event => { 
          this.setState({ panelVisible: !this.state.panelVisible });
        }} >Avaa ideat -paneeli</DefaultButton>
      </div>
    );  
    
    
  }
}
