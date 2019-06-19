import {Inject, Injectable, LOCALE_ID} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {registerLocaleData} from "@angular/common";
import localeEn from "@angular/common/locales/en";
import localeDe from "@angular/common/locales/de";

export class Language {
	ID: number;
	name: string;
	code: string;
}

@Injectable()
export class LanguageService {
	
	languagesSource: Language[];
	
	private currentLanguageSource: BehaviorSubject<Language> = new BehaviorSubject(undefined);
	currentLanguage$: Observable<Language>                   = this.currentLanguageSource.asObservable();
	
	private currentLocaleSource: BehaviorSubject<string> = new BehaviorSubject(undefined);
	currentLocale$: Observable<string>                   = this.currentLocaleSource.asObservable();
	
	constructor(@Inject(LOCALE_ID) locale: string) {
		this.currentLocaleSource.next(locale);
		this.languagesSource = [
			{
				ID: 0,
				name: "English",
				code: "en"
			},
			{
				ID: 1,
				name: "Deutsch",
				code: "de"
			}
		];
		
		registerLocaleData(localeEn, "en");
		registerLocaleData(localeDe, "de");
	}
	
	setCurrentLocale(locale: string) {
		this.currentLocaleSource.next(locale);
	}
	
	getCurrentLocale(): string {
		return this.currentLocaleSource.getValue();
	}
	
	getLanguageName(code: string): string {
		const currentLanguage = this.languagesSource ? this.languagesSource.filter((language: Language) => code === language.code).pop() : null;
		return currentLanguage ? currentLanguage.name : null;
	}
}
