// Generated Code
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using XTI_AuthApi;
using AuthenticatorWebApp.Api;
using XTI_App;
using XTI_App.Api;
using XTI_WebApp.Api;

namespace AuthenticatorWebApp.ApiControllers
{
    [AllowAnonymous]
    public class AuthApiController : Controller
    {
        public AuthApiController(AuthenticatorAppApi api)
        {
            this.api = api;
        }

        private readonly AuthenticatorAppApi api;
        [HttpPost]
        public Task<ResultContainer<LoginResult>> Authenticate([FromBody] LoginCredentials model)
        {
            return api.Group("AuthApi").Action<LoginCredentials, LoginResult>("Authenticate").Execute(model);
        }
    }
}