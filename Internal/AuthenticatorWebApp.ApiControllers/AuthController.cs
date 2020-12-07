// Generated Code
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using XTI_App.Api;
using XTI_WebApp.Api;
using XTI_AuthApi;
using AuthenticatorWebApp.Api;
using XTI_App;

namespace AuthenticatorWebApp.ApiControllers
{
    [AllowAnonymous]
    public class AuthController : Controller
    {
        public AuthController(AuthenticatorAppApi api, XtiPath xtiPath)
        {
            this.api = api;
            this.xtiPath = xtiPath;
        }

        private readonly AuthenticatorAppApi api;
        private readonly XtiPath xtiPath;
        public async Task<IActionResult> Index()
        {
            var result = await api.Group("Auth").Action<EmptyRequest, AppActionViewResult>("Index").Execute(xtiPath.Modifier, new EmptyRequest());
            return View(result.Data.ViewName);
        }

        [HttpPost]
        public Task<ResultContainer<EmptyActionResult>> Verify([FromBody] LoginCredentials model)
        {
            return api.Group("Auth").Action<LoginCredentials, EmptyActionResult>("Verify").Execute(xtiPath.Modifier, model);
        }

        public async Task<IActionResult> Login(LoginModel model)
        {
            var result = await api.Group("Auth").Action<LoginModel, AppActionRedirectResult>("Login").Execute(xtiPath.Modifier, model);
            return Redirect(result.Data.Url);
        }

        public async Task<IActionResult> Logout()
        {
            var result = await api.Group("Auth").Action<EmptyRequest, AppActionRedirectResult>("Logout").Execute(xtiPath.Modifier, new EmptyRequest());
            return Redirect(result.Data.Url);
        }
    }
}