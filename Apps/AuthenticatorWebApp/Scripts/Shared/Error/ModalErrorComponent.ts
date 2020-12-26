import { ModalErrorComponentViewModel } from './ModalErrorComponentViewModel';
import { Command } from '../Command';
import { ModalErrorViewModel } from './ModalErrorViewModel';
import { ErrorModel } from '../ErrorModel';
import { singleton } from 'tsyringe';

@singleton()
export class ModalErrorComponent {
    constructor(
        private readonly vm: ModalErrorComponentViewModel
    ) {
        this.okCommand.setText('OK');
        this.okCommand.makeDanger();
        this.vm.modalOptions.closed.register(this.onClosed.bind(this));
    }

    private onClosed() {
        this.vm.errors([]);
    }

    show(errors: ErrorModel[], caption: string = '') {
        this.vm.errors.splice(0, 0, new ModalErrorViewModel(errors, caption));
        if (this.vm.errors().length === 1) {
            this.vm.title('An error occurred');
        }
        else {
            this.vm.title('Errors occurred');
        }
        this.vm.modalOptions.command('show');
    }

    readonly okCommand = new Command(this.vm.okCommand, this.ok.bind(this));

    private ok() {
        this.vm.errors([]);
        this.vm.modalOptions.command('hide');
    }
}