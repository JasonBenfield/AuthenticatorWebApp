using XTI_App.Api;
using System.Threading.Tasks;
using System.Web;
using XTI_WebApp.Api;

namespace XTI_AuthApi
{
    public sealed class StartRequest
    {
        public string StartUrl { get; set; }
        public string ReturnUrl { get; set; }
    }
    public sealed class StartAction : AppAction<StartRequest, WebRedirectResult>
    {
        public Task<WebRedirectResult> Execute(StartRequest model)
        {
            string url;
            if (string.IsNullOrWhiteSpace(model.StartUrl))
            {
                if (string.IsNullOrWhiteSpace(model.ReturnUrl))
                {
                    url = "~/";
                }
                else
                {
                    url = HttpUtility.UrlDecode(model.ReturnUrl);
                }
            }
            else if (string.IsNullOrWhiteSpace(model.ReturnUrl))
            {
                url = HttpUtility.UrlDecode(model.StartUrl);
            }
            else
            {
                url = $"{HttpUtility.UrlDecode(model.StartUrl)}?returnUrl={model.ReturnUrl}";
            }
            return Task.FromResult(new WebRedirectResult(url));
        }
    }
}
