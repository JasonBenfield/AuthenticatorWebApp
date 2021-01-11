// Generated code
using XTI_WebAppClient.Forms;
using System;

namespace XTI_AuthenticatorClient
{
    public sealed partial class VerifyLoginForm : Form
    {
        public VerifyLoginForm(string name): base(name)
        {
            UserName = AddField(new InputField<string>(FieldName, nameof(UserName)));
            Password = AddField(new InputField<string>(FieldName, nameof(Password)));
        }

        public InputField<string> UserName
        {
            get;
        }

        public InputField<string> Password
        {
            get;
        }
    }
}