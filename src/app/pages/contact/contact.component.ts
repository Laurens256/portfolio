import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private titleService: Title,
    private meta: Meta,
    ) {
      this.titleService.setTitle("Laurens Duin | Contact");
      this.meta.addTags([
        { name: 'description', content: 'Wilt u meer weten? Neem gerust contact op met mij' },
        { name: 'keywords', content: 'portfolio, web, development, contact' }  
      ]);
    }

  ngOnInit(): void {
  }

}
