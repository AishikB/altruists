import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router:Router) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('https://s4.aconvert.com/convert/p3r68-cdx67/cbah2-es08g.svg'));
  }


  ngOnInit() {
  }

  navigatePages(page) {
    if(page === 'home') {
      this.router.navigate(['']);
    }
    else if(page === 'about') {
      this.router.navigate(['about']);
    }
    else if(page === 'contact') {
      this.router.navigate(['contact']);
    }
  }
}
