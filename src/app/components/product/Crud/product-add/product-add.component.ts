import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // HttpClient import edin

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm: FormGroup;
  categories: any[] = [];  // Kategoriler dizisini tanımlıyoruz

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.createAddForm();
    this.getCategories();  // Kategorileri API'den çekiyoruz
  }

  // Formu oluşturuyoruz
  createAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required],
      stock: ["", Validators.required],
      createdDate: ["", Validators.required],
      categoryId: ["", Validators.required],  // Kategori seçimi
    });
  }

  // Kategorileri API'den çekiyoruz
  getCategories() {
    this.http.get<any[]>('https://localhost:44376/Api/Categorys/getall')
      .subscribe(response => {
        if (response && response.length > 0) {
          this.categories = response;  // API'den gelen kategoriler
        } else {
          // Eğer API'den kategori gelmezse, sabit kategori ekle
          this.categories = [{ id: 1, name: 'Mobilya' }];
        }
        console.log(this.categories);  // Kategorileri kontrol etmek için
      }, error => {
        console.error('Kategoriler yüklenemedi', error);  // Hata durumunda
        // API'den hata gelirse, yine sabit kategori ekle
        this.categories = [{ id: 1, name: 'Mobilya' }];
      });
  }

  // Formu göndermek
  onSubmit() {
    if (this.productAddForm.valid) {
      console.log("Form gönderiliyor:", this.productAddForm.value);
      // Burada API çağrısı veya başka işlemler yapılabilir.
    } else {
      console.log("Form geçerli değil.");
    }
  }
}
