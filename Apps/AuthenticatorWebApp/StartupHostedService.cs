using AuthenticatorWebApp.Api;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;
using XTI_App;
using XTI_Core;

namespace AuthenticatorWebApp
{
    public sealed class StartupHostedService : IHostedService
    {
        private readonly IServiceProvider sp;

        public StartupHostedService(IServiceProvider sp)
        {
            this.sp = sp;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (var scope = sp.CreateScope())
            {
                var appFactory = scope.ServiceProvider.GetService<AppFactory>();
                var clock = scope.ServiceProvider.GetService<Clock>();
                await new AllAppSetup(appFactory, clock).Run();
                await new AuthSetup(appFactory, clock).Run();
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
