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
   
  }

  checkOpenUser(){
    if (this.booksCollapsed == true)
    {
      this.booksCollapsed = false;
    }
   
  }

  check(colapsed)
  {
    alert("vao");
    if (colapsed == true)
    {
      colapsed = false;
    }
  }
  

}
