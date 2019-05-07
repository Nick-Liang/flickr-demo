/**
 * Created by liangn on 21/07/2017.
 */
import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TagSearchService {
  constructor(
    private jsonp: Jsonp
  ) {}

  makeRequest(query: string) {
    query = query || '';
    let url = `https://api.flickr.com/services/feeds/photos_public.gne`;
    return this.jsonp
      .get(url + "?jsoncallback=JSONP_CALLBACK&format=json&tags=" + query)
      .pipe(map(data => data.json()));
  }


}
