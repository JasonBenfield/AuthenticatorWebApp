import 'reflect-metadata';
import { MainPageViewModel } from "./MainPageViewModel";
import { TelephoneNumber } from "../TelephoneNumber";
import { startup } from 'xtistart';
import { singleton } from 'tsyringe';

@singleton()
class MainPage {
    constructor(private readonly viewModel: MainPageViewModel) {
        this.viewModel.telephoneNumber(new TelephoneNumber(864, 555, 1234).toString());
    }
}
startup(MainPageViewModel, MainPage);