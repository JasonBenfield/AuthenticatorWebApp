using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using XTI_AuthApi;

namespace AuthenticatorWebApp.Extensions
{
    public sealed class CookieAccess : AccessForLogin
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly AccessForAuthenticate source;

        public CookieAccess(IHttpContextAccessor httpContextAccessor, AccessForAuthenticate source)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.source = source;
        }

        protected override async Task<string> _GenerateToken(IEnumerable<Claim> claims)
        {
            var token = await source.GenerateToken(claims);
            var claimsPrincipal = new ClaimsPrincipal();
            claimsPrincipal.AddIdentity
            (
                new ClaimsIdentity
                (
                    claims,
                    "Password",
                    ClaimTypes.Name,
                    "Recipient"
                )
            );
            var authProps = new AuthenticationProperties();
            authProps.StoreTokens
            (
                new[]
                {
                    new AuthenticationToken()
                    {
                        Name = "Jwt",
                        Value = token
                    }
                }
            );
            authProps.IsPersistent = true;
            await httpContextAccessor.HttpContext.SignInAsync
            (
                claimsPrincipal,
                authProps
            );
            return token;
        }

        protected override Task _Logout() => httpContextAccessor.HttpContext.SignOutAsync();
    }
}
