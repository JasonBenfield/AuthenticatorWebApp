// Generated code
import { VerifyLoginFormViewModel } from "./VerifyLoginFormViewModel";
import { Form } from 'XtiShared/Forms/Form';

export class VerifyLoginForm extends Form {
	constructor(private readonly vm: VerifyLoginFormViewModel) {
		super('VerifyLoginForm');
		this.UserName.caption.setCaption('User Name');
		this.UserName.constraints.mustNotBeNull();
		this.UserName.constraints.mustNotBeWhitespace('Must not be blank');
		this.UserName.setMaxLength(100);
		this.Password.caption.setCaption('Password');
		this.Password.constraints.mustNotBeNull();
		this.Password.constraints.mustNotBeWhitespace('Must not be blank');
		this.Password.setMaxLength(100);
		this.Password.protect();
	}
	readonly UserName = this.addTextInputField('UserName', this.vm.UserName);
	readonly Password = this.addTextInputField('Password', this.vm.Password);
}