import 'jest-preset-angular/setup-jest';
import {TextEncoder, TextDecoder} from 'util'

global.TextEncoder = TextEncoder
// @ts-ignore
global.TextDecoder = TextDecoder
// @ts-ignore
const {Crypto} = require("@peculiar/webcrypto");
global.Crypto = Crypto

import {getTestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting,} from '@angular/platform-browser-dynamic/testing';

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
    {teardown: {destroyAfterEach: false}}
);
