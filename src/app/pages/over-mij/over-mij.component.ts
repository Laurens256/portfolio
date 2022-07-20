import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-over-mij',
  templateUrl: './over-mij.component.html',
  styleUrls: ['./over-mij.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OverMijComponent implements OnInit {

  constructor(
    private titleService: Title,
    private meta: Meta,
  ) {
    this.titleService.setTitle('Laurens Duin | Over Mij');
    this.meta.addTags([
      { name: 'description', content: 'Ik ben Laurens Duin, frontend developer en derdejaars Communication and Multimedia Design (CMD) student aan de Hogeschool van Amsterdam' },
      { name: 'keywords', content: 'portfolio, web, development, javascript, over mij, vaardigheden' }
    ]);
  }

  ngOnInit(): void {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.headerJump();
    }

    document.querySelector('section:first-of-type > svg')?.addEventListener('click', function () {
      window.scroll({
        top: window.innerHeight - 160,
        left: 0,
        behavior: 'smooth'
      });
    });
  }

  headerJump(): void {
    //spring animatie voor h1
    const h1Letters = document.querySelectorAll('h1 span')!;
    for (let i = 0; i < h1Letters.length; i++) {
      h1Letters[i].addEventListener('animationend', function () {
        h1Letters[i].classList.remove('dance');
      });

      h1Letters[i].addEventListener('mouseover', function () {
        h1Letters[i].classList.add('dance');
      });
    }
  }

}
