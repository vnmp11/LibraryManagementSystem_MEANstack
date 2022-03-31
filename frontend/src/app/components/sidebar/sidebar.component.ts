import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  public booksCollapsed = false;
  public usersCollapsed = false;
  public profileCollapsed = false;
  public itemsCollapsed = false;

  constructor() { }

  ngOnInit() {
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
