import * as _ from 'lodash';

export class EventCollection {
    constructor() {
        this._identifier = this;
    }

    private readonly _identifier: any;
    private readonly _events: IEvent<any>[] = [];

    register<TArgs>(evt: IEventHandler<TArgs>, callback: EventCallback<TArgs>, isEnabled?: () => boolean) {
        this._events.push(<IEvent<any>>evt.register(callback, this._identifier, isEnabled));
        return this;
    }

    dispose() {
        this._events.forEach(s => s.unregister(this._identifier));
        this._events.splice(0, this._events.length);
    }
}

export class DefaultEvent<TArgs> implements IEvent<TArgs> {
    private static defaultIsEnabled() {
        return true;
    }

    constructor(private readonly source: any) {
    }

    private readonly _callbacks: RegisteredEventCallback[] = [];

    register(callback: EventCallback<TArgs>, identifier?: any, isEnabled?: () => boolean) {
        this._callbacks.push({
            callback: callback,
            identifier: identifier,
            isEnabled: isEnabled || DefaultEvent.defaultIsEnabled
        });
        return this;
    }

    invoke(args: TArgs) {
        _(this._callbacks).forEach(c => {
            if (c.isEnabled()) {
                c.callback(args, this.source);
            }
        });
    }

    unregister(identifier: any) {
        if (identifier) {
            let index = _(this._callbacks).findIndex(c => c.identifier === identifier);
            while (index > -1) {
                this._callbacks.splice(index, 1);
                index = _(this._callbacks).findIndex(c => c.identifier === identifier);
            }
        }
    }

    dispose() {
        this._callbacks.splice(0, this._callbacks.length);
    }
}

export class DefaultEventHandler<TArgs> implements IEventHandler<TArgs> {
    constructor(private readonly source: IEvent<TArgs>) {
    }

    register(callback: EventCallback<TArgs>, identifier?: any, isEnabled?: () => boolean) {
        this.source.register(callback, identifier, isEnabled);
        return this.source;
    }

    unregister(identifier: any) {
        this.source.unregister(identifier);
    }
}

export class SimpleEvent extends DefaultEvent<any> {
    constructor(source: any) {
        super(source);
    }

    invoke() {
        super.invoke(null);
    }
}
