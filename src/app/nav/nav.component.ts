import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {};

  navItems = [{
    naam: 'Over Mij',
    url: ''
  }, {
    naam: 'Portfolio',
    url: 'portfolio'
  }, {
    naam: 'Contact',
    url: 'contact'
  }];

  toggleMobileNav(e?: MouseEvent) {
    if(e) {
      document.querySelector('body')?.classList.remove('mobilenav');
      return;
    }
    document.querySelector('body')?.classList.toggle('mobilenav');
  }

}
