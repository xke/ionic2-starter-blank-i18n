import {Component, PLATFORM_PIPES} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {TranslatePipe} from 'ng2-translate/src/translate.pipe';
import {Http} from '@angular/http';
import {TranslateStaticLoader, TranslateLoader, TranslateService} from 'ng2-translate/src/translate.service';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor (platform: Platform, private translate: TranslateService) {
    let fallbackLanguage = 'en';
    let userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(en)/gi.test(userLang) ? userLang : fallbackLanguage;

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(fallbackLanguage);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [
  {provide: PLATFORM_PIPES, useValue: TranslatePipe, multi: true},
  {
    provide: TranslateLoader,
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'build/i18n', '.json'),
    deps: [Http]
  },
  TranslateService,
]);
