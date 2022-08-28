import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {CategoriesService} from '../../shared/services/categories.service'
import {MaterialService} from '../../shared/classes/material.service'
import {Category} from '../../shared/interfaces'
import { of, switchMap } from 'rxjs'

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.sass']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') input!: ElementRef
  form!: FormGroup
  image!: File
  imagePreview: string | any = ''

  isNew = true

  category!: Category | any

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable()

    this.route.params
      .pipe(switchMap((params: Params) => {
        if (params['id']) {
          this.isNew = false
          return this.categoriesService.getById(params['id'])
        }
        return of(null)
      }))
      .subscribe({
        next: (cat) => {
          if (cat) {
            this.category = cat
            this.form.patchValue({
              name: this.category.name
            })
            this.imagePreview = this.category.imageSrc as string
            MaterialService.updateTextInput()
          }
          this.form.enable()
        },
        error: (err) => MaterialService.toast(err.error.message)
  })
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }

    obs$.subscribe(
      category => {
        this.category = category
        MaterialService.toast('Изменения сохранены')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

  deleteCategory() {
    const decision = window.confirm('Вы уверены, что хотите удалить категорию?')
    if (decision) {
      this.categoriesService.delete(this.category._id).subscribe(
        response => MaterialService.toast(response.message),
        error => MaterialService.toast(error.error.message),
        () => this.router.navigate(['/categories'])
      )
    }
  }

  onFileSelect(event: any ) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  triggerClick() {
    this.input.nativeElement.click()
  }
}
