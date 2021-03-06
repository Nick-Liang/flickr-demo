import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TagSearchService} from "../../service/data.service";
import {FeedContentModel} from "../../model/feed-content-model";
import {ItemModel} from "../../model/item-model";

@Component({
  selector: 'flickr-demo',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class TagSearchComponent {
  feedContentModel: FeedContentModel = new FeedContentModel();
  private currentTagValue: string = "";

  constructor(private router: Router, private tagSearchService: TagSearchService) {
  }

  searchTagWithDelay(event: any, tag: string) {
    tag = tag.trim();
    if (tag && tag != '' && this.currentTagValue != tag) {
      setTimeout(this.searchTag(tag), 500);
      this.currentTagValue = tag;
    }
  }

  searchTag(tag: string): any {
    let self = this;
    self.tagSearchService
    .makeRequest(tag)
    .subscribe(function (data) {
      self.feedContentModel = new FeedContentModel();
      self.feedContentModel.title = data.title;
      self.feedContentModel.link = data.link;
      self.feedContentModel.modified = data.modified;
      let items = new Array<ItemModel>();
      for (let i = 0; i < data.items.length; i++) {
        let item = new ItemModel();
        item.title = data.items[i].title;
        item.thumbnail = data.items[i].media.m;
        let tagArray = data.items[i].tags.split(" ");
        for (let j = 0; j < tagArray.length; j++) {
          tagArray[j] = "#" + tagArray[j];
        }
        item.tags = tagArray.join(" ");
        item.link = data.items[i].link;
        item.author = data.items[i].author.replace("nobody@flickr.com ", "").replace('("', "").replace('")', "");
        items.push(item);
      }
      self.feedContentModel.items = items;
    });
  }

}
