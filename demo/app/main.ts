import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';

import {provide} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, HashLocationStrategy} from '@angular/common'
import {HTTP_PROVIDERS} from "@angular/http";

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);