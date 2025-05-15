import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient ) { }


    getproducts():Observable<any>{

    return this.http.get('https://e-commerce-qum4.onrender.com/api/v1/products')



  }

  singleproducts(searchtext:string):Observable<any>{
    return this.http.get("https://e-commerce-qum4.onrender.com/api/v1/products/",{
      params:{
        keyword:searchtext
      }
    })
  }

  addtocart(email: string | null = null,productId:string,quantity:number):Observable<any>{

    const body = {
      email,
      productId,
      quantity
    };

    return this.http.post('https://e-commerce-qum4.onrender.com/api/v1/cart/add-to-cart',body)

  }


  private getcarturl = "https://e-commerce-qum4.onrender.com/api/v1/cart/view-cart"

  getcartitems(email: string | null = null):Observable<any>{

    

    return this.http.get(`${this.getcarturl}/${email}`)



  }
  removeItemFromCart(email: string | null=null, productId: string): Observable<any> {
    return this.http.delete<any>('https://e-commerce-qum4.onrender.com/api/v1/cart/remove-item', {
      body: { email, productId },
    });
  }


  private orderurl = "https://e-commerce-qum4.onrender.com/api/v1/orders"

  address = ""

  placeOrder(email: string | null = null, cartItems: any[],address:string|null = null,phonenumber:string|null=null): Observable<any> {
    const payload = {
      email: email,
      cartItems: cartItems,
      address:address,
      phonenumber:phonenumber
    };
  
    console.log(payload); // For debugging purposes
    return this.http.post(this.orderurl, payload);
  }

  private getorderurl = "https://e-commerce-qum4.onrender.com/api/v1/orders/getuserorders"

  getUserOrders(email: string |null=null): Observable<any> {
   
    return this.http.get(`${this.getorderurl}/${email}`);
  
  }

  //email, name, price, description, ratings, images, category, seller, stock, numofReviews


  createproducts(email: string, name: string, price: string, description: string, ratings: string, images: { image: string }[], category: string, seller: string, stock: string, numofReviews: string) {
    // API call logic

    
    const body={
      email,
      name,
      price, description, ratings, images, category, seller, stock, numofReviews

    }

    return this.http.post("https://e-commerce-qum4.onrender.com/api/v1/products/createproducts",body)

  }


  private getadminproducts = "https://e-commerce-qum4.onrender.com/api/v1/products/getproductsadmin"

  getadminproduct(email: string |null=null): Observable<any> {
   
    return this.http.get(`${this.getadminproducts}/${email}`);
  
  }

  private adminvieworders="https://e-commerce-qum4.onrender.com/api/v1/products/orderedproducts"

  fetchAdminOrders(email: string|null=null): Observable<any> {
    return this.http.post(this.adminvieworders, { email });
  }

}


  
  
  
  

 
  

  
  
  

