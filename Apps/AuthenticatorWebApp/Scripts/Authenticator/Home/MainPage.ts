/// <reference path="../api/authenticatorentities.d.ts" />
import 'reflect-metadata';
import { MainPageViewModel } from "./MainPageViewModel";
import { startup } from 'xtistart';
import { singleton } from 'tsyringe';

@singleton()
class MainPage
{
    constructor(private readonly vm: MainPageViewModel) {
    }
}
startup(MainPageViewModel, MainPage);