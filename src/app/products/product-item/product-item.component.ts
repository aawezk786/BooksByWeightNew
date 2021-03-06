import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { FilterService } from 'src/app/services/filter.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: any;

  @Input() addedToWishlist: boolean;
  

  wish$: any = [];
  wid: any = [];
  size: any = {};
  Error = false;
  message: any;
  length: any;
  wid1: any = [];
  pid: any = [];
  pid1: any = [];
w:any = [];
books: any = [];
book$: any = [];
cartitem: any = [];
book1 :any =[];
cartquantity:any =[];
cartquantity1:any =[];

  constructor(
    private toastr: ToastrService,
    private spinner : NgxSpinnerService,
    private router: Router,

    private wish: WishlistService,
    private cart : CartService,

  ) { }

  ngOnInit() {

  //   this.cart.getcartload().subscribe(() => {
  //     this.loadcart();
  //   })
  //   this.loadcart();
  }



  productHome(_id) {
    this.router.navigate(['details/' + _id]);
  }



  addWish(_id) {
    this.spinner.show();
    if (localStorage.getItem('User')) {
      this.wish.postProduct(_id).subscribe(
        () => {
          this.spinner.hide();
          this.toastr.success('Product Successfully Added', 'BooksByWeight', {
            timeOut: 1000,
          });

          this.addedToWishlist = true;
         
        },
        (err) => {
          this.spinner.hide();
          this.toastr.warning('Product already Added', 'BooksByWeight', {
            timeOut: 1000,
          });
        }
      );
    } else {
      this.router.navigate(['/login']);
      this.toastr.error('YOU NEED TO LOGIN TO SAVE WISHLIST', 'BooksByWeight', {
        timeOut: 1000,
      });
    }
  }

  deletePro(WishlistId) {
    this.spinner.show();
    this.wish.deleteProduct(WishlistId).subscribe(() => {
      this.spinner.hide();
      this.toastr.error('Product Has Been Remove', 'BooksByWeight', {
        timeOut: 1000,
      });
      this.addedToWishlist = false;
     

    
    });
  }

  addCart(_id,selling_price,weight){
    this.spinner.show();
    if (localStorage.getItem('User')!=null) {
    this.cart.postProduct(_id,selling_price,weight).subscribe(() =>{
this.spinner.hide();
      this.toastr.success('Product Successfully Added to cart', 'BooksByWeight', {
        timeOut: 1000,
      });
    })
  } else {
    this.router.navigate(['/login']);
    this.toastr.error('YOU NEED TO LOGIN TO INSERT BOOKS IN CART', 'BooksByWeight', {
      timeOut: 1000,
    });
  }


  }

 
  
}
