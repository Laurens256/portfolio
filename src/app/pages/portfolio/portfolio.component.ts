import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpReqService } from 'src/app/services/http-req.service';
import { Title, Meta } from "@angular/platform-browser";

import * as focusTrap from 'focus-trap';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PortfolioComponent implements OnInit {

  constructor(
    private httpReqService: HttpReqService,
    private titleService: Title,
    private meta: Meta,
  ) {
    this.titleService.setTitle("Laurens Duin | Portfolio");
    this.meta.addTags([
      { name: 'description', content: 'Benieuwd naar mijn werk? Hier vindt u interessante projecten waar ik aan heb bijgedragen.' },
      { name: 'keywords', content: 'portfolio, project, web, development, javascript' }
    ]);
  }

  ngOnInit(): void {
    this.httpReqService.getLocalFile('', 'projects').subscribe(
      response => {
        this.projecten = response;
        console.log(response);
      }
    )
    console.log(typeof this.trap);
    this.trap = focusTrap.createFocusTrap('.popupcontainer');

    // document.addEventListener('focusin', function() {
    //   console.log('focused: ', document.activeElement)
    // }, true);
    // document.querySelector(':root')?.classList.add('darkmode');
  }

  trap: any;

  projecten = [{
    titel: "",
    img: "",
    imgAlt: "",
    tekst: "",
    url: "",
    data: {
      imgs: [""],
      imgsAlt: [""],
      tekst: "",
      meta: {
        leerjaar: "",
        datum: "",
        vak: "",
        cijfer: "",
        doelgroep: "",
        vaardigheden: [""]
      }
    }
  }];

  lastTime = 0;

  toggleProjectInfo(e: any) {
    //zorgt ervoor dat popup niet dicht en open gaat op enter keypress (komt door focus trap)
    const now = new Date().getTime() as number;
    if (now - this.lastTime < 250) {
      return;
    } else {
      this.lastTime = now;
    }

    document.querySelector('.popupcontainer')?.classList.toggle('open');

    if (e.currentTarget?.classList.value.includes('_info')) {
      this.getProjectData(e.currentTarget);
      this.trap.activate();
      return;
    }
    this.trap.deactivate();
  }

  project = {
    titel: "",
    img: "",
    imgAlt: "",
    tekst: "",
    url: "",
    data: {
      imgs: [""],
      imgsAlt: [""],
      tekst: "",
      meta: {
        leerjaar: "",
        datum: "",
        vak: "",
        cijfer: "",
        doelgroep: "",
        vaardigheden: [""]
      }
    }
  };

  getProjectData(e: HTMLElement) {
    const dataName = e.classList.value.split('_')[0] as string;


    for (let i = 0; i < this.projecten.length; i++) {
      if (this.projecten[i].url === dataName) {
        this.project = this.projecten[i];
        return;
      }
    }
  }

}
