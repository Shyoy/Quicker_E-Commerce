from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from django.core.validators import (MinValueValidator,
                                    MinLengthValidator,
                                    validate_image_file_extension)
from .services.validators import DigitValidator , ImageValidator
from .services.utils import ImageHandler

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.name

class Product(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=120)
    barcode = models.CharField(validators=[MinLengthValidator(6),DigitValidator()], max_length=18,  unique=True)
    price = models.FloatField(validators=[MinValueValidator(0.5)])
    amount = models.IntegerField(default=1)
    image = models.ImageField(upload_to=ImageHandler.path,validators=[ImageValidator(3),validate_image_file_extension])
    categories = models.ManyToManyField(Category,related_name='products')

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.name

    def clean(self):
        if self.amount < 0 :
            raise ValidationError(_(f"Product minimum amount is 0"))


class CartItem(models.Model):
    product  = models.ForeignKey('products.Product',related_name='cart_items',on_delete=models.PROTECT)
    amount = models.IntegerField(default=1)
    cart = models.ForeignKey('products.Cart',related_name='cart_items',on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.amount} x {self.product.name}'
    
    def clean(self):
        if (self.product.amount - self.amount) < 0:
            raise ValidationError(_(f"There are not enough {self.product.name}"))
    class Meta:
        ordering = ['product']
    def save(self,*args,**kwargs) -> None:
        try:
            self.full_clean()
            return super().save(*args,**kwargs)
        except ValidationError as e:
            error = [x for x in e][0][1][0]
            print(error)
            return error
         

    

class Cart(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey('accounts.Customer', related_name='carts', on_delete=models.CASCADE)

    
    
    def __str__(self):
        return f'Cart created at {self.created}'
