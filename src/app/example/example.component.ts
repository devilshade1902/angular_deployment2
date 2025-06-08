import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { filter, from, interval, map, merge, Observable, of, take } from 'rxjs';

@Component({
  selector: 'app-example',
  imports: [CommonModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent {

  data: any[] = [];

  observable = new Observable((observer) => {
    setTimeout(() => {observer.next(12)}, 1000);
    setTimeout(() => {observer.next(16)}, 2000);
    setTimeout(() => {observer.next(18)}, 3000);
    setTimeout(()=>{observer.error(new Error("something went wrong"))},3500)
    setTimeout(() => {observer.next(18)}, 4000);
    setTimeout(() => {observer.next(18)}, 5000);
    setTimeout(() => {observer.complete()}, 6000);
  })


  getData1() {
    this.observable.subscribe({
      next: (value) => {
        console.log(value)
        this.data.push(value)
      },
      complete:()=>{
        alert("data emission completed")
      },
      error:(error)=>{
        alert(error.message)
      }
    })
  }

  getData2(){
    let observable2 = of([12,78],90,49,"hello")
    observable2.subscribe({
      next:(value)=>{
        this.data.push(value)
      },
      complete:()=>{}
    })
  }

  getData3(){
    from(["dhruv","billy","saul"]).subscribe({
      next:(value)=>{this.data.push(value)}
    })
  }

  getData4(){
    interval(500)
    .subscribe({
      next:(value)=>{this.data.push(value)}
    }
    )
  }
  getData5()
  {
    merge(of(12,34,53,21),from("hello"))
    .subscribe({
      next:(value)=>{this.data.push(value)}
    })
  }

  getData6(){
    from([21,23,42,13,23,23]).pipe(take(5))
    .subscribe({
      next:(value)=>{this.data.push(value)}
    })
  }

  getData7(){
    of(12,32,52,42,52,13,51,13).pipe(map((n)=>n*n),take(4))
    .subscribe({
      next:(value)=>{this.data.push(value)}
    })
  }
  
  getData8(){
    of(12,32,52,42,52,13,51,13).pipe(filter((n)=>n%2 == 0),take(4))
    .subscribe({
      next:(value)=>{this.data.push(value)}
    })
  }
  getData9(){
    of(12,32,52,42,52,13,51,13,100,200,301).pipe(filter((n)=>n>100),map((n)=>n*n))
    .subscribe({
      next:(value)=>{this.data.push(value)}
    })
  }
  observable2 = interval(1000)
  unsubscribeobservable:any


  getData10(){
    this.unsubscribeobservable= this.observable2.pipe(map((x)=>x+1))
    .subscribe({
      next:(value)=>this.data.push(value)
    })
  }

  stop(){
    this.unsubscribeobservable.unsubscribe();
  }
}
