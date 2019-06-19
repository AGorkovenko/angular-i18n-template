import {Component, OnInit} from "@angular/core";
import {Language, LanguageService} from "./language.service";
import {tap} from "rxjs/operators";

@Component({
	selector: "app-root",
	template: `
      <h1 i18n="This is test title for showing how you can use translating via i18n angular@@homePageTestTitle">This is row for translation in different languages!</h1>
      <div>
          <a i18n-title="@@homePageTestTitleAttribut" title="Title of test link" href="/" i18n="@@homePageLink">First link on page</a>
      </div>
      <div>
		      <select>
				      <option [value]="language.code" *ngFor="let language of languages" [selected]="language.code === locale">{{language.name}}</option>
		      </select>
      </div>
	`,
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	
	languages: Language[] = [];
	locale: string        = null;
	
	constructor(private languageService: LanguageService) {
	}
	
	ngOnInit(): void {
		this.languages = this.languageService.languagesSource;
		
		this.languageService.currentLocale$
		.pipe(
			tap(locale => {
				if (locale) {
					this.locale = locale;
				} else {
					this.locale = this.languages[0].code;
				}
			})
		)
		.subscribe();
	}
}
