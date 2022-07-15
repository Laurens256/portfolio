import { Component, OnInit } from '@angular/core';
import { HttpReqService } from 'src/app/services/http-req.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(
    private httpReqService: HttpReqService,
    private titleService: Title,
  ) {
    this.titleService.setTitle("Laurens Duin | Portfolio");
  }

  ngOnInit(): void {
    this.httpReqService.test('', 'projects').subscribe(
      response => {
        this.projecten = response;
        console.log(response);
      }
    )
  }

  projecten = [{
    titel: "",
    img: "",
    imgAlt: "",
    tekst: "",
    url: "",
    data: {
      imgs: "",
      imgsAlt: "",
      tekst: ""
    }
  }];

  toggleProjectInfo(e: any) {
    document.querySelector('.popupcontainer')?.classList.toggle('open');

    if (e.classList.value.includes('_info')) {
      this.getProjectData(e);
    }
  }

  project = {
    titel: "",
    img: "",
    imgAlt: "",
    tekst: "",
    url: "",
    data: {
      imgs: "",
      imgsAlt: "",
      tekst: ""
    }
  };

  getProjectData(e: any) {
    const dataName = e.classList.value.split('_')[0];


    for (let i = 0; i < this.projecten.length; i++) {
      if (this.projecten[i].url === dataName) {
        console.log(this.projecten[i]);
        this.project = this.projecten[i];
        
        return;
      }
    }
  }

}
