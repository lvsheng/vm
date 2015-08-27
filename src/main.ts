/**
 * @file 对外接口模块
 */

import {widgetManager, IWidget} from './WidgetManager';
import {Parser} from './Parser';
export {Widget} from './Widget';

interface ElementContainer {
    appendChild (el: Element)
}

export var main = {
    register (name: string, clazz: IWidget) {
        widgetManager.register(name, clazz);
    },
    run (rootWidget: string, container: ElementContainer) {
        container.appendChild(widgetManager.create(rootWidget));
    }
};
