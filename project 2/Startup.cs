using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CzmutCalendar
{
    public class Startup
    {
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionHandler("/error");
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    "today", "", new {controller="Calendar", action="ShowCalendar"}
                );
                endpoints.MapControllerRoute(
                    "chosenMonth", "{year}-{month}", new {controller="Calendar", action="ShowCalendar"}
                );
                endpoints.MapControllerRoute(
                    "chosenDay", "{year}-{month}-{day}", new {controller="Calendar", action="ShowDate"}
                );
                endpoints.MapControllerRoute(
                    "modifyEvent", "{year}-{month}-{day}/addNew", new {controller="Calendar", action="AddNewEvent"}
                );
                endpoints.MapControllerRoute(
                    "modifyEvent", "edit/event/{id}", new {controller="Calendar", action="ModifyEvent"}
                );
                endpoints.MapControllerRoute(
                    "error", "error", new {controller="Calendar", action="ShowError"}
                );

                // API handling
                endpoints.MapControllerRoute(
                    "api_event_lists", "api/events/{year}-{month}", new {controller="Api", action="GetEventLists"}
                );
                endpoints.MapControllerRoute(
                    "api_day_events", "api/day-events/{year}-{month}-{day}", new {controller="Api", action="GetDayEvents"}
                );
                endpoints.MapControllerRoute(
                    "api_event", "api/event/{id}", new {controller="Api", action="GetEvent"}
                );
                endpoints.MapControllerRoute(
                    "api_event", "api/event/add/{year}-{month}-{day}", new {controller="Api", action="ModifyEvent"}
                );
                endpoints.MapControllerRoute(
                    "api_event", "api/event/{id}", new {controller="Api", action="ModifyEvent"}
                );
                endpoints.MapControllerRoute(
                    "api_event", "api/event/{id}", new {controller="Api", action="DeleteEvent"}
                );
                endpoints.MapControllerRoute(
                    "api_error", "api/error", new {controller="Api", action="ShowError"}
                );
            });
        }
    }
}
