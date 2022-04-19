import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [NgbDropdownConfig]

})
export class AdminComponent implements OnInit {

    title = 'demo1';

    showSidebar: boolean = true;
    showNavbar: boolean = true;
    showFooter: boolean = true;
    isLoading: boolean;

    public uiBasicCollapsed = false;
    public samplePagesCollapsed = false;
    public booksCollapsed = false;
    public usersCollapsed = false;
    public profileCollapsed = false;
    public itemsCollapsed = false;

    public iconOnlyToggled = false;
    public sidebarToggled = false;
  
  
    constructor(private router: Router, config: NgbDropdownConfig) {
      
      // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
      router.events.forEach((event) => { 
        if(event instanceof NavigationStart) {
          if((event['url'] == '/user-pages/login') || (event['url'] == '/user-pages/register')|| (event['url'] == '/home') || (event['url'] == '/error-pages/404') || (event['url'] == '/error-pages/500') ) {
            this.showSidebar = false;
            this.showNavbar = false;
            this.showFooter = false;
            document.querySelector('.main-panel').classList.add('w-100');
            document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
            document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg', );
            document.querySelector('.content-wrapper').classList.remove('auth', 'lock-full-bg');
            if((event['url'] == '/error-pages/404') || (event['url'] == '/error-pages/500')) {
              document.querySelector('.content-wrapper').classList.add('p-0');
            }
          } else {
            this.showSidebar = true;
            this.showNavbar = true;
            this.showFooter = true;
            document.querySelector('.main-panel').classList.remove('w-100');
            document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
            document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
            document.querySelector('.content-wrapper').classList.remove('p-0');
          }
        }
      });
  
      // Spinner for lazyload modules
      router.events.forEach((event) => { 
        if (event instanceof RouteConfigLoadStart) {
            this.isLoading = true;
        } else if (event instanceof RouteConfigLoadEnd) {
            this.isLoading = false;
        }
      });

      const body = document.querySelector('body');

      // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
      document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
        el.addEventListener('mouseover', function() {
          if(body.classList.contains('sidebar-icon-only')) {
            el.classList.add('hover-open');
          }
        });
        el.addEventListener('mouseout', function() {
          if(body.classList.contains('sidebar-icon-only')) {
            el.classList.remove('hover-open');
          }
        });
      });
  
    }

  ngOnInit() {
      // Scroll to top after route change
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
      });
  }

  
  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }
  
  checkOpenBook(){
    if (this.usersCollapsed == true)
    {
      this.usersCollapsed = false;
    }
    if (this.profileCollapsed == true)
    {
      this.profileCollapsed = false
    }
    if (this.itemsCollapsed == true)
    {
      this.itemsCollapsed = false
    }
  }

  checkOpenUser(){
    if (this.booksCollapsed == true)
    {
      this.booksCollapsed = false;
    }
    if (this.profileCollapsed == true)
    {
      this.profileCollapsed = false
    }
    if (this.itemsCollapsed == true)
    {
      this.itemsCollapsed = false
    }
  }

  checkOpenMyProfile(){
    if (this.booksCollapsed == true)
    {
      this.booksCollapsed = false;
    }
    if (this.usersCollapsed == true)
    {
      this.usersCollapsed = false;
    }
    if (this.itemsCollapsed == true)
    {
      this.itemsCollapsed = false
    }
  }

  checkOpenItems(){
    if (this.booksCollapsed == true)
    {
      this.booksCollapsed = false;
    }
    if (this.usersCollapsed == true)
    {
      this.usersCollapsed = false;
    }
    if (this.profileCollapsed == true)
    {
      this.profileCollapsed = false
    }
  }
  


}