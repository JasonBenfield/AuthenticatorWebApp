﻿using Microsoft.Extensions.DependencyInjection;
using System;
using XTI_App;
using XTI_App.Api;
using XTI_Core;
using XTI_TempLog;
using XTI_WebApp;
using XTI_WebApp.Api;

namespace XTI_AuthApi
{
    public sealed class AuthActionFactory
    {
        private readonly IServiceProvider sp;

        public AuthActionFactory(IServiceProvider sp)
        {
            this.sp = sp;
        }

        public AppAction<LoginCredentials, LoginResult> CreateAuthenticateAction()
        {
            var access = sp.GetService<AccessForAuthenticate>();
            var auth = createAuthentication(access);
            return new AuthenticateAction(auth);
        }

        public AppAction<VerifyLoginForm, EmptyActionResult> CreateVerifyLoginAction()
        {
            var unverifiedUser = new UnverifiedUser(sp.GetService<AppFactory>());
            var hashedPasswordFactory = sp.GetService<IHashedPasswordFactory>();
            return new VerifyLoginAction(unverifiedUser, hashedPasswordFactory);
        }

        public AppAction<LoginModel, WebRedirectResult> CreateLoginAction()
        {
            var access = sp.GetService<AccessForLogin>();
            var auth = createAuthentication(access);
            var anonClient = sp.GetService<IAnonClient>();
            return new LoginAction(auth, anonClient);
        }

        private Authentication createAuthentication(IAccess access)
        {
            var tempLogSession = sp.GetService<TempLogSession>();
            var unverifiedUser = new UnverifiedUser(sp.GetService<AppFactory>());
            var hashedPasswordFactory = sp.GetService<IHashedPasswordFactory>();
            var userContext = sp.GetService<IUserContext>();
            return new Authentication(tempLogSession, unverifiedUser, access, hashedPasswordFactory, userContext);
        }

        public AppAction<EmptyRequest, WebRedirectResult> CreateLogoutAction()
        {
            var access = sp.GetService<AccessForLogin>();
            var tempLogSession = sp.GetService<TempLogSession>();
            return new LogoutAction(access, tempLogSession);
        }
    }
}
