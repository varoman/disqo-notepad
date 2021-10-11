import { AbstractControl, ValidatorFn } from '@angular/forms';

export class Validation {

	public static required({ value }: AbstractControl) {
		return value ? null : { required: { message: Validation.messages.required } };
	}

	public static maxLength(maxLength: number = 255): ValidatorFn {
		return ({ value }: AbstractControl): any | null => {
			if ((value && maxLength) && (value.length > maxLength)) {
				return { maxLength: {
						message: Validation.messages.maxLength
							.replace('%', maxLength.toString()) },
				};
			}
		};
	}

	private static readonly messages = {
		required: 'This field may not be blank',
		maxLength: 'Should contain up to % characters',
	};
}
