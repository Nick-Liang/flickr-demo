import {Component, HostListener, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/platform-browser";
@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent {
  showButton : boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.document.body.scrollTop > 150 || this.document.documentElement.scrollTop > 150) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  goTop(){
    this.document.body.scrollTop = 0; // For Chrome, Safari and Opera
    this.document.documentElement.scrollTop = 0; // For IE and Firefox
  }
}
