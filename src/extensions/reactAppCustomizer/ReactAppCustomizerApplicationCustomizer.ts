import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import * as React from 'react';
import * as ReactDom from 'react-dom';

import { sp } from "@pnp/sp/presets/all";

import ReactWebPartDemo from './components/ReactWebPartDemo';
import { IReactWebPartDemoProps } from './components/IReactWebPartDemoProps';


import * as strings from 'ReactAppCustomizerApplicationCustomizerStrings';

const LOG_SOURCE: string = 'ReactAppCustomizerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IReactAppCustomizerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ReactAppCustomizerApplicationCustomizer
  extends BaseApplicationCustomizer<IReactAppCustomizerApplicationCustomizerProperties> {
  
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // other init code may be present

    sp.setup({
      spfxContext: this.context
    });

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    console.log('Available application customizer placeholders: ',
      this.context.placeholderProvider.placeholderNames
        .map((name) => PlaceholderName[name])
        .join(', ')
    );

    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );

      if (!this._bottomPlaceholder) {
        console.error('The expected placeholder (Bottom) was not found.');
        return;
      }

      
      if (this._bottomPlaceholder.domElement) {        
        sp.web.lists.getByTitle("Ideas").items.get()
        .then((value: []) => {
          const element: React.ReactElement<IReactWebPartDemoProps> = React.createElement(
            ReactWebPartDemo,
            {
              listItems: value
            }
          );
      
          ReactDom.render(element, this._bottomPlaceholder.domElement);
        });

        
      }
      
    }
  }
  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
