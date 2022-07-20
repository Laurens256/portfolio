import { Component, OnInit } from '@angular/core';

import * as focusTrap from 'focus-trap';

@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.css']
})
export class ProjectPopupComponent implements OnInit {

  constructor(
    
  ) { }

  ngOnInit(): void {
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
