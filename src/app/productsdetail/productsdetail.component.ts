import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../services/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner'
declare var $: any;
@Component({
  selector: 'app-productsdetail',
  templateUrl: './productsdetail.component.html',
  styleUrls: ['./productsdetail.component.css'],
})
export class ProductsdetailComponent implements OnInit {
  wid: any = [];
  wid1: any = [];
  wish$: any = [];
  books$: any = [];
  book: any = [];
  pid: any = [];
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private wish: WishlistService,
    private newService: BooksService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    if (localStorage.getItem('User') != null) {
      this.wish.getwishlistload().subscribe(() => {
        this.loadwish();
      })
    }
    this.loadwish();
    this.loaddetails();

    this.jquery_code();
  }

  jquery_code() { }

  loaddetails() {
    this.newService
      .getDetailPackage(this.route.snapshot.params._id)
      .subscribe((res) => {
        this.books$ = res;
        this.book = this.books$.books;
        for (var { _id: id } of this.book) {
          this.pid.push(id);
        }
        this.spinner.hide()
      });
  }
  loadwish() {
    if (localStorage.getItem('User') != null) {
      this.wish.getwish().subscribe((data) => {
        this.wish$ = data;

        const size = this.wish$.books;

        for (var { book: books } of size) {
          this.wid = books;

          const size1 = books._id;

          this.wid1.push(size1);
        }
        for (let w of this.wid1) {
        }
      });
    }
  }
}
