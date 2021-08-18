import { PanelPlugin } from '@grafana/data';
import { PhotoGridOptions } from './types';
import { PhotoGridPanel } from './PhotoGridPanel';

export const plugin = new PanelPlugin<PhotoGridOptions>(PhotoGridPanel).setPanelOptions((builder) => {
  return builder
    .addNumberInput({
      path: 'columns',
      name: 'Columns',
      description: 'Number of columns in the grid',
      defaultValue: 3,
    })
    .addNumberInput({
      path: 'minHeight',
      name: 'Min Height',
      description: 'Minimum height of each photo in pixels',
      defaultValue: 50,
    })
    .addTextInput({
      path: 'goToLinkText',
      name: 'Go to text',
      description: 'Text displayed in the link text',
      defaultValue: 'Go',
    });
});
