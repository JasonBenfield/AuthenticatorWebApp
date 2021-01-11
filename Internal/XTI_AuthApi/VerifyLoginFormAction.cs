using System.Threading.Tasks;
using XTI_App.Api;
using XTI_WebApp.Api;

namespace XTI_AuthApi
{
    public sealed class VerifyLoginFormAction : AppAction<EmptyRequest, WebPartialViewResult>
    {
        public Task<WebPartialViewResult> Execute(EmptyRequest model)
            => Task.FromResult(new WebPartialViewResult("VerifyLoginForm"));
    }
}
