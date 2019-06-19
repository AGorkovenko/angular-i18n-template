import {BrowserModule, BrowserTransferStateModule} from "@angular/platform-browser";
import {LOCALE_ID, NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {CommonModule, registerLocaleData} from "@angular/common";
import localeDe from "@angular/common/locales/de";
import localeEn from "@angular/common/locales/en";
import {LanguageService} from "./language.service";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({appId: "admin-root"}),
		BrowserTransferStateModule,
		CommonModule,
		RouterModule,
		FormsModule
	],
	providers: [
		LanguageService,
		{
			provide: LOCALE_ID,
			useValue: "en"
		}
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}

registerLocaleData(localeEn, "en");
registerLocaleData(localeDe, "de");
