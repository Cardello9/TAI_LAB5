import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'selectize',
  templateUrl: './selectize.component.html',
  styleUrls: ['./selectize.component.css']
})
export class SelectizeComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  public posts$;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
           map(event => event['target'].value),
           debounceTime(400),
           distinctUntilChanged(),
           switchMap(value => this.dataService.getByText({text: value}))
      ).subscribe(results => {
         this.posts$ = results;
    });
    }
  

}
